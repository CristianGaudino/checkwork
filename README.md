# Checkwork

Marketing site for Checkwork: websites and dealer tools for car dealerships in Ireland.

**Stack:** Next.js 16 · Tailwind CSS v4 · Cloudflare Workers (OpenNext). Enquiries are stored in Cloudflare D1 (Drizzle), spam-checked with Turnstile.

    nvm use          # Node 24
    npm install
    npm run dev      # http://localhost:3000

Database (contact enquiries): `npm run db:generate` after editing `src/lib/db/schema.ts`, then `npm run db:migrate:local` (and `db:migrate:remote` against the real D1). After changing `wrangler.jsonc`, run `npm run cf-typegen`.

Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. Worker build: `npx opennextjs-cloudflare build`.

`checkwork-site/` is the Astro mock and `checkwork-brand-pack/` the brand files: reference only, not part of the app.
Planning lives in GitHub issues and the Checkwork project.
