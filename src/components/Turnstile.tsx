'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { SITE_URL, TURNSTILE_SITE_KEY, TURNSTILE_TEST_SITE_KEY } from '@/lib/config';

type TurnstileApi = { render: (el: HTMLElement, opts: { sitekey: string; theme: string }) => string; reset: (id?: string) => void; remove: (id: string) => void };
declare global { interface Window { turnstile?: TurnstileApi } }

/** Cloudflare Turnstile. It adds a hidden `cf-turnstile-response` field to the surrounding form. `resetKey` clears a used (single-use) token. */
export function Turnstile({ resetKey }: { resetKey: unknown }) {
    const el = useRef<HTMLDivElement>(null);
    const id = useRef<string>(undefined);

    const render = () => {
        if (el.current && window.turnstile && !id.current) id.current = window.turnstile.render(el.current, { sitekey: location.hostname === new URL(SITE_URL).hostname ? TURNSTILE_SITE_KEY : TURNSTILE_TEST_SITE_KEY, theme: 'dark' });
    };
    useEffect(() => { render(); return () => { if (id.current) window.turnstile?.remove(id.current); id.current = undefined; }; }, []);
    useEffect(() => { if (id.current) window.turnstile?.reset(id.current); }, [resetKey]);

    return (
        <>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={render} />
            <div ref={el} />
        </>
    );
}
