/**
 * The one place the domain lives (besides the route in wrangler.jsonc, which Cloudflare needs). Pages are built
 * static, so an environment variable read here would be fixed at build time: change the constant, not a variable.
 */
export const SITE_URL = 'https://checkwork.cgaudino.com';

export const SITE = {
    name: 'Checkwork',
    tagline: 'Websites that work.',
    description:
        'Checkwork designs and builds websites and dealer tools for car dealerships and growing businesses in Ireland.',
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

/** TODO (issue #2): real names. Entries with an empty name are not shown on the About page. */
export const TEAM: readonly { name: string; role: string }[] = [
    { name: '', role: 'Developer' },
    { name: '', role: 'Developer' },
];
