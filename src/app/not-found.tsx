import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ROUTES } from '@/lib/config';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
    return (
        <div className="bg-[radial-gradient(50%_80%_at_92%_0%,rgb(99_102_241/0.25),transparent_70%)] py-24 md:py-40">
            <Container className="grid gap-6">
                <h1 className="font-display text-5xl font-semibold md:text-6xl">This page didn&apos;t pass the check.</h1>
                <p className="max-w-xl text-lg text-fg-muted">The page you wanted does not exist, or it has moved. Try one of these instead.</p>
                <div className="flex flex-wrap gap-3">
                    <Button href={ROUTES.home}>Go to the home page</Button>
                    <Button href={ROUTES.work} variant="secondary">See our work</Button>
                    <Button href={ROUTES.contact} variant="secondary">Contact us</Button>
                </div>
            </Container>
        </div>
    );
}
