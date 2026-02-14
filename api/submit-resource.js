const crypto = require('crypto');

const RESOURCE_FIELDS = [
  'section',
  'title',
  'paper_url',
  'data_url',
  'code_url',
  'demo_url',
  'image',
  'authors',
  'venue_name',
  'venue_url',
  'description'
];

function b64url(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function signAppJwt(appId, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = { iat: now - 60, exp: now + 9 * 60, iss: String(appId) };
  const encodedHeader = b64url(JSON.stringify(header));
  const encodedPayload = b64url(JSON.stringify(payload));
  const toSign = `${encodedHeader}.${encodedPayload}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(toSign);
  signer.end();
  const signature = signer.sign(privateKey);
  return `${toSign}.${b64url(signature)}`;
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function normalizeTitle(title) {
  return String(title || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function csvEscape(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (ch !== '\r') {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function stringifyCsv(rows) {
  return rows.map((r) => r.map(csvEscape).join(',')).join('\n') + '\n';
}

async function githubRequest(path, options = {}) {
  return fetch(`https://api.github.com${path}`, options);
}

async function getInstallationToken(appId, installationId, privateKey) {
  const jwt = signAppJwt(appId, privateKey);
  const res = await githubRequest(`/app/installations/${installationId}/access_tokens`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${jwt}`,
      'User-Agent': 'coral-resource-submit'
    }
  });

  if (!res.ok) {
    throw new Error(`Installation token request failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.token;
}

async function getFile(owner, repo, branch, path, token) {
  const encoded = path.split('/').map(encodeURIComponent).join('/');
  const res = await githubRequest(`/repos/${owner}/${repo}/contents/${encoded}?ref=${encodeURIComponent(branch)}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'coral-resource-submit'
    }
  });

  if (!res.ok) {
    throw new Error(`Failed reading ${path}: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const content = Buffer.from(String(data.content || '').replace(/\n/g, ''), 'base64').toString('utf8');
  return { content, sha: data.sha };
}

async function putFile(owner, repo, branch, path, content, sha, token, message) {
  const encoded = path.split('/').map(encodeURIComponent).join('/');
  const res = await githubRequest(`/repos/${owner}/${repo}/contents/${encoded}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'coral-resource-submit',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      sha,
      branch
    })
  });

  if (!res.ok) {
    throw new Error(`Failed writing ${path}: ${res.status} ${await res.text()}`);
  }
}

function sanitizeIncoming(body) {
  const row = {
    section: (body.section === 'demo' ? 'demo' : 'data'),
    title: String(body.title || '').trim(),
    paper_url: String(body.paper_url || '').trim(),
    data_url: String(body.data_url || '').trim(),
    code_url: String(body.code_url || '').trim(),
    demo_url: String(body.demo_url || '').trim(),
    image: String(body.image || '').trim(),
    authors: String(body.authors || '').trim(),
    venue_name: String(body.venue_name || '').trim(),
    venue_url: String(body.venue_url || '').trim(),
    description: String(body.description || '').trim()
  };

  const required = ['title', 'paper_url', 'image', 'authors', 'venue_name', 'description'];
  for (const key of required) {
    if (!row[key]) {
      throw new Error(`Missing required field: ${key}`);
    }
  }

  return row;
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const appId = process.env.GITHUB_APP_ID;
    const installationId = process.env.GITHUB_APP_INSTALLATION_ID;
    const privateKeyRaw = process.env.GITHUB_APP_PRIVATE_KEY;
    const owner = process.env.GITHUB_OWNER || 'coral-lab-asu';
    const repo = process.env.GITHUB_REPO || 'coral-lab-asu.github.io';
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!appId || !installationId || !privateKeyRaw) {
      return res.status(500).json({ error: 'Missing GitHub App configuration' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const incoming = sanitizeIncoming(body);

    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
    const token = await getInstallationToken(appId, installationId, privateKey);

    const targetPath = '_data/resources.csv';
    const current = await getFile(owner, repo, branch, targetPath, token);
    const rows = parseCsv(current.content);

    if (!rows.length) {
      return res.status(500).json({ error: '_data/resources.csv is empty or invalid' });
    }

    const header = rows[0];
    const dataRows = rows.slice(1);

    const headerIndex = {};
    header.forEach((h, i) => { headerIndex[h] = i; });

    for (const f of RESOURCE_FIELDS) {
      if (!(f in headerIndex)) {
        return res.status(500).json({ error: `resources.csv missing required column: ${f}` });
      }
    }

    let action = 'created';
    let updated = false;
    const titleKey = normalizeTitle(incoming.title);

    for (let i = 0; i < dataRows.length; i += 1) {
      const row = dataRows[i];
      const existingTitle = normalizeTitle(row[headerIndex.title] || '');
      if (existingTitle && existingTitle === titleKey) {
        action = 'updated';
        for (const field of RESOURCE_FIELDS) {
          const idx = headerIndex[field];
          const prev = String(row[idx] || '');
          const next = String(incoming[field] || '');
          if (prev !== next) {
            row[idx] = next;
            updated = true;
          }
        }
        break;
      }
    }

    if (action === 'created') {
      const newRow = new Array(header.length).fill('');
      for (const field of RESOURCE_FIELDS) {
        newRow[headerIndex[field]] = incoming[field] || '';
      }
      dataRows.push(newRow);
      updated = true;
    }

    if (!updated) {
      return res.status(200).json({ ok: true, action: 'no_change', title: incoming.title });
    }

    const finalRows = [header, ...dataRows];
    const nextCsv = stringifyCsv(finalRows);

    await putFile(
      owner,
      repo,
      branch,
      targetPath,
      nextCsv,
      current.sha,
      token,
      `${action} resource row: ${incoming.title}`
    );

    return res.status(200).json({ ok: true, action, title: incoming.title });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Submission failed' });
  }
};
