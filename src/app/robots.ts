import type { MetadataRoute } from 'next';
import { isProduction, SITE_URL } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
    if (!isProduction()) return { rules: { userAgent: '*', disallow: '/' } };
    return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml` };
}
