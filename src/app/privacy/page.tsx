import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { LEGAL, ROUTES } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Privacy notice',
    description: 'How Checkwork uses the details you send us.',
    alternates: { canonical: '/privacy' },
};

// TODO (issue #2): have this notice reviewed before launch, and update it with any new tool that collects data.
const UPDATED = '6 November 2026';

export default function Privacy() {
    const sections: [string, React.ReactNode][] = [
        ['Who we are', <>{LEGAL.companyName} runs this website. You can reach us through the <Link href={ROUTES.contact} className="text-accent-alt underline underline-offset-4">contact form</Link>.</>],
        ['What we collect', 'Only what you send us through the contact form: your name, email address, and optionally your business name and phone number, plus the message you write.'],
        ['Why we use it', 'To reply to your enquiry and, if you go ahead, to work with you. We do not use it for marketing and we do not sell it.'],
        ['Who sees it', `The people at ${LEGAL.companyName}. Your enquiry is stored in a database we host with Neon. We do not share it with anyone else unless the law requires it.`],
        ['How long we keep it', 'We keep enquiries that do not lead to work for as long as we need to deal with them, and then delete them. If we work together, we keep what we need for the project and our records.'],
        ['Cookies and tracking', 'This site sets no cookies. We count visits with Cloudflare Web Analytics, which does not use cookies and does not track you across sites. The contact form uses Cloudflare Turnstile to block spam.'],
        ['Your rights', <>You can ask to see, correct or delete the details we hold about you by sending us a message. You can also complain to the Data Protection Commission at <a href="https://www.dataprotection.ie" className="text-accent-alt underline underline-offset-4">dataprotection.ie</a>.</>],
    ];
    return (
        <>
            <PageHead title="Privacy notice" lead={`Last updated ${UPDATED}.`} />
            <Section>
                <Container className="grid max-w-prose gap-8">
                    {sections.map(([title, body]) => (
                        <div key={title} className="grid gap-2">
                            <h2 className="font-display text-2xl font-semibold">{title}</h2>
                            <p className="text-fg-muted">{body}</p>
                        </div>
                    ))}
                </Container>
            </Section>
        </>
    );
}
