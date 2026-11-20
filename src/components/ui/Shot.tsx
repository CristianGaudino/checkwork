import { getImageProps } from 'next/image';

/**
 * A demo screenshot that swaps to the phone version of the same screen below the `sm` breakpoint, where a laptop screenshot is too small to
 * read. Without `phone` it is a plain image. Phone shots are tall, so they are cut at the top to keep the page short.
 */
// fetchPriority rather than preload: with two sources, preloading one would load both (Next 16 docs, Art Direction)
export function Shot({ src, phone, alt, sizes, fetchPriority, className = '' }: { src: string; phone?: string; alt: string; sizes?: string; fetchPriority?: 'high'; className?: string }) {
    const { props } = getImageProps({ src, alt, width: 1920, height: 1200, sizes, fetchPriority });
    // The <img> next/image would render, built by getImageProps so <picture> can wrap it
    // eslint-disable-next-line @next/next/no-img-element -- it is next/image's own output
    if (!phone) return <img {...props} alt={alt} className={`h-auto w-full ${className}`} />;
    // Images are served as they are (next.config: unoptimized), so there is no srcSet: the file itself is the source
    const { props: small } = getImageProps({ src: phone, alt, width: 780, height: 1688, sizes: '100vw' });
    return (
        <picture>
            <source media="(max-width: 639px)" srcSet={small.srcSet ?? small.src} width={780} height={1688} />
            <img {...props} alt={alt} className={`h-auto w-full max-sm:max-h-[32rem] max-sm:object-cover max-sm:object-top ${className}`} />
        </picture>
    );
}
