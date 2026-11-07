'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { ROUTES } from '@/lib/config';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => { console.error(error); }, [error]);
    return (
        <div className="py-24 md:py-40">
            <Container className="grid gap-6">
                <h1 className="font-display text-5xl font-semibold md:text-6xl">Something went wrong.</h1>
                <p className="max-w-xl text-lg text-fg-muted">The page did not load properly. Try again, or go back to the home page.</p>
                <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={reset} className="rounded-xl bg-action px-5 py-3.5 font-semibold text-white transition-[background-color,transform] hover:bg-action-hover active:scale-[0.97]">Try again</button>
                    <a href={ROUTES.home} className="rounded-xl border border-fg/40 px-5 py-3.5 font-semibold hover:border-fg">Go to the home page</a>
                </div>
            </Container>
        </div>
    );
}
