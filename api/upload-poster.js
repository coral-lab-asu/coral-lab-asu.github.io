const crypto = require('crypto');

function b64url(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function signAppJwt(appId, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iat: now - 60,
    exp: now + 9 * 60,
    iss: String(appId)
  };

  const encodedHeader = b64url(JSON.stringify(header));
  const encodedPayload = b64url(JSON.stringify(payload));
  const toSign = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(toSign);
  signer.end();

  const signature = signer.sign(privateKey);
  return `${toSign}.${b64url(signature)}`;
}

function sanitizeFilename(name) {
  const base = String(name || '').split('/').pop().split('\\\\').pop();
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, '_');
  if (!cleaned) return '';
  const hasImageExt = /\.(png|jpe?g|webp|gif)$/i.test(cleaned);
  return hasImageExt ? cleaned : `${cleaned}.png`;
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function githubRequest(path, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, options);
  return res;
}

async function getInstallationToken(appId, installationId, privateKey) {
  const jwt = signAppJwt(appId, privateKey);
  const res = await githubRequest(`/app/installations/${installationId}/access_tokens`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${jwt}`,
      'User-Agent': 'coral-upload-pipeline'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Installation token request failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.token;
}

async function getShaIfExists(owner, repo, branch, repoPath, token) {
  const encoded = repoPath.split('/').map(encodeURIComponent).join('/');
  const res = await githubRequest(`/repos/${owner}/${repo}/contents/${encoded}?ref=${encodeURIComponent(branch)}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'coral-upload-pipeline'
    }
  });

  if (res.status === 404) return '';
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed checking existing file ${repoPath}: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.sha || '';
}

async function upsertFile(owner, repo, branch, repoPath, contentBase64, token) {
  const sha = await getShaIfExists(owner, repo, branch, repoPath, token);
  const encoded = repoPath.split('/').map(encodeURIComponent).join('/');

  const body = {
    message: `upload poster via publication form: ${repoPath}`,
    content: contentBase64,
    branch
  };
  if (sha) body.sha = sha;

  const res = await githubRequest(`/repos/${owner}/${repo}/contents/${encoded}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'coral-upload-pipeline',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed for ${repoPath}: ${res.status} ${text}`);
  }

  return res.json();
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const appId = process.env.GITHUB_APP_ID;
    const installationId = process.env.GITHUB_APP_INSTALLATION_ID;
    const privateKeyRaw = process.env.GITHUB_APP_PRIVATE_KEY;
    const owner = process.env.GITHUB_OWNER || 'coral-lab-asu';
    const repo = process.env.GITHUB_REPO || 'coral-lab-asu.github.io';
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!appId || !installationId || !privateKeyRaw) {
      return res.status(500).json({
        error: 'Missing GitHub App configuration: GITHUB_APP_ID, GITHUB_APP_INSTALLATION_ID, GITHUB_APP_PRIVATE_KEY'
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const filename = sanitizeFilename(body.filename);
    const contentBase64 = String(body.contentBase64 || '').trim();

    if (!filename || !contentBase64) {
      return res.status(400).json({ error: 'filename and contentBase64 are required' });
    }

    if (contentBase64.length > 14 * 1024 * 1024) {
      return res.status(413).json({ error: 'File too large' });
    }

    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
    const installationToken = await getInstallationToken(appId, installationId, privateKey);

    const primaryPath = `poster_docs/${filename}`;
    const secondaryPath = `images/paper snap/${filename}`;

    await upsertFile(owner, repo, branch, primaryPath, contentBase64, installationToken);
    await upsertFile(owner, repo, branch, secondaryPath, contentBase64, installationToken);

    return res.status(200).json({
      ok: true,
      primaryPath,
      secondaryPath,
      imageFieldValue: primaryPath
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Upload failed' });
  }
};
