import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { BRAND_COLORS, SITE, SITE_URL } from '@/lib/config';
import { siteGraph } from '@/lib/schema';
import '@/styles/globals.css';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { template: `%s · ${SITE.name}`, default: `${SITE.name}: ${SITE.tagline}` },
    description: SITE.description,
    applicationName: SITE.name,
    icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: BRAND_COLORS.midnight };

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en-IE" className={`${sora.variable} ${inter.variable}`}>
            <body className="bg-canvas font-sans text-fg antialiased"><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-fg focus:px-4 focus:py-2 focus:text-canvas">Skip to content</a>
                <JsonLd data={siteGraph()} />
                <Header />
                <main id="main">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
