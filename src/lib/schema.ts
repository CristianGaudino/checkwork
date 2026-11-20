import { eur, TIERS } from '@/content/pricing';
import { CONTACT_EMAIL, ROUTES, SITE, SITE_URL } from '@/lib/config';

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
            email: CONTACT_EMAIL,
            areaServed: { '@type': 'Country', name: 'Ireland' },
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Plans for car dealers',
                // The monthly price before VAT. Setup and Group's extra branches are on top, so they are named in the description rather than left out silently.
                itemListElement: TIERS.map(t => ({
                    '@type': 'Offer',
                    url: url(ROUTES.pricing),
                    itemOffered: { '@type': 'Service', name: `${t.name} plan`, description: `${t.lead} ${t.items.join('. ')}.` },
                    priceSpecification: { '@type': 'UnitPriceSpecification', price: t.eur, priceCurrency: 'EUR', unitText: 'MONTH', valueAddedTaxIncluded: false },
                    description: `${eur(t.eur)} a month and ${eur(t.setupEur)} setup, before VAT${t.branchEur ? `, plus ${eur(t.branchEur)} a month for each branch after the first` : ''}.`,
                })),
            },
        },
        { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: url('/'), name: SITE.name, publisher: { '@id': ORG_ID } },
    ],
});

export const service = (name: string, serviceType: string, path: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    url: url(path),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Ireland' },
});
