import { isProduction, TURNSTILE_TEST_SECRET } from '@/lib/config';
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Checks a Turnstile token with Cloudflare. Fails closed: no secret in production, a network error or a bad
 * response all mean "not verified". Outside production a missing secret falls back to Cloudflare's always-pass test secret.
 */
export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY || (isProduction() ? '' : TURNSTILE_TEST_SECRET);
    if (!secret || !token) return false;
    try {
        const body = new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) });
        const res = await fetch(VERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(5000) });
        if (!res.ok) return false;
        return ((await res.json()) as { success?: boolean }).success === true;
    } catch {
        return false;
    }
}
