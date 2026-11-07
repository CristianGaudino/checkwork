import type { MetadataRoute } from 'next';
import { isProduction, ROUTES, SITE_URL } from '@/lib/config';

// Dynamic on purpose: a static robots.txt would be fixed at build time, and the wrangler APP_ENV variable only exists at run time.
// Without this, a production build made without APP_ENV would tell Google to stay out.
export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
    if (!isProduction()) return { rules: { userAgent: '*', disallow: '/' } };
    return { rules: { userAgent: '*', allow: '/', disallow: ROUTES.admin }, sitemap: `${SITE_URL}/sitemap.xml` };
}
