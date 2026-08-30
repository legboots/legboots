Deploying legboots.xyz
======================

The site is the contents of `src/`. No build step, no framework.

Both pages share their header and footer markup. There is no templating, so a change
to either has to be made in both files.

## Running locally

Open `src/index.html`, or serve the directory:

```bash
python -m http.server -d src 8000
```

## Deployment

Pushes to `master` that touch `src/` publish to GitHub Pages via
[.github/workflows/deploy.yml](.github/workflows/deploy.yml), which uploads `src/` as the
Pages artifact. No secrets are needed; the workflow authenticates with `id-token: write`.

One-time setup:

- Settings > Pages > Build and deployment > Source: **GitHub Actions**
- Settings > Pages > Custom domain: `legboots.xyz`, then tick **Enforce HTTPS** once the
  certificate is issued
- `src/CNAME` holds the custom domain so it survives every deploy. Without it a deploy can
  clear the domain set in Settings

## DNS

Apex `legboots.xyz` needs four A records (and optionally the AAAA equivalents) pointing at
GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

`www.legboots.xyz` is a CNAME to `legboots.github.io`.

The repo is named `legboots` under the user `legboots`, so it is a *project* site, served at
`legboots.github.io/legboots/` until the custom domain resolves. Every path in the site is
relative, so it works correctly at either address.
