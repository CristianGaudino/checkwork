'use client';

// Replaces the whole page when the root layout itself fails, so it cannot use the site's components or styles.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <html lang="en-IE">
            <body style={{ margin: 0, minHeight: '100dvh', display: 'grid', placeItems: 'center', background: '#0B0F1F', color: '#F5F6FA', fontFamily: 'system-ui, sans-serif' }}>
                <main style={{ maxWidth: '32rem', padding: '1.5rem' }}>
                    <h1 style={{ fontSize: '2rem', margin: '0 0 1rem' }}>Something went wrong.</h1>
                    <p style={{ color: '#AAB0CC', margin: '0 0 1.5rem' }}>The site did not load properly. Try again in a moment.</p>
                    <button type="button" onClick={reset} style={{ background: '#5A5DEB', color: '#fff', border: 0, borderRadius: 12, padding: '0.9rem 1.25rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Try again</button>
                </main>
            </body>
        </html>
    );
}
