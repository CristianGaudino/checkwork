import type { MetadataRoute } from 'next';
import { ROUTES, SITE_URL } from '@/lib/config';

// Case studies are added to this list with the Work pages.
const PAGES = [ROUTES.home, ROUTES.work, ROUTES.services, ROUTES.dealers, ROUTES.about, ROUTES.contact, ROUTES.privacy];

export default function sitemap(): MetadataRoute.Sitemap {
    return PAGES.map(path => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }));
}
