# Fractional Cofounder Studio

Marketing website for [fractionalcofounderstudio.com](https://fractionalcofounderstudio.com) — a hands-on startup execution partner for idea-stage, pre-seed, and seed-stage founders.

## Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript — no framework, no build step
- Hosted on **GitHub Pages** (auto-deploy via GitHub Actions)
- Forms via **Formspree** (`xnjyglql`)
- Analytics via **Google Analytics 4**

## Project structure

```
├── frontend/               ← All website files (deployed to GitHub Pages)
│   ├── index.html          Main landing page
│   ├── about.html          About page
│   ├── css/
│   │   └── styles.css      All styles — dark + light theme via CSS variables
│   ├── js/
│   │   └── script.js       Theme toggle, scroll reveal, form handler
│   ├── assets/
│   │   ├── favicon.svg     Browser tab icon
│   │   └── hero-founder-operator.png  OG social share image
│   └── CNAME               Custom domain for GitHub Pages
│
├── .github/
│   └── workflows/
│       └── deploy.yml      Auto-deploy frontend/ to GitHub Pages on push to main
├── .gitignore
└── README.md
```

## Backend services

This is a static frontend site. All backend functionality is handled by third-party services:

| Service | Purpose | Where configured |
|---|---|---|
| [Formspree](https://formspree.io) | Contact form submissions | `js/script.js` — form ID `xnjyglql` |
| [Google Analytics 4](https://analytics.google.com) | Page analytics | `index.html`, `about.html` — replace `G-XXXXXXXXXX` |
| [GitHub Pages](https://pages.github.com) | Static hosting + CDN | `.github/workflows/deploy.yml` |
| [GoDaddy DNS](https://dcc.godaddy.com) | Custom domain routing | A records → GitHub Pages IPs + www CNAME |

## Local development

```bash
cd frontend
python -m http.server 3334
# Open http://localhost:3334
```

## Deploy

Push to `main` — GitHub Actions deploys `frontend/` to GitHub Pages automatically.

## Required setup (one-time)

1. **Google Analytics** — replace `G-XXXXXXXXXX` in `frontend/index.html` and `frontend/about.html`
2. **GitHub Pages** — Settings → Pages → Source: GitHub Actions
3. **GoDaddy DNS** — 4 A records pointing to GitHub Pages IPs + www CNAME → `fouzanahmed-tech.github.io`

## Security

- Content-Security-Policy via `<meta>` tags on every page
- Honeypot field on intake form to catch bots
- `nosniff` + `referrer-policy` headers set via meta
- No secrets or API keys in the codebase
- `anonymize_ip: true` on GA4
