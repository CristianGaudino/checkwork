/** The one place the domain and brand facts live. Change SITE_URL (wrangler.jsonc) to move the site; this is only the fallback. */
export const SITE_URL: string = (process.env.SITE_URL ?? 'https://checkwork.cgaudino.com').replace(/\/$/, '');

export const SITE = {
    name: 'Checkwork',
    tagline: 'Websites that work.',
    description:
        'Checkwork designs and builds websites and dealer tools for car dealerships and growing businesses in Ireland.',
    country: 'Ireland',
    locale: 'en-IE',
} as const;

export const BRAND_COLORS = { midnight: '#0B0F1F', paper: '#F5F6FA' } as const;

/** Production lets search engines in; everything else (local, previews) does not. */
export const isProduction = (): boolean => process.env.APP_ENV === 'production';
