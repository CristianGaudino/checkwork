import axe from 'axe-core';
import { expect, type Page, test } from '@playwright/test';
import { PROJECTS } from '@/content/projects';
import { ROUTES } from '@/lib/config';

// Page animations (the home page's launch check) must be finished before axe measures colours or a screenshot is taken
const settled = (page: Page) => page.waitForFunction(() => document.getAnimations().every(a => a.playState === 'finished'));

// Add each page here as it lands.
const PAGES = [ROUTES.home, ROUTES.work, ROUTES.contact, ROUTES.services, ROUTES.dealers, ROUTES.dealerAI, ROUTES.about, ROUTES.privacy, ...PROJECTS.map(p => `${ROUTES.work}/${p.slug}`)];

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
    await expect(page.getByRole('heading', { level: 1 })).toContainText("didn't pass the check");
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
    const services = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Services' });
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(services).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(services).toBeHidden();
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
    await page.getByRole('button', { name: /Car pages that ask for the sale/ }).click();
    await expect(tour.getByRole('img')).toHaveAttribute('alt', /MINI Clubman/);
    await page.getByRole('button', { name: 'What your team sees' }).click();
    await expect(page.getByRole('button', { name: 'What your team sees' })).toHaveAttribute('aria-pressed', 'true');
    await expect(tour.getByRole('img')).toHaveAttribute('alt', /dashboard overview/);
    await expect(page.getByRole('link', { name: /Try the live demo/ }).first()).toHaveAttribute('href', 'https://www.demo.checkwork.ie');
});
