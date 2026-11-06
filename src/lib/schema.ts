import { ROUTES, SITE, SITE_URL } from '@/lib/config';

// schema.org structured data. Only facts the site already states: no address, phone, ratings or social profiles until they exist (issue #2).

const ORG_ID = `${SITE_URL}/#organization`;
const url = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

export const siteGraph = () => ({
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ProfessionalService',
            '@id': ORG_ID,
            name: SITE.name,
            url: url('/'),
            logo: `${SITE_URL}/apple-touch-icon.png`,
            description: SITE.description,
            areaServed: { '@type': 'Country', name: 'Ireland' },
        },
        { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: url('/'), name: SITE.name, publisher: { '@id': ORG_ID } },
    ],
});

export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: url(t.path) })),
});

export const dealerService = () => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Car dealer websites',
    serviceType: 'Website design and development for car dealerships',
    url: url(ROUTES.dealers),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Ireland' },
});
