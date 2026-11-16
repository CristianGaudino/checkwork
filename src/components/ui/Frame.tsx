import Image from 'next/image';

/** A screenshot in a rounded frame, with an optional caption */
export function Frame({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
    return (
        <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image src={src} alt={alt} width={1600} height={1000} className="h-auto w-full" />
            {caption && <figcaption className="px-4 py-3 text-sm text-fg-muted">{caption}</figcaption>}
        </figure>
    );
}
