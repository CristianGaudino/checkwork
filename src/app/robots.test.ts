import { afterEach, expect, it, vi } from 'vitest';
import robots from './robots';

afterEach(() => { vi.unstubAllEnvs(); });

it('keeps search engines out unless APP_ENV is production', () => {
    expect(robots().rules).toEqual({ userAgent: '*', disallow: '/' });
    vi.stubEnv('APP_ENV', 'production');
    expect(robots().rules).toEqual({ userAgent: '*', allow: '/', disallow: '/admin' });
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
});
