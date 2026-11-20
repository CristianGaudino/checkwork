import Image from 'next/image';
import { DealerTour } from '@/components/DealerTour';
import { DemoButton } from '@/components/DemoButton';
import { Faqs } from '@/components/Faqs';
import { JsonLd } from '@/components/JsonLd';
import { WhatsAppChat } from '@/components/WhatsAppChat';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { DEALER_FAQS, FEATURES, TRADE_IN_CHAT, WHATSAPP_ALERTS } from '@/content/dealer';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { service } from '@/lib/schema';

export const metadata = pageMetadata({
    title: 'Car dealer websites in Ireland',
    description: 'Websites and a dealer dashboard for car dealerships in Ireland: stock that stays current, every lead in one place, test drives, trade-ins and finance. Try the live demo.',
    path: ROUTES.dealers,
});

export default function CarDealerWebsites() {
    return (
        <>
            <JsonLd data={service('Car dealer websites', 'Website design and development for car dealerships', ROUTES.dealers)} />

            <section className="overflow-hidden border-b border-line pb-16 pt-14 md:pb-24 md:pt-24">
                <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="grid gap-6">
                        <h1 className="font-display text-4xl font-semibold sm:text-5xl md:text-6xl">Websites for car dealerships in Ireland</h1>
                        <p className="max-w-xl text-lg text-fg-muted md:text-xl">
                            A website that sells your stock, and a dashboard where your team handles every lead, test drive and sale. Try it yourself before you talk to us.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <DemoButton />
                            <Button href={ROUTES.contact} variant="secondary">Talk to us</Button>
                        </div>
                        <p className="text-sm text-fg-muted">The demo is a made-up dealer with sample stock. Nothing you send there reaches anyone.</p>
                    </div>
                    {/* The desktop site with the phone version in front: the same stock, on both */}
                    <div className="relative pb-10 pr-10 sm:pb-14 sm:pr-16">
                        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-frame">
                            <Image src="/dealer-demo/site-home.webp" alt="The demo dealer website on a laptop: a stock search over a photo of the showroom" width={1920} height={1200} preload className="h-auto w-full" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-[30%] max-w-48 overflow-hidden rounded-[1.4rem] border-4 border-canvas bg-canvas shadow-phone outline outline-1 outline-line">
                            <Image src="/dealer-demo/phone-stock.webp" alt="The same site on a phone: the used cars list" width={780} height={1688} preload className="h-auto w-full" />
                        </div>
                    </div>
                </Container>
            </section>

            <Section>
                <Container className="grid gap-10">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">See both sides of it</h2>
                        <p className="text-lg text-fg-muted">Pick a screen. Every one is from the demo, with its made-up dealer and sample data.</p>
                    </div>
                    <DealerTour />
                </Container>
            </Section>

            <Section id="whatsapp" className="scroll-mt-20 border-t border-line">
                <Container className="grid gap-12">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">Answer leads from the yard</h2>
                        <p className="text-lg text-fg-muted">On Dealer and Group, every new lead reaches your team’s phones on WhatsApp. A trade-in comes with the reg and the photos. Tap Reply with a price, type the number, and the buyer gets an offer from your dealership.</p>
                    </div>
                    <div className="grid gap-10 md:grid-cols-2">
                        <WhatsAppChat title="Checkwork Motors" caption="Your salesperson’s phone" lines={TRADE_IN_CHAT.dealer} who={{ in: 'Your site', out: 'Salesperson' }} />
                        <WhatsAppChat title="Checkwork Motors" caption="Ciarán’s phone" lines={TRADE_IN_CHAT.buyer} who={{ in: 'Your dealership', out: 'Ciarán' }} />
                    </div>
                    <p className="text-sm text-fg-muted">From the demo, with a made-up buyer. In the demo, messages stay inside it.</p>
                    <div className="grid gap-4">
                        <h3 className="font-display text-2xl font-semibold">Other alerts on WhatsApp</h3>
                        <ul className="grid gap-x-10 gap-y-3 text-fg-muted md:grid-cols-2">
                            {WHATSAPP_ALERTS.map(a => (
                                <li key={a.title}><span className="font-semibold text-fg">{a.title}.</span> {a.text}</li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <div className="grid content-start gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">Everything in the demo</h2>
                        <p className="text-lg text-fg-muted">All of it works in the demo today and is on offer. The pricing page shows which plan has what, and we connect your own accounts at setup.</p>
                        <div className="mt-3 flex flex-wrap gap-3">
                            <DemoButton variant="secondary" />
                            <Button href={ROUTES.pricing} variant="secondary">See prices</Button>
                            <Button href={ROUTES.dealerAI} variant="secondary">AI for dealers</Button>
                        </div>
                    </div>
                    {/* Folded, one group open at a time (`name`): the full lists made the page too long on a phone */}
                    <div className="border-t border-line">
                        {FEATURES.map(f => (
                            <details key={f.title} name="features" className="group border-b border-line">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
                                    {f.title}
                                    <span aria-hidden="true" className="text-2xl font-normal text-accent-alt transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <ul className="grid gap-2.5 pb-6 text-fg-muted">
                                    {f.items.map(i => (
                                        <li key={i} className="grid grid-cols-[1rem_1fr] gap-3">
                                            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 size-4 text-accent-alt"><path d="M2.5 8.6 6.2 12 13.5 4" stroke="currentColor" strokeWidth="2" /></svg>
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                    </div>
                </Container>
            </Section>

            <Faqs faqs={DEALER_FAQS} />

            <CtaBand title="See it with your own stock in mind" text="Tell us a little about your dealership. We will reply, and walk you through the demo if you would like." />
        </>
    );
}
