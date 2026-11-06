import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/content/projects';
import { ROUTES, SITE_URL } from '@/lib/config';

const PAGES: string[] = [
    ROUTES.home, ROUTES.work, ROUTES.services, ROUTES.dealers, ROUTES.about, ROUTES.contact, ROUTES.privacy,
    ...PROJECTS.map(p => `${ROUTES.work}/${p.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
    return PAGES.map(path => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }));
}
