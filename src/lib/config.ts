/**
 * The one place the domain lives (besides the route in wrangler.jsonc, which Cloudflare needs). Pages are built
 * static, so an environment variable read here would be fixed at build time: change the constant, not a variable.
 */
export const SITE_URL = 'https://www.checkwork.ie';

export const SITE = {
    name: 'Checkwork',
    tagline: 'Websites that work.',
    description:
        'Websites, web apps and AI enablement for businesses in Ireland. Fast on a phone, easy to find on Google and easy for your team to run.',
} as const;

export const BRAND_COLORS = { midnight: '#0B0F1F' } as const;

/** Production lets search engines in; everything else (local, previews) does not. Read at request time: see robots.ts. */
export const isProduction = (): boolean => process.env.APP_ENV === 'production';

export const ROUTES = {
    home: '/',
    work: '/work',
    services: '/services',
    dealers: '/car-dealer-websites',
    about: '/about',
    contact: '/contact',
    privacy: '/privacy',
    admin: '/admin',
} as const;

export const NAV = [
    { href: ROUTES.work, label: 'Work' },
    { href: ROUTES.services, label: 'Services' },
    { href: ROUTES.dealers, label: 'Car dealers' },
    { href: ROUTES.about, label: 'About' },
] as const;

export const CTA = { href: ROUTES.contact, label: 'Start a project' } as const;

/** TODO (issue #2): real registered company details. Empty values are not shown. */
export const LEGAL = { companyName: 'Checkwork', companyNumber: '', registeredOffice: '' } as const;


/**
 * Turnstile site keys (public by design). The real widget only works on SITE_URL's hostname; everywhere else (local dev, e2e, previews)
 * the component uses Cloudflare's always-pass TEST key, which pairs with the test secret.
 */
export const TURNSTILE_SITE_KEY = '0x4AAAAAAF3jkXJUAd2J0tuT';
export const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';
export const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA';

/**
 * Cloudflare Web Analytics token (public by design). Empty means analytics is off and no script is loaded.
 * TODO (issue #10): create the site in Cloudflare (Analytics & Logs, Web Analytics) for www.checkwork.ie and paste its token here.
 */
export const ANALYTICS_TOKEN = '';

/** Enquiry alert emails come from this address; the domain must be onboarded for Cloudflare Email Service (issue #28). Change it with the domain. */
export const ENQUIRY_ALERT_FROM = 'enquiries@checkwork.ie';
