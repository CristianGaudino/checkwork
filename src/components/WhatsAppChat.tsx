import Image from 'next/image';
import type { ChatLine } from '@/content/dashboard';

/** A WhatsApp conversation as it looks on a phone: drawn in code from the demo's own messages, so it stays sharp and true to the demo */
export function WhatsAppChat({ title, caption, lines, who }: { title: string; caption: string; lines: readonly ChatLine[]; who: { in: string; out: string } }) {
    return (
        <figure className="grid w-full max-w-sm content-start gap-3 justify-self-center">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-frame">
                <div className="flex items-center gap-3 border-b border-line bg-surface px-5 py-4">
                    <span aria-hidden="true" className="grid size-9 place-content-center rounded-full bg-accent/20 font-display font-semibold text-accent-alt">C</span>
                    <div className="grid">
                        <span className="font-semibold">{title}</span>
                        <span className="text-xs text-fg-muted">WhatsApp Business</span>
                    </div>
                </div>
                <ol className="grid gap-3 p-4 text-sm">
                    {lines.map(m => (
                        <li key={m.text} className={`grid max-w-[85%] gap-2 ${m.dir === 'out' ? 'justify-self-end' : ''}`}>
                            <div className={`grid gap-2 rounded-2xl px-4 py-2.5 ${m.dir === 'out' ? 'rounded-br-md bg-accent/20' : 'rounded-bl-md bg-surface'}`}>
                                {m.photos && (
                                    <div className="-mx-2 grid grid-cols-3 gap-1 pt-1">
                                        {m.photos.map((src, i) => <Image key={src} src={src} alt={`Photo ${i + 1} of the car`} width={360} height={270} sizes="96px" className="aspect-[4/3] w-full rounded-lg bg-paper object-cover" />)}
                                    </div>
                                )}
                                <p className="whitespace-pre-line">
                                    <span className="sr-only">{m.dir === 'out' ? who.out : who.in}: </span>
                                    {m.text}
                                </p>
                            </div>
                            {m.buttons && (
                                <ul className="grid gap-1" aria-label="Reply buttons">
                                    {m.buttons.map(b => <li key={b} className="rounded-xl border border-line bg-surface px-3 py-2 text-center text-accent-alt">{b}</li>)}
                                </ul>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
            <figcaption className="text-center text-sm text-fg-muted">{caption}</figcaption>
        </figure>
    );
}
