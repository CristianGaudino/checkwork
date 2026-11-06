// Lighthouse (mobile) on every public page against a running site: `npm run lighthouse` after starting the Worker.
// BASE_URL defaults to the local `wrangler dev` port used by the e2e config. CHROME_PATH picks the browser (CI sets it).
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:3100';
const PAGES = ['/', '/work', '/work/carright', '/services', '/car-dealer-websites', '/about', '/contact', '/privacy'];
// Performance is lower here than on the real edge (no CDN, no HTTP/2): the floor catches regressions, not the best case
const MIN = { performance: 0.9, accessibility: 0.95, 'best-practices': 0.95, seo: 0.95 };

const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
const run = async path => (await lighthouse(BASE + path, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: Object.keys(MIN) })).lhr;
let failed = false;
try {
    // The first run after a server and browser start is slow (one measured 6.9 s of blocking time, then 60 ms): throw it away
    await run('/');
    for (const path of PAGES) {
        let lhr = await run(path);
        // One retry: a single noisy run should not fail a pull request, a real regression fails twice
        if (Object.entries(MIN).some(([id, min]) => (lhr.categories[id].score ?? 0) < min)) lhr = await run(path);
        const scores = Object.fromEntries(Object.entries(MIN).map(([id]) => [id, lhr.categories[id].score ?? 0]));
        const bad = Object.entries(MIN).filter(([id, min]) => scores[id] < min).map(([id]) => `${id} ${Math.round(scores[id] * 100)}`);
        console.log(`${bad.length ? 'FAIL' : 'ok  '} ${path}  ${Object.entries(scores).map(([id, s]) => `${id} ${Math.round(s * 100)}`).join(' · ')}`);
        if (bad.length) failed = true;
    }
} finally {
    await chrome.kill();
}
process.exit(failed ? 1 : 0);
