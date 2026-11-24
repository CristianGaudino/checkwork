import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { DemoButton } from '@/components/DemoButton';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { PLAN_NEEDS } from '@/content/contact';
import { CONTACT_EMAIL, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: 'Talk to us about your dealership',
    description: 'Tell Checkwork about your dealership and how you want a reply. We read every message.',
    path: ROUTES.contact,
});

const NEXT = [
    { title: 'We read it', text: 'A person reads every message.' },
    { title: 'We reply', text: 'By email or a call, as you asked, with any questions we have.' },
    { title: 'We talk it through', text: 'If it looks like a fit, a short call and a walk through the demo.' },
    { title: 'You pick a plan', text: 'We go through which plan fits your yard and what it costs. Then you decide.' },
] as const;

export default async function Contact({ searchParams }: PageProps<'/contact'>) {
    // `?need=website`, `dashboard` or `both` (each plan card's link, and the old plan ids) ticks that choice; anything else ticks nothing
    const need = (await searchParams).need;
    const plan = typeof need === 'string' && Object.hasOwn(PLAN_NEEDS, need) ? PLAN_NEEDS[need] : undefined;

    return (
        <>
            <PageHead title="Talk to us about your dealership" lead="Leave your name and a number or email, and we will get back to you. Everything else is optional." />
            <Section className="pt-10 md:pt-14">
                <Container className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                    <ContactForm need={plan} />
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
                            <p className="text-fg-muted">Want the numbers first? Every plan and price is on the <Link href={ROUTES.pricing} className="text-accent-alt underline underline-offset-4">pricing page</Link>.</p>
                            <p className="text-fg-muted">Rather email? <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-alt underline underline-offset-4">{CONTACT_EMAIL}</a></p>
                        </div>

                        <div className="grid gap-4 overflow-hidden rounded-2xl border border-line bg-surface">
                            <Image src="/dealer-demo/dash-overview.webp" alt="The demo dealer dashboard: leads each week and what needs attention" width={1920} height={1200} className="h-auto w-full border-b border-line" />
                            <div className="grid gap-3 px-5 pb-5">
                                <h2 className="font-display text-xl font-semibold">Try it first</h2>
                                <p className="text-fg-muted">Use the demo site yourself, or <Link href={ROUTES.dealers} className="text-accent-alt underline underline-offset-4">see what is in it</Link>.</p>
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
