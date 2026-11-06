import Image from 'next/image';

/** A screenshot slot. Without `src` it shows a clearly marked placeholder, never a fake screenshot (list missing ones in issue #2). */
export function Frame({ src, alt, caption, label, hint }: { src?: string; alt: string; caption?: string; label: string; hint?: string }) {
    return (
        <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            {src ? (
                <Image src={src} alt={alt} width={1600} height={1000} className="h-auto w-full" />
            ) : (
                <div role="img" aria-label={alt} className="grid aspect-[16/10] place-content-center gap-1 border-b border-dashed border-line p-6 text-center">
                    <strong className="font-display text-lg">{label}</strong>
                    <span className="text-sm text-fg-muted">Screenshot to add{hint ? `: ${hint}` : ''}</span>
                </div>
            )}
            {caption && <figcaption className="px-4 py-3 text-sm text-fg-muted">{caption}</figcaption>}
        </figure>
    );
}
