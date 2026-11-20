import { DemoButton } from '@/components/DemoButton';
import { Faqs } from '@/components/Faqs';
import { JsonLd } from '@/components/JsonLd';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { ADJUSTS, AI_FAQS, CARE, DRAFT, POST_NOTES, POST_STEPS, WRITING } from '@/content/dealer-ai';
import { DEALER_CONTACT, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { service } from '@/lib/schema';

export const metadata = pageMetadata({
    title: 'AI for car dealers in Ireland',
    description: 'AI that drafts your car descriptions, Facebook, Instagram and TikTok posts, newsletters and replies from your own stock, for your team to check and send. In the dashboard on the Dealer and Group plans.',
    path: ROUTES.dealerAI,
});

const chip = 'rounded-full border border-line px-3 py-1 text-sm text-accent-alt';

/** The writing box from the demo dashboard, with a draft in it: drawn in code, so it stays sharp and true to the demo's wording */
function Draft() {
    return (
        <figure className="mx-auto grid w-full max-w-md gap-3">
            <div className="grid gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_40px_90px_-50px_rgb(0_0_0/0.9)] sm:p-6">
                <p className="font-medium">{DRAFT.label}</p>
                <p className="whitespace-pre-line rounded-xl border border-line bg-canvas px-4 py-3 text-sm">{DRAFT.text}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-lg border border-fg/40 px-3 py-1.5 font-semibold">Write again</span>
                    <span className="font-medium text-accent-alt">AI draft</span>
                </div>
                <ul className="flex flex-wrap gap-2" aria-label="Change the draft">{DRAFT.adjusts.map(a => <li key={a} className={chip}>{a}</li>)}</ul>
            </div>
            <figcaption className="text-center text-sm text-fg-muted">A draft like the demo writes, for one of its sample cars.</figcaption>
        </figure>
    );
}

export default function CarDealerAI() {
    return (
        <>
            <JsonLd data={service('AI for car dealers', 'AI writing in the car dealer dashboard', ROUTES.dealerAI)} />

            <section className="overflow-hidden border-b border-line pb-16 pt-14 md:pb-24 md:pt-24">
                <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid gap-6">
                        <h1 className="font-display text-4xl font-semibold sm:text-5xl md:text-6xl">AI for car dealers</h1>
                        <p className="max-w-xl text-lg text-fg-muted md:text-xl">
                            On the Dealer and Group plans, AI writes the first draft of your car descriptions, posts, newsletters and replies, from your own stock. Your team checks it and sends it.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <DemoButton />
                            <Button href={DEALER_CONTACT} variant="secondary">Talk to us</Button>
                            <Button href={ROUTES.pricing} variant="secondary">See prices</Button>
                        </div>
                    </div>
                    <Draft />
                </Container>
            </section>

            <Section>
                <Container className="grid gap-12">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">A first draft, ready to check</h2>
                        <p className="text-lg text-fg-muted">A writing button sits next to the text your team already fills in. It drafts from your own records, and your team edits and sends it.</p>
                    </div>
                    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
                        {WRITING.map(w => (
                            // Five items: 2 + 2 + 1 (full width) on a tablet, 3 + 2 (wider) on a laptop, so no row is left with a gap
                            <div key={w.title} className="grid content-start gap-2 border-t border-line pt-5 sm:last:col-span-2 lg:col-span-2 lg:last:col-span-3 lg:[&:nth-last-child(2)]:col-span-3">
                                <h3 className="font-display text-xl font-semibold">{w.title}</h3>
                                <p className="text-fg-muted">{w.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-3">
                        <p className="font-medium">Then change it in one tap</p>
                        <ul className="flex flex-wrap gap-2">{ADJUSTS.map(a => <li key={a} className={chip}>{a}</li>)}</ul>
                        <p className="max-w-2xl text-fg-muted">Undo takes back one step. A draft stays marked as an AI draft, even once edited, and a reply can be copied to send by email or WhatsApp.</p>
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-12">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">From a car to a post</h2>
                        <p className="text-lg text-fg-muted">Your stock is already in the dashboard, so a post for any car takes four steps.</p>
                    </div>
                    <ol className="grid gap-8 md:grid-cols-4">
                        {POST_STEPS.map((s, i) => (
                            <li key={s.title} className="grid content-start gap-2 border-t border-line pt-5">
                                <span className="font-display text-sm text-accent-alt">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                                <p className="text-fg-muted">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                    <ul className="grid gap-3 rounded-2xl border border-line bg-surface p-6 text-fg-muted md:p-8">
                        {POST_NOTES.map(n => (
                            <li key={n} className="grid grid-cols-[1rem_1fr] gap-3">
                                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 size-4 text-accent-alt"><path d="M2.5 8.6 6.2 12 13.5 4" stroke="currentColor" strokeWidth="2" /></svg>
                                {n}
                            </li>
                        ))}
                    </ul>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <div className="grid content-start gap-4">
                        <h2 className="font-display text-4xl font-semibold">How it is kept safe</h2>
                        <p className="max-w-prose text-fg-muted">The drafts use your customers’ messages, so all of these are on for every dealer who has AI writing.</p>
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

            <CtaBand title="See it with your stock in mind" text="Tell us how your team writes listings and replies today. We will show you the AI writing in the demo on a call." href={DEALER_CONTACT} label="Talk to us" />
        </>
    );
}
