import { JsonLd } from '@/components/JsonLd';
import { Container, Section } from '@/components/ui/Container';

/** A dealer page's questions, opened one at a time, with the same questions as FAQPage structured data */
export function Faqs({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
    return (
        <Section className="border-t border-line">
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
                }}
            />
            <Container className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
                <h2 className="font-display text-4xl font-semibold">Questions dealers ask</h2>
                <div className="border-t border-line">
                    {faqs.map(f => (
                        <details key={f.q} name="faqs" className="group border-b border-line">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
                                {f.q}
                                <span aria-hidden="true" className="text-2xl font-normal text-accent-alt transition-transform group-open:rotate-45">+</span>
                            </summary>
                            <p className="max-w-prose pb-6 text-fg-muted">{f.a}</p>
                        </details>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
