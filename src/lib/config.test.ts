import { expect, it } from 'vitest';
import { SITE_URL } from './config';

it('has an absolute site URL without a trailing slash', () => {
    expect(() => new URL(SITE_URL)).not.toThrow();
    expect(SITE_URL.endsWith('/')).toBe(false);
});
