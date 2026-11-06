import { afterEach, expect, it, vi } from 'vitest';
import { verifyTurnstile } from './turnstile';

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
const respond = (body: unknown, ok = true) => vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok, json: async () => body }));

it('passes only when Cloudflare says success', async () => {
    respond({ success: true });
    expect(await verifyTurnstile('t')).toBe(true);
    respond({ success: false });
    expect(await verifyTurnstile('t')).toBe(false);
    respond({ success: true }, false);
    expect(await verifyTurnstile('t')).toBe(false);
});

it('fails closed on an empty token, a network error, or no secret in production', async () => {
    respond({ success: true });
    expect(await verifyTurnstile('')).toBe(false);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    expect(await verifyTurnstile('t')).toBe(false);
    vi.stubEnv('APP_ENV', 'production');
    respond({ success: true });
    expect(await verifyTurnstile('t')).toBe(false);
});
