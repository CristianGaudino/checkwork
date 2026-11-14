import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { DemoButton } from '@/components/DemoButton';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { DEALER_NEEDS } from '@/content/contact';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: 'Start a website or web app project',
    description: 'Tell Checkwork about your business and what you need. Dealers can try the live demo first. We read every message and reply the way you ask.',
    path: ROUTES.contact,
});

const NEXT = [
    { title: 'We read it', text: 'A person reads every message.' },
    { title: 'We reply', text: 'By email or a call, as you asked, with any questions we have.' },
    { title: 'We talk it through', text: 'If it looks like a fit, a short call. For a dealer, that is a walk through the demo.' },
    { title: 'You get a plan', text: 'What the site needs, how your stock and leads would work, and what it costs. Then you decide.' },
] as const;

export default async function Contact({ searchParams }: PageProps<'/contact'>) {
    // `?need=dealer` (from the car dealer page) opens the form on the dealer choice and its questions
    const dealer = (await searchParams).need === 'dealer';

    return (
        <>
            <PageHead title="Start a project" lead="Pick what you need and tell us a little about it. A few taps and a few lines is enough." />
            <Section className="pt-10 md:pt-14">
                <Container className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                    <ContactForm need={dealer ? DEALER_NEEDS[0] : undefined} />
                    <aside className="grid content-start gap-10 lg:sticky lg:top-28 lg:self-start">
                        <div className="grid gap-5">
                            <h2 className="font-display text-2xl font-semibold">What happens next</h2>
                            <ol className="grid gap-5">
                                {NEXT.map((s, i) => (
                                    <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                                        <span aria-hidden="true" className="grid size-8 place-content-center rounded-full border border-line font-display text-sm text-accent-alt">{i + 1}</span>
                                        <div>
                                            <h3 className="font-semibold">{s.title}</h3>
                                            <p className="text-fg-muted">{s.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="grid gap-4 overflow-hidden rounded-2xl border border-line bg-surface">
                            <Image src="/work/dealer-demo/dash-overview.webp" alt="The demo dealer dashboard: leads each week and what needs attention" width={1920} height={1200} className="h-auto w-full border-b border-line" />
                            <div className="grid gap-3 px-5 pb-5">
                                <h2 className="font-display text-xl font-semibold">A car dealer?</h2>
                                <p className="text-fg-muted">Try the demo site first, or <Link href={ROUTES.dealers} className="text-accent-alt underline underline-offset-4">see what is in it</Link>.</p>
                                <div><DemoButton variant="secondary" /></div>
                            </div>
                        </div>

                        <p className="text-sm text-fg-muted">
                            We only use your details to reply to you. See the{' '}
                            <Link href={ROUTES.privacy} className="text-accent-alt underline underline-offset-4">privacy notice</Link>.
                        </p>
                    </aside>
                </Container>
            </Section>
        </>
    );
}
