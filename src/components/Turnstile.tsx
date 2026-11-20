'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';
import { SITE_URL, TURNSTILE_SITE_KEY, TURNSTILE_TEST_SITE_KEY } from '@/lib/config';

type TurnstileApi = { render: (el: HTMLElement, opts: { sitekey: string; theme: string; callback: () => void; 'expired-callback': () => void; 'error-callback': () => void }) => string; reset: (id?: string) => void; remove: (id: string) => void };
declare global { interface Window { turnstile?: TurnstileApi } }

export type CheckState = 'waiting' | 'ready' | 'failed';
/** No token after this long means the check is stuck (blocked script, bad connection): let the visitor send and the server explain */
const GIVE_UP_MS = 15_000;

/**
 * Cloudflare Turnstile. It adds a hidden `cf-turnstile-response` field to the surrounding form. `resetKey` clears a used (single-use) token.
 * `onState` says whether there is a token to send, so the form can wait for one, or that the check failed and waiting is pointless.
 */
export function Turnstile({ resetKey, onState }: { resetKey: unknown; onState: (state: CheckState) => void }) {
    const el = useRef<HTMLDivElement>(null);
    const id = useRef<string>(undefined);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    // The widget is rendered once and calls back later: it reads the latest onState through a ref
    const report = useRef(onState);
    useEffect(() => { report.current = onState; });
    // Stable callbacks (they use refs only), so the effects below run once and on reset
    const set = useCallback((state: CheckState) => { clearTimeout(timer.current); report.current(state); }, []);
    const wait = useCallback(() => { set('waiting'); timer.current = setTimeout(() => report.current('failed'), GIVE_UP_MS); }, [set]);

    const render = useCallback(() => {
        if (el.current && window.turnstile && !id.current) id.current = window.turnstile.render(el.current, { sitekey: location.hostname === new URL(SITE_URL).hostname ? TURNSTILE_SITE_KEY : TURNSTILE_TEST_SITE_KEY, theme: 'dark', callback: () => set('ready'), 'expired-callback': wait, 'error-callback': () => set('failed') });
    }, [set, wait]);
    useEffect(() => {
        wait();
        render();
        return () => { clearTimeout(timer.current); if (id.current) window.turnstile?.remove(id.current); id.current = undefined; };
    }, [render, wait]);
    // A reset token is spent: wait for the next one
    useEffect(() => { if (id.current) { wait(); window.turnstile?.reset(id.current); } }, [resetKey, wait]);

    return (
        <>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={render} onError={() => set('failed')} />
            <div ref={el} />
        </>
    );
}
