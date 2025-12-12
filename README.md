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

