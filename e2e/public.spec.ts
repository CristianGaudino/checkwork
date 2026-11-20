import axe from 'axe-core';
import { expect, type Page, test } from '@playwright/test';
import { ROUTES } from '@/lib/config';

// Page animations (the home page's launch check) must be finished before axe measures colours or a screenshot is taken
const settled = (page: Page) => page.waitForFunction(() => document.getAnimations().every(a => a.playState === 'finished'));

// Add each page here as it lands.
const PAGES = [ROUTES.home, ROUTES.contact, ROUTES.dealers, ROUTES.dealerAI, ROUTES.pricing, ROUTES.about, ROUTES.privacy];

// Live site: skip Next's link prefetches (about 10 a page). Cloudflare's rate limit counts each as a page visit and blocks at 50 in 10 seconds
test.beforeEach(async ({ page }) => {
    if (process.env.E2E_BASE_URL) await page.route(url => url.searchParams.has('_rsc'), route => (route.request().headers()['next-router-prefetch'] ? route.abort() : route.continue()));
});

for (const path of PAGES) {
    test(`${path}: one h1, a title, a canonical, and no axe violations`, async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
        await expect(page).toHaveTitle(/Checkwork/);
        await expect(page.locator('link[rel=canonical]')).toHaveCount(1);
        // Share tags: what a link looks like in WhatsApp, LinkedIn and Slack
        for (const tag of ['og:title', 'og:description', 'og:url', 'og:image']) await expect(page.locator(`meta[property="${tag}"]`)).toHaveCount(1);
        await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
        // Every block of structured data must parse
        for (const block of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(block);
        await settled(page);
        // Include colour contrast: the brand is dark-on-dark and easy to get wrong
        await page.addScriptTag({ content: axe.source });
        const violations = await page.evaluate(async () => (await (window as unknown as { axe: typeof axe }).axe.run(document)).violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).join(' | ')}`));
        expect(violations).toEqual([]);
    });

    // Looked at by a person: screenshots land in test-results/screenshots (git-ignored)
    test(`${path}: screenshot`, async ({ page }, info) => {
        await page.goto(path);
        await settled(page);
        await page.screenshot({ path: `test-results/screenshots/${info.project.name}${path === '/' ? '-home' : path.replaceAll('/', '-')}.png`, fullPage: true });
    });
}

test('not found page is a 404 and not indexed', async ({ page }) => {
    const response = await page.goto('/does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/didn.t pass the check/);
    await expect(page.locator('meta[name=robots]').first()).toHaveAttribute('content', /noindex/);
});

test('robots.txt lets search engines in and names the sitemap, which lists the pages', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Disallow: /admin');
    expect(robots).toContain('Sitemap:');
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBe(true);
    for (const path of PAGES) expect(await sitemap.text()).toContain(`${path === '/' ? '' : path}</loc>`);
});

test('skip link is first on the tab order and the mobile menu opens and closes', async ({ page, isMobile }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    if (!isMobile) return;
    const pricing = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Pricing' });
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(pricing).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(pricing).toBeHidden();
    // Escape closes it too, and focus goes back to the Menu button
    await page.getByRole('button', { name: 'Menu' }).click();
    await pricing.focus();
    await page.keyboard.press('Escape');
    await expect(pricing).toBeHidden();
    await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused();
});

test('dealer page has site, service and FAQ structured data', async ({ page }) => {
    await page.goto(ROUTES.dealers);
    const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(t => JSON.parse(t)['@type'] ?? 'graph');
    expect(types).toEqual(expect.arrayContaining(['graph', 'Service', 'FAQPage']));
});

test('the dealer page tour switches screens and sides', async ({ page }) => {
    await page.goto(ROUTES.dealers);
    const tour = page.locator('figure').filter({ has: page.locator('img[alt^="Demo dealer"], img[alt^="A lead"]') });
    await expect(tour.getByRole('img')).toHaveAttribute('alt', /home page/);
    await page.getByRole('button', { name: /Car pages with every way to get in touch/ }).click();
    await expect(tour.getByRole('img')).toHaveAttribute('alt', /MINI Clubman/);
    await page.getByRole('button', { name: 'What your team sees' }).click();
    await expect(page.getByRole('button', { name: 'What your team sees' })).toHaveAttribute('aria-pressed', 'true');
    await expect(tour.getByRole('img')).toHaveAttribute('alt', /dashboard overview/);
    await expect(page.getByRole('link', { name: /Try the live demo/ }).first()).toHaveAttribute('href', 'https://www.demo.checkwork.ie');
});

test('pricing fits a 320px phone without scrolling sideways, and has FAQ data', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(ROUTES.pricing);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(t => JSON.parse(t)['@type'] ?? 'graph');
    expect(types).toEqual(expect.arrayContaining(['graph', 'FAQPage']));
});

test('old agency pages redirect to their dealer pages', async ({ request }) => {
    for (const [from, to] of [['/services', ROUTES.pricing], ['/work', ROUTES.dealers], ['/work/how-many', ROUTES.dealers], ['/work/blacktail-archive', ROUTES.dealers]]) {
        const r = await request.get(from, { maxRedirects: 0 });
        expect([from, r.status(), new URL(r.headers().location, 'http://x').pathname]).toEqual([from, 308, to]);
    }
    // The demo screenshots are served, not caught by a redirect
    expect((await request.get('/dealer-demo/site-home.webp')).status()).toBe(200);
});

// Break tests: no page scrolls sideways on a 280px screen or with the text made larger, and narrow screenshots for a person to look at
for (const path of PAGES) {
    test(`${path}: fits 280px and large text, with 320 and 390 screenshots`, async ({ page }, info) => {
        test.skip(info.project.name !== 'desktop', 'One run is enough: it sets its own sizes');
        // On a failure, names the elements that stick out past the right edge, and any word split across lines in a short label
        const fits = async (what: string) => expect([what, await page.evaluate(() => {
            const w = document.documentElement.clientWidth;
            const wide = [...document.body.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > w + 1).slice(-3).map(e => `${e.tagName.toLowerCase()} "${(e.textContent ?? '').trim().slice(0, 30)}"`);
            const split: string[] = [];
            for (const el of document.querySelectorAll('th, td, button, [data-button], nav a')) {
                const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
                for (let n = walk.nextNode() as Text | null; n; n = walk.nextNode() as Text | null) {
                    if (n.parentElement?.closest('.sr-only')) continue;
                    for (const m of n.data.matchAll(/\S+/g)) {
                        const r = document.createRange();
                        r.setStart(n, m.index);
                        r.setEnd(n, m.index + m[0].length);
                        if (new Set([...r.getClientRects()].map(c => Math.round(c.top))).size > 1) split.push(`split "${m[0]}"`);
                    }
                }
            }
            return [...wide, ...split];
        })]).toEqual([what, []]);
        await page.setViewportSize({ width: 280, height: 700 });
        await page.goto(path);
        await fits('280px');
        for (const [width, size] of [[280, '130%'], [280, '150%'], [320, '130%'], [320, '200%'], [360, '200%'], [390, '130%'], [390, '200%'], [640, '200%'], [768, '100%'], [768, '115%'], [768, '130%'], [820, '200%'], [840, '130%'], [920, '100%'], [920, '115%'], [920, '130%'], [1024, '100%'], [1024, '150%'], [1024, '200%']] as const) {
            await page.setViewportSize({ width, height: 844 });
            await page.evaluate(s => { document.documentElement.style.fontSize = s; }, size);
            await fits(`${width}px at ${size} text`);
        }
        for (const width of [320, 390]) {
            await page.setViewportSize({ width, height: 800 });
            await page.goto(path);
            await settled(page);
            await page.screenshot({ path: `test-results/screenshots/w${width}${path === '/' ? '-home' : path.replaceAll('/', '-')}.png`, fullPage: true });
        }
    });
}

test('the mobile menu closes on a tap outside it', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'The menu is a phone layout');
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
    // The empty side gutter of the page, below the open panel (which covers the hero heading on a phone)
    await page.locator('main').click({ position: { x: 4, y: 560 } });
    await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
});
