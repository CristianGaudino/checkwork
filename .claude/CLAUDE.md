# Checkwork project rules

Follows the vintage repo's standards (../vintage/.claude/CLAUDE.md and README). If something is unclear, follow vintage, then ask the owner.

## Working in git
- Never commit on `main`. Branch first (`git switch -c <type>/<name>`).
- Open every PR against `main`, ready for review (not draft). Never merge a PR yourself.
- Stage named files, not `git add -A`. Never push `.env*`.
- Push fewer, finished commits: GitHub Actions minutes are limited.
- Track work in GitHub issues and the Checkwork project (#7). Link PRs to issues.

## Before opening a PR
Run the ponytail audit on what changed, fix what it raises, and run `npm run lint; echo $?`, `npm run typecheck`, `npm test`, `npm run build` (judge by exit code). Run `npm run e2e` (it builds and serves a production build itself) and look at the screenshots it writes to `test-results/screenshots/`. Add every new page to `PAGES` in `e2e/public.spec.ts`. Skip for docs-only changes and say so.

## Stack facts
- Next 16 on Cloudflare via OpenNext. No Cache Components / partial prefetching (opennextjs-cloudflare#1450). Read `node_modules/next/dist/docs/` before using a Next API.
- Domain lives in `src/lib/config.ts` (SITE_URL, set in `wrangler.jsonc`). Current: checkwork.cgaudino.com.
- Components use semantic Tailwind tokens (`bg-canvas`, `text-fg-muted`), never raw colours.

## Content rules
- Plain, short, human copy. No em dashes. No hype.
- Never invent metrics, testimonials, names or screenshots. Use a clearly marked placeholder and list it in issue #2.
