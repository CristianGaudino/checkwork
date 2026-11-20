'use client';

import { useState } from 'react';
import { Shot } from '@/components/ui/Shot';
import { TOUR } from '@/content/dealer';
import { DEMO_URL } from '@/lib/config';

const host = new URL(DEMO_URL).host;
const preload = (src: string) => void (new window.Image().src = src);

/**
 * A walk through the demo: pick a side (the website or the dashboard), then a screen, and the screenshot changes in a browser frame.
 * Without JavaScript it shows the first screen and the list still reads as a list of what the product does.
 */
export function DealerTour() {
    const [side, setSide] = useState(0);
    const [at, setAt] = useState(0);
    const view = TOUR[side];
    const stop = view.stops[at];

    return (
        <div className="grid gap-8">
            <div role="group" aria-label="Which side of the product" className="flex w-fit rounded-xl border border-line p-1">
                {TOUR.map((t, i) => (
                    <button key={t.id} type="button" aria-pressed={i === side}
                        onClick={() => { setSide(i); setAt(0); }}
                        className="rounded-lg px-4 py-2.5 text-sm font-semibold text-fg-muted transition-colors aria-pressed:bg-surface aria-pressed:text-fg forced-colors:aria-pressed:outline-2 sm:px-5 sm:text-base">
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
                <div className="grid content-start gap-4">
                    <p className="text-fg-muted">{view.lead}</p>
                    <ol className="grid border-t border-line">
                        {view.stops.map((s, i) => (
                            <li key={s.id} className="border-b border-line">
                                <button type="button" aria-pressed={i === at} onClick={() => setAt(i)} onPointerEnter={() => preload(s.src)} onFocus={() => preload(s.src)}
                                    className="group grid w-full grid-cols-[1.75rem_1fr] gap-x-2 py-3.5 text-left forced-colors:aria-pressed:outline-2">
                                    <span className="font-display text-sm text-fg-muted group-aria-pressed:text-accent-alt">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="font-semibold text-fg-muted transition-colors group-hover:text-fg group-aria-pressed:text-fg">{s.title}</span>
                                    {/* The open stop says more; the others stay one line so the list reads at a glance */}
                                    <span className="col-start-2 hidden pt-1 text-sm text-fg-muted group-aria-pressed:block">{s.text}</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* On a phone the picture comes first, so a tap on the list below shows its change straight above */}
                <figure className="order-first min-w-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-frame lg:order-none">
                    <div aria-hidden="true" className="flex items-center gap-3 border-b border-line px-4 py-2.5">
                        <span className="flex gap-1.5">{[0, 1, 2].map(i => <span key={i} className="size-2.5 rounded-full bg-fg/15" />)}</span>
                        <span className="min-w-0 flex-1 truncate rounded-md bg-canvas px-3 py-1 text-center text-xs text-fg-muted">{host}{stop.path === '/' ? '' : stop.path}</span>
                    </div>
                    <Shot key={stop.src} src={stop.src} phone={stop.phone} alt={stop.alt} fetchPriority={side === 0 && at === 0 ? 'high' : undefined} className="appear-now" />
                    <figcaption className="sr-only">{stop.title}</figcaption>
                </figure>
            </div>
        </div>
    );
}
