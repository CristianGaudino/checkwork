import { expect, test } from '@playwright/test';

test('the admin page is a 404 without Cloudflare Access, and not in the sitemap', async ({ page, request }) => {
    expect((await page.goto('/admin'))?.status()).toBe(404);
    // A made-up token must not get in either
    const forged = await request.get('/admin', { headers: { 'cf-access-jwt-assertion': 'a.b.c' } });
    expect(forged.status()).toBe(404);
    expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/admin');
});
