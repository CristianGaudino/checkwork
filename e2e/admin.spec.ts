import { expect, test } from '@playwright/test';

test('the admin page is closed without a login, and not in the sitemap', async ({ page, request }) => {
    const headers = { 'cf-access-jwt-assertion': 'a.b.c' }; // a made-up token must not get in either
    if (process.env.E2E_BASE_URL) {
        // Deployed: Cloudflare Access answers first and sends visitors to its login page
        const res = await request.get('/admin', { maxRedirects: 0, headers });
        expect(res.status()).toBe(302);
        expect(res.headers().location).toContain('cloudflareaccess.com');
    } else {
        // Local Worker: no Access in front, so the page itself must refuse
        expect((await page.goto('/admin'))?.status()).toBe(404);
        expect((await request.get('/admin', { headers })).status()).toBe(404);
    }
    expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/admin');
});
