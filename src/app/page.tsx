import { SITE } from '@/lib/config';

// Placeholder until the home page issue lands.
export default function Home() {
    return (
        <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-4 px-6">
            <h1 className="font-display text-5xl font-semibold tracking-tight">{SITE.name}</h1>
            <p className="text-fg-muted">{SITE.tagline}</p>
        </main>
    );
}
