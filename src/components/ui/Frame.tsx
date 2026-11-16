import Image from 'next/image';

/** A screenshot in a rounded frame, with an optional caption. With no screenshot yet, the alt text (the project's name) stands in */
export function Frame({ src, alt, caption }: { src?: string; alt: string; caption?: string }) {
    return (
        <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            {src
                ? <Image src={src} alt={alt} width={1600} height={1000} className="h-auto w-full" />
                : <div className="grid aspect-[16/10] place-content-center bg-canvas p-6 text-center font-display text-3xl font-semibold text-fg-muted">{alt}</div>}
            {caption && <figcaption className="px-4 py-3 text-sm text-fg-muted">{caption}</figcaption>}
        </figure>
    );
}
