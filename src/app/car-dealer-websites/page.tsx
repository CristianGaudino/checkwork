import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { DEALER_CHECKS } from '@/content/checks';
import { CTA, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { dealerService } from '@/lib/schema';

export const metadata = pageMetadata({
    title: 'Car dealer websites in Ireland',
    description: 'Custom websites for car dealerships in Ireland: stock that stays current, enquiries that reach your team, and a site that Google can find. Built by Checkwork.',
    path: ROUTES.dealers,
});

const FAQS = [
    { q: 'Can our team add and update cars without a developer?', a: 'Day-to-day changes should not wait on a developer. We set up how stock gets onto the site with you, around the feed or system you already use.' },
    { q: 'Will the website rank on Google?', a: 'We set up the foundations Google looks for: speed, page titles, structured data and local details. No one can promise a ranking, and anyone who does is guessing.' },
    { q: 'What happens to enquiries?', a: 'Every enquiry from the website is saved as a lead with the consent it was sent under, so it is kept in one place rather than lost in an inbox.' },
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
                <Button href={`${ROUTES.work}/dealer-demo`} variant="secondary">See the demo</Button>
            </PageHead>

            <Section>
                <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <div className="grid content-start gap-4">
                        <h2 className="font-display text-4xl font-semibold">What a dealer website has to do</h2>
                        <p className="max-w-prose text-fg-muted">Most dealer sites fail in the same few places. These are the five things we check before one goes live.</p>
                    </div>
                    <dl className="border-t border-line">
                        {DEALER_CHECKS.map(c => (
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
                    <h2 className="font-display text-4xl font-semibold">See it working: our demo site</h2>
                    <div className="grid max-w-prose gap-5 text-fg-muted">
                        <p>We built a demo dealer website so you can try it yourself: stock search and filters, compare, saved cars, a finance calculator and enquiry forms that store every lead. It is a demonstration, not a live client site.</p>
                        <p><Link href={`${ROUTES.work}/dealer-demo`} className="text-accent-alt underline underline-offset-4">Read about the demo site</Link></p>
                    </div>
                </Container>
            </Section>

            <Section>
                <Container className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <h2 className="font-display text-4xl font-semibold">Questions dealers ask</h2>
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
