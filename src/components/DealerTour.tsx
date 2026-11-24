'use client';

import { useState } from 'react';
import { Shot } from '@/components/ui/Shot';
import { TOUR } from '@/content/dealer';
import { DEMO_URL } from '@/lib/config';

const host = new URL(DEMO_URL).host;
const preload = (src: string | null) => void (src && (new window.Image().src = src));

/**
 * A walk through the demo website: pick a screen and the screenshot changes in a browser frame.
 * Without JavaScript it shows the first screen and the list still reads as a list of what the website does.
 */
export function DealerTour() {
    const [at, setAt] = useState(0);
    const stop = TOUR[at];

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
            <ol className="grid content-start border-t border-line">
                {TOUR.map((s, i) => (
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

            {/* On a phone the picture comes first, so a tap on the list below shows its change straight above */}
            <figure className="order-first min-w-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-frame lg:order-none">
                <div aria-hidden="true" className="flex items-center gap-3 border-b border-line px-4 py-2.5">
                    <span className="flex gap-1.5">{[0, 1, 2].map(i => <span key={i} className="size-2.5 rounded-full bg-fg/15" />)}</span>
                    <span className="min-w-0 flex-1 truncate rounded-md bg-canvas px-3 py-1 text-center text-xs text-fg-muted">{host}{stop.path === '/' ? '' : stop.path}</span>
                </div>
                <Shot key={stop.id} src={stop.src} phone={stop.phone} alt={stop.alt} fetchPriority={at === 0 ? 'high' : undefined} className="appear-now" />
                <figcaption className="sr-only">{stop.title}</figcaption>
            </figure>
        </div>
    );
}
