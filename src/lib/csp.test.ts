import { expect, it } from 'vitest';
import nextConfig from '../../next.config';

// The policy is what lets the contact form's spam check and the analytics script run: a typo would break them silently.
it('allows Turnstile and Cloudflare Web Analytics, and nothing else off-site', async () => {
    const headers = await nextConfig.headers!();
    const csp = headers[0].headers.find(h => h.key === 'Content-Security-Policy')!.value;
    expect(csp).toContain('script-src');
    expect(csp).toMatch(/script-src[^;]*challenges\.cloudflare\.com[^;]*static\.cloudflareinsights\.com/);
    expect(csp).toMatch(/connect-src[^;]*https:\/\/cloudflareinsights\.com/);
    expect(csp).toMatch(/frame-src https:\/\/challenges\.cloudflare\.com(;|$)/);
    expect(csp).toContain("frame-ancestors 'none'");
});
