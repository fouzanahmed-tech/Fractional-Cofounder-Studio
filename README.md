# Fractional Cofounder Studio

Marketing website for [fractionalcofounderstudio.com](https://fractionalcofounderstudio.com) — a hands-on startup execution partner for idea-stage, pre-seed, and seed-stage founders.

## Stack

- Pure HTML5 / CSS3 / vanilla JavaScript — no framework, no build step
- Hosted on GitHub Pages with a custom GoDaddy domain
- Contact form via [Formspree](https://formspree.io)
- Analytics via Google Analytics 4

## Project structure

```
├── assets/                  Static images
├── css/
│   └── styles.css           All styles (dark + light theme via CSS variables)
├── js/
│   └── script.js            Theme toggle, scroll reveal, form handler
├── .github/
│   └── workflows/
│       └── deploy.yml       Auto-deploy to GitHub Pages on push to main
├── index.html               Home page
├── about.html               About page
├── CNAME                    Custom domain for GitHub Pages
└── .gitignore
```

## Local development

```bash
# Python (built-in)
python -m http.server 3334

# Then open http://localhost:3334
```

## Deploy

Push to `main` — GitHub Actions automatically deploys to GitHub Pages.

## Required setup before going live

1. **Google Analytics** — replace `G-XXXXXXXXXX` in `index.html`, `about.html`
2. **Formspree** — replace `YOUR_FORM_ID` in `js/script.js`
3. **GitHub Pages** — enable in repo Settings → Pages → Source: GitHub Actions
4. **Custom domain DNS** — point GoDaddy to GitHub Pages (see DEPLOY.md)

## Security

- Content-Security-Policy via `<meta>` tags on every page
- Honeypot field on intake form to catch bots
- `nosniff`, `referrer-policy` headers set via meta
- No secrets or API keys in the codebase
- `anonymize_ip: true` on GA4
