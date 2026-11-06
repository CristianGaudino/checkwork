import type { Metadata } from 'next';
import { SITE } from '@/lib/config';

export const OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: `${SITE.name}: ${SITE.tagline}` } as const;

/**
 * Title, description, canonical and share (Open Graph / Twitter) tags for a page, in one place so no page forgets one.
 * `title` is added to the site template ("Services · Checkwork"); pass `{ absolute }` to use it as written.
 */
export function pageMetadata({ title, description, path }: { title: string | { absolute: string }; description: string; path: string }): Metadata {
    const full = typeof title === 'string' ? `${title} · ${SITE.name}` : title.absolute;
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: { type: 'website', siteName: SITE.name, locale: 'en_IE', title: full, description, url: path, images: [OG_IMAGE] },
        twitter: { card: 'summary_large_image', title: full, description, images: [OG_IMAGE.url] },
    };
}
