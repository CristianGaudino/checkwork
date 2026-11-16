import { Faqs } from '@/components/Faqs';
import { JsonLd } from '@/components/JsonLd';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { ADJUSTS, AI_FAQS, ALERTS, CARE, CHAT, WRITING } from '@/content/dealer-ai';
import { DEALER_CONTACT, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { service } from '@/lib/schema';

export const metadata = pageMetadata({
    title: 'AI and WhatsApp for car dealers in Ireland',
    description: 'AI that drafts your car descriptions, posts and replies for your team to check, and WhatsApp alerts that let your team answer leads from the yard. Built into the dealer websites we make.',
    path: ROUTES.dealerAI,
});

const chip = 'rounded-full border border-line px-3 py-1 text-sm text-accent-alt';

/** The demo's enquiry alert as it reaches a salesperson's phone: drawn in code, so it stays sharp and true to the demo's wording */
function Chat() {
    return (
        <figure className="mx-auto grid w-full max-w-sm gap-3">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_40px_90px_-50px_rgb(0_0_0/0.9)]">
                <div className="flex items-center gap-3 border-b border-line bg-surface px-5 py-4">
                    <span aria-hidden="true" className="grid size-9 place-content-center rounded-full bg-accent/20 font-display font-semibold text-accent-alt">C</span>
                    <div className="grid">
                        <span className="font-semibold">Checkwork Motors</span>
                        <span className="text-xs text-fg-muted">WhatsApp Business</span>
                    </div>
                </div>
                <ol className="grid gap-3 p-4 text-sm">
                    {CHAT.map(m => (
                        <li key={m.text} className={`grid max-w-[85%] gap-2 ${m.from === 'staff' ? 'justify-self-end' : ''}`}>
                            <p className={`whitespace-pre-line rounded-2xl px-4 py-2.5 ${m.from === 'staff' ? 'rounded-br-md bg-accent/20' : 'rounded-bl-md bg-surface'}`}>
                                <span className="sr-only">{m.from === 'staff' ? 'Salesperson: ' : 'Your site: '}</span>
                                {m.text}
                            </p>
                            {'buttons' in m && (
                                <ul className="grid gap-1" aria-label="Reply buttons">
                                    {m.buttons.map(b => <li key={b} className="rounded-xl border border-line bg-surface px-3 py-2 text-center text-accent-alt">{b}</li>)}
                                </ul>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
            <figcaption className="text-center text-sm text-fg-muted">From the demo, with a made-up buyer.</figcaption>
        </figure>
    );
}

export default function CarDealerAI() {
    return (
        <>
            <JsonLd data={service('AI and WhatsApp for car dealers', 'AI writing and WhatsApp alerts in car dealer websites', ROUTES.dealerAI)} />

            <section className="overflow-hidden border-b border-line pb-16 pt-14 md:pb-24 md:pt-24">
                <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid gap-6">
                        <h1 className="font-display text-5xl font-semibold md:text-6xl">AI and WhatsApp for car dealers</h1>
                        <p className="max-w-xl text-lg text-fg-muted md:text-xl">
                            Built into the website and dashboard we make for your dealership. AI writes the first draft of your listings, posts and replies. WhatsApp puts every new lead on your team’s phones, to answer from the yard.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button href={DEALER_CONTACT}>Talk to us</Button>
                            <Button href={ROUTES.dealers} variant="secondary">See the dealer websites</Button>
                        </div>
                    </div>
                    <Chat />
                </Container>
            </section>

            <Section>
                <Container className="grid gap-12">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">A first draft, ready to check</h2>
                        <p className="text-lg text-fg-muted">A writing button sits next to the text your team already fills in. It drafts from your own records, and your team edits and sends it.</p>
                    </div>
                    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {WRITING.map(w => (
                            <div key={w.title} className="grid content-start gap-2 border-t border-line pt-5">
                                <h3 className="font-display text-xl font-semibold">{w.title}</h3>
                                <p className="text-fg-muted">{w.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-3">
                        <p className="font-medium">Then change it in one tap</p>
                        <ul className="flex flex-wrap gap-2">{ADJUSTS.map(a => <li key={a} className={chip}>{a}</li>)}</ul>
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container className="grid gap-12">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">Answer leads from the yard</h2>
                        <p className="text-lg text-fg-muted">Each alert comes with buttons. Tap one and the buyer is answered, and the lead in the dashboard is updated, so the office sees what was done.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {ALERTS.map(a => (
                            <div key={a.title} className="grid content-start gap-3 rounded-2xl border border-line bg-canvas p-6">
                                <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                                <p className="text-fg-muted">{a.text}</p>
                                <ul className="flex flex-wrap gap-2" aria-label="Buttons">{a.buttons.map(b => <li key={b} className={chip}>{b}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section>
                <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <div className="grid content-start gap-4">
                        <h2 className="font-display text-4xl font-semibold">How it is kept safe</h2>
                        <p className="max-w-prose text-fg-muted">AI and WhatsApp handle your customers’ messages, so these are set up on every site, not left as options.</p>
                    </div>
                    <dl className="border-t border-line">
                        {CARE.map(c => (
                            <div key={c.title} className="grid gap-1 border-b border-line py-5">
                                <dt className="font-display text-xl font-semibold">{c.title}</dt>
                                <dd className="text-fg-muted">{c.text}</dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </Section>

            <Faqs faqs={AI_FAQS} />

            <CtaBand title="See it with your team in mind" text="Tell us how your team handles leads today. We will show you the AI writing and WhatsApp in the demo on a call." href={DEALER_CONTACT} label="Talk to us" />
        </>
    );
}
