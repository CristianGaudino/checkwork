'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { SITE_URL, TURNSTILE_SITE_KEY, TURNSTILE_TEST_SITE_KEY } from '@/lib/config';

type TurnstileApi = { render: (el: HTMLElement, opts: { sitekey: string; theme: string; callback: () => void; 'expired-callback': () => void; 'error-callback': () => void }) => string; reset: (id?: string) => void; remove: (id: string) => void };
declare global { interface Window { turnstile?: TurnstileApi } }

/**
 * Cloudflare Turnstile. It adds a hidden `cf-turnstile-response` field to the surrounding form. `resetKey` clears a used (single-use) token.
 * `onToken` says whether there is a token to send, so the form can wait for one rather than fail the check on the server.
 */
export function Turnstile({ resetKey, onToken }: { resetKey: unknown; onToken: (ready: boolean) => void }) {
    const el = useRef<HTMLDivElement>(null);
    const id = useRef<string>(undefined);

    // The widget is rendered once and calls back later: it reads the latest onToken through a ref
    const token = useRef(onToken);
    useEffect(() => { token.current = onToken; });

    const render = () => {
        if (el.current && window.turnstile && !id.current) id.current = window.turnstile.render(el.current, { sitekey: location.hostname === new URL(SITE_URL).hostname ? TURNSTILE_SITE_KEY : TURNSTILE_TEST_SITE_KEY, theme: 'dark', callback: () => token.current(true), 'expired-callback': () => token.current(false), 'error-callback': () => token.current(false) });
    };
    useEffect(() => { render(); return () => { if (id.current) window.turnstile?.remove(id.current); id.current = undefined; }; }, []);
    // A reset token is spent: wait for the next one
    useEffect(() => { if (id.current) { token.current(false); window.turnstile?.reset(id.current); } }, [resetKey]);

    return (
        <>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={render} />
            <div ref={el} />
        </>
    );
}
