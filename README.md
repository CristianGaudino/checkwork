# Checkwork

The website for Checkwork: websites, web apps and AI enablement for businesses in Ireland. Fast on a phone, easy to find on Google and easy for your team to run.

Live at **https://www.checkwork.ie** (the bare `checkwork.ie` redirects to it).

## What is in it

- Public pages: home, services, work (with a case study per project), car dealer websites, about, contact and privacy.
- A contact form. Enquiries are checked with Turnstile, rate limited, stored in Cloudflare D1 and, once switched on, emailed to the owner.
- `/admin`: the owner's list of enquiries with status, search and private notes. It sits behind Cloudflare Access and is not in the sitemap.

## Stack

Next.js 16 (App Router) and React 19, Tailwind CSS v4, deployed to Cloudflare Workers with OpenNext. Cloudflare D1 through Drizzle for data, Cloudflare Email Service for alerts, Turnstile for spam. Tests with Vitest and Playwright.

## Run it locally

Needs Node 24.

```
npm install
npm run dev        # http://localhost:3000
```

`npm run dev` uses a local D1 database. Create its tables once with `npm run db:migrate:local`. `/admin` is open in `next dev` only.

## Checks

| Command | What it does |
|---|---|
| `npm run lint` | ESLint |
| `npm run typecheck` | Type check |
| `npm test` | Unit tests |
| `npm run build` | Next build |
| `npm run e2e` | Builds the Worker, serves it with a local D1 and runs Playwright and axe on every page. Screenshots go to `test-results/screenshots/`. |
| `npm run lighthouse` | Lighthouse against a running Worker. `CHROME_PATH` picks the browser. |

Add each new page to `PAGES` in `e2e/public.spec.ts` and `scripts/lighthouse.mjs`.

## Database

Edit `src/lib/db/schema.ts`, run `npm run db:generate` and commit the new files in `drizzle/`. Migrations only add things. Apply them with `npm run db:migrate:local` or `npm run db:migrate:remote`. After changing `wrangler.jsonc`, run `npm run cf-typegen`.

## Deploying

Merging to `main` does not deploy. To release, run the **Release** workflow from the Actions tab and pick major, minor or patch. It tags the next version, then the deploy workflow runs the tests, applies D1 migrations, deploys the Worker and runs the e2e suite against the live site. Both are gated on the repository variable `DEPLOY_ENABLED` being `true`. The repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are needed.

Do not start the Deploy workflow by hand with a version that does not exist. Use Release.

## Secrets and settings

These live on the Worker, not in the repo (Cloudflare dashboard: Workers & Pages, checkwork, Settings, Variables and Secrets, type **Secret**; or `npx wrangler secret put NAME`). They go with the Worker, so check them again if it is ever deleted and recreated. With `ACCESS_*` missing, `/admin` returns a 404 to everyone.

| Secret | What for |
|---|---|
| `TURNSTILE_SECRET_KEY` | The contact form's spam check (the secret key, not the site key). |
| `ACCESS_TEAM_DOMAIN` | Your Access team domain, such as `plain-tree-3979.cloudflareaccess.com`. |
| `ACCESS_AUD` | The audience tag of the Access application that protects `/admin`. |
| `ENQUIRY_ALERT_TO` | Where enquiry alert emails go. No alerts are sent while it is unset. |

Plain values (such as `APP_ENV`) live in `wrangler.jsonc`, because every deploy replaces the dashboard's plain variables with them.

Other settings:
- **Access:** one application covers the path `admin` on both `www.checkwork.ie` and `checkwork.ie`.
- **Turnstile:** the widget allows `www.checkwork.ie` and `checkwork.ie`.
- **Domain:** set in `src/lib/config.ts` (`SITE_URL`) and the routes in `wrangler.jsonc`. Keep `www` first in the routes.
- **Email alerts:** the sender is `enquiries@checkwork.ie`, so the domain has to be onboarded for Email Sending.

## Reference folders

`checkwork-site/` is an earlier Astro mock and `checkwork-brand-pack/` holds the brand files. Both are reference only and not part of the app.

Planning lives in GitHub issues and the Checkwork project.
