import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: 'Start a project',
    description: 'Tell Checkwork about your dealership or business and what you need. We reply by email.',
    path: ROUTES.contact,
});

export default function Contact() {
    return (
        <>
            <PageHead title="Start a project" lead="Tell us about your business and what is not working. A few lines is enough." />
            <Section className="pt-10 md:pt-14">
                <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
                    <ContactForm />
                    <aside className="grid max-w-prose content-start gap-3">
                        <h2 className="font-display text-2xl font-semibold">What happens next</h2>
                        <p className="text-fg-muted">
                            We read your message and reply by email. If it looks like a fit, we arrange a call to talk it through. We only use your details to reply to you; see the{' '}
                            <Link href={ROUTES.privacy} className="text-accent-alt underline underline-offset-4">privacy notice</Link>.
                        </p>
                    </aside>
                </Container>
            </Section>
        </>
    );
}
