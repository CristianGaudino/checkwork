import { afterEach, expect, it } from 'vitest';
import robots from './robots';

afterEach(() => { delete process.env.APP_ENV; });

it('keeps search engines out unless APP_ENV is production', () => {
    expect(robots().rules).toEqual({ userAgent: '*', disallow: '/' });
    process.env.APP_ENV = 'production';
    expect(robots().rules).toEqual({ userAgent: '*', allow: '/' });
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
});
