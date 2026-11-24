import { getImageProps } from 'next/image';

const FORCED = 'forced-colors:rounded-md forced-colors:bg-canvas forced-colors:p-1 forced-colors:[forced-color-adjust:none]';

/** The wordmark for the theme in use: the on-light file on a light page, the on-dark file on a dark one (both 345 x 60). One request, not two. */
export function Logo({ alt, height, preload }: { alt: string; height: number; preload?: boolean }) {
    const width = Math.round((height * 345) / 60);
    const { props } = getImageProps({ src: '/brand/checkwork-logo-on-light.svg', alt, width, height, fetchPriority: preload ? 'high' : undefined });
    return (
        <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/brand/checkwork-logo-on-dark.svg" />
            <img {...props} alt={alt} className={`w-auto ${FORCED}`} style={{ height }} />
        </picture>
    );
}
