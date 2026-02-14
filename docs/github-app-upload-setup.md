# GitHub App Upload Pipeline Setup

This guide configures the form backend endpoints:
- `/api/upload-poster`
- `/api/submit-resource`

## 1) Create GitHub App
1. Go to: `https://github.com/settings/apps`
2. Click **New GitHub App**.
3. Suggested values:
   - **GitHub App name**: `coral-lab-upload-pipeline`
   - **Homepage URL**: `https://coral-lab-asu.github.io`
   - **Webhook**: disable (not needed)
4. Repository permissions:
   - **Contents**: `Read and write`
5. Save app.

## 2) Install App On Repo
1. Open your app page and click **Install App**.
2. Choose account/org: `coral-lab-asu`.
3. Select repo: `coral-lab-asu.github.io`.
4. Install.

## 3) Collect Required IDs/Keys
- **App ID**: on GitHub App settings page.
- **Installation ID**: from app installation page URL (`.../installations/<ID>`).
- **Private key**: app settings -> **Private keys** -> generate and download `.pem`.

## 4) Deploy Backend (Vercel Recommended)
1. Import this repo into Vercel.
2. Ensure API routes deploy from `/api`.
3. Add environment variables from `.env.vercel.example`.

## 5) Set Frontend Endpoint URLs
Edit `_config.yml`:

```yml
upload_api_url: "https://<your-vercel-domain>/api/upload-poster"
resource_submit_api_url: "https://<your-vercel-domain>/api/submit-resource"
```

## 6) Validate End-to-End
1. Open `/publication-info-form`.
2. Drag/drop poster and confirm upload success.
3. Fill metadata and click **Submit**.
4. Confirm `_data/resources.csv` updated in repo.

## Common Issues
- `Upload backend is not configured`:
  - `upload_api_url` not set in `_config.yml`.
- `Submission backend is not configured`:
  - `resource_submit_api_url` not set in `_config.yml`.
- `Missing GitHub App configuration`:
  - Missing `GITHUB_APP_ID`, `GITHUB_APP_INSTALLATION_ID`, or `GITHUB_APP_PRIVATE_KEY` in deployment env.
- `403/401 from GitHub API`:
  - App not installed on target repo, wrong installation ID, or missing Contents write permission.
