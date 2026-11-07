# Checkwork website

Astro static site. Node 20+.

    npm install
    npm run dev        # http://localhost:4321
    npm run build      # outputs ./dist (deploy anywhere: Cloudflare Pages, Netlify, Vercel)

## Before launch (search the project for `TODO`)
- `src/config.ts`: confirm domain + email, add legal company details and team names.
- Screenshots: put images in `public/work/<slug>/` and set `src` on each shot in `src/data/projects.ts`
  (until then, pages show a clearly marked placeholder).
- Contact form: copy `.env.example` to `.env`, set `PUBLIC_FORM_ENDPOINT` (Formspree, Web3Forms, etc).
- Review the privacy notice (`src/pages/privacy.astro`) and the checklist promises (`src/data/checks.ts`).
- Replace the domain in `astro.config.mjs` and `public/robots.txt` if it changes.

## Brand
`public/brand/` has the logo pack (SVG + PNG). Colours and type tokens live at the top of `src/styles/global.css`.
