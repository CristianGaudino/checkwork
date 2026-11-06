import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { CHECKS } from '@/content/checks';
import { CTA, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { dealerService } from '@/lib/schema';

export const metadata = pageMetadata({
    title: 'Car dealer websites in Ireland',
    description: 'Custom websites for car dealerships in Ireland: stock that stays current, enquiries that reach your team, and a site that Google can find. Built by Checkwork.',
    path: ROUTES.dealers,
});

const FAQS = [
    { q: 'Can our team add and update cars without a developer?', a: 'Yes. On Carright, the dealership team manage their own site through dealer controls, and the owner has separate controls. We build the same kind of access for your team.' },
    { q: 'Will the website rank on Google?', a: 'We set up the foundations Google looks for: speed, page titles, structured data and local details. No one can promise a ranking, and anyone who does is guessing.' },
    { q: 'What happens to enquiries?', a: 'Enquiries from the website are captured as leads in the system, so they are tracked in one place rather than left in an inbox.' },
] as const;

export default function CarDealerWebsites() {
    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
                }}
            />
            <JsonLd data={dealerService()} />
            <PageHead
                title="Websites for car dealerships in Ireland"
                lead="Your website is where buyers look at your stock before they ever call. We build dealer websites that keep that stock current, bring in enquiries and are easy to run."
                        >
                <Button href={CTA.href}>{CTA.label}</Button>
                <Button href={`${ROUTES.work}/carright`} variant="secondary">See Carright</Button>
            </PageHead>

            <Section>
                <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <div className="grid content-start gap-4">
                        <h2 className="font-display text-4xl font-semibold tracking-tight">What a dealer website has to do</h2>
                        <p className="max-w-prose text-fg-muted">Most dealer sites fail in the same few places. These are the five things we check before one goes live.</p>
                    </div>
                    <dl className="border-t border-line">
                        {CHECKS.map(c => (
                            <div key={c.title} className="grid gap-1 border-b border-line py-5">
                                <dt className="font-display text-xl font-semibold">{c.title}</dt>
                                <dd className="text-fg-muted">{c.text}</dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <h2 className="font-display text-4xl font-semibold tracking-tight">Built and running: Carright</h2>
                    <div className="grid max-w-prose gap-5 text-fg-muted">
                        <p>Carright is a second-hand car dealer. We redesigned their website and built the system behind it: dealer controls, owner controls, lead tracking, a metrics dashboard and social media tools with automatic posting.</p>
                        <p><Link href={`${ROUTES.work}/carright`} className="text-accent-alt underline underline-offset-4">Read the Carright case study</Link></p>
                    </div>
                </Container>
            </Section>

            <Section>
                <Container className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <h2 className="font-display text-4xl font-semibold tracking-tight">Questions dealers ask</h2>
                    <div className="border-t border-line">
                        {FAQS.map(f => (
                            <div key={f.q} className="grid gap-2 border-b border-line py-6">
                                <h3 className="font-display text-xl font-semibold">{f.q}</h3>
                                <p className="max-w-prose text-fg-muted">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <CtaBand title="Let's look at your dealership's website" text="Tell us what you sell and what is not working. We will reply by email." />
        </>
    );
}
