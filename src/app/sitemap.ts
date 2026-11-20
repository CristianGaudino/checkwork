import type { MetadataRoute } from 'next';
import { ROUTES, SITE_URL } from '@/lib/config';

const PAGES: string[] = [
    ROUTES.home, ROUTES.dealers, ROUTES.dealerAI, ROUTES.pricing, ROUTES.about, ROUTES.contact, ROUTES.privacy,
];

export default function sitemap(): MetadataRoute.Sitemap {
    return PAGES.map(path => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }));
}
