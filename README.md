This is the website for Vivek Gupta's CoRAL Lab at ASU. It is built with Jekyll, and modified on top of [Kording Lab](http://kordinglab.com/)

## Local preview setup (macOS/Homebrew)

Do this once to run the site locally:

1. Install a GitHub Pages–compatible Ruby (>=2.7, e.g., 3.2):
   ```bash
   brew install ruby@3.2
   ```
2. Add it to your PATH (Mac/Homebrew):
   ```bash
   echo 'export PATH="$(brew --prefix ruby@3.2)/bin:$PATH"' >> ~/.zshrc
   exec $SHELL -l
   ```
3. Install Bundler and gems in a project-local path (keeps things isolated):
   ```bash
   gem install bundler
   cd /Users/abhijit.chakraborty/Documents/GitHub/coral-lab-asu.github.io
   bundle config set path 'vendor/bundle'
   bundle install
   ```
4. Install the Python dependency for the resource updater (required to fetch abstracts):
   ```bash
   pip3 install requests
   ```
4. Serve locally:
   ```bash
   bundle exec jekyll serve
   ```
   Visit the URL printed (usually http://127.0.0.1:4000).


## Poster Upload Pipeline (GitHub App)

The publication form can upload poster images directly to this repo through a backend endpoint authenticated with a GitHub App.

### 1) Backend endpoint
- File added: `api/upload-poster.js`
- Expected deployment: a Node serverless platform (for example, Vercel) exposing `/api/upload-poster`.

### 2) Required backend environment variables
- `GITHUB_APP_ID`: GitHub App ID
- `GITHUB_APP_INSTALLATION_ID`: Installation ID for this repo
- `GITHUB_APP_PRIVATE_KEY`: App private key (PEM); if set in a single line, keep `\n` escapes
- `GITHUB_OWNER`: defaults to `coral-lab-asu`
- `GITHUB_REPO`: defaults to `coral-lab-asu.github.io`
- `GITHUB_BRANCH`: defaults to `main`

GitHub App permission required:
- Repository permission: `Contents` = `Read and write`

### 3) Frontend configuration
Set the deployed endpoint URL in `_config.yml`:

```yml
upload_api_url: "https://<your-backend-domain>/api/upload-poster"
```

Then run Jekyll build/serve. The form will upload selected poster images to both:
- `poster_docs/<filename>`
- `images/paper snap/<filename>`

### 4) Metadata submit endpoint (resources backend)
- File added: `api/submit-resource.js`
- This endpoint writes/updates entries directly in `_data/resources.csv` (upsert by title).

Set this frontend config in `_config.yml`:

```yml
resource_submit_api_url: "https://<your-backend-domain>/api/submit-resource"
```

The form action `Submit To Resources Backend` sends:
- section, title, paper_url, data_url, code_url, demo_url, image, authors, venue_name, venue_url, description

and updates the resources backend CSV used by `resources.html`.

## Quick Setup Files
- GitHub App + backend setup guide: `docs/github-app-upload-setup.md`
- Env var template for deployment: `.env.vercel.example`
- Vercel runtime config for API routes: `vercel.json`
