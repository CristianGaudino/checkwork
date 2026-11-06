# Checkwork

Marketing site for Checkwork: websites and dealer tools for car dealerships in Ireland.

**Stack:** Next.js 16 · Tailwind CSS v4 · Cloudflare Workers (OpenNext). Neon is added with the contact form.

    nvm use          # Node 24
    npm install
    npm run dev      # http://localhost:3000

Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. Worker build: `npx opennextjs-cloudflare build`.

`checkwork-site/` is the Astro mock and `checkwork-brand-pack/` the brand files: reference only, not part of the app.
Planning lives in GitHub issues and the Checkwork project.
