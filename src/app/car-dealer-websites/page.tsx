import Image from 'next/image';
import { DealerTour } from '@/components/DealerTour';
import { DemoButton } from '@/components/DemoButton';
import { Faqs } from '@/components/Faqs';
import { JsonLd } from '@/components/JsonLd';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Shot } from '@/components/ui/Shot';
import { BUILT, DEALER_FAQS } from '@/content/dealer';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { service } from '@/lib/schema';

export const metadata = pageMetadata({
    title: 'Car dealer websites in Ireland',
    description: 'Your own dealer website on your DoneDeal or CarsIreland stock, with finance, trade-ins, test drive requests and your Google reviews. €149 a month before VAT. Try the demo.',
    path: ROUTES.dealers,
});

export default function CarDealerWebsites() {
    return (
        <>
            <JsonLd data={service('Car dealer websites', 'Website design for car dealerships', ROUTES.dealers)} />

            <section className="overflow-hidden border-b border-line pb-16 pt-14 md:pb-24 md:pt-24">
                <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="grid gap-6">
                        <h1 className="font-display text-4xl font-semibold sm:text-5xl md:text-6xl">A website for your dealership, on your own stock</h1>
                        <p className="max-w-xl text-lg text-fg-muted md:text-xl">
                            Built for one dealer: your name, your colours and the cars you already list. Fast on a phone, with every way for a buyer to get in touch.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button href={`${ROUTES.contact}?need=website`}>Talk to us</Button>
                            <DemoButton variant="secondary" />
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
                <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                    <div className="grid content-start gap-4">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">List once, on the site you already use</h2>
                        <p className="text-lg text-fg-muted">Keep listing on DoneDeal or CarsIreland and your website follows it, checking every 15 minutes. New ads go up, price changes follow, and a car that comes down leaves the site.</p>
                        <p className="text-fg-muted">We connect your DoneDeal or CarsIreland account when we set you up. Or keep your stock in the dashboard instead of DoneDeal or CarsIreland, and the site changes as soon as you save.</p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-frame">
                        <Shot src="/dealer-demo/site-stock.webp" alt="Demo dealer used cars page with filters down the side and car cards" sizes="(min-width: 1024px) 640px, 100vw" />
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-10">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">What buyers see</h2>
                        <p className="text-lg text-fg-muted">Pick a screen. Every one is from the demo, with its made-up dealer and sample stock.</p>
                    </div>
                    <DealerTour />
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                    <h2 className="font-display text-4xl font-semibold md:text-5xl">Every enquiry reaches you</h2>
                    <div className="grid max-w-prose content-start gap-4 text-lg text-fg-muted">
                        <p>Each enquiry is emailed to the addresses you choose. With the dashboard, it lands there too, with the car, what they asked and how they want a reply.</p>
                        <p>Every one is kept with the consent it was sent under, and old ones are cleared after a set time.</p>
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-10">
                    <h2 className="font-display text-4xl font-semibold md:text-5xl">The parts you don’t see</h2>
                    <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                        {BUILT.map(b => (
                            <li key={b.title} className="grid content-start gap-2 border-t border-line pt-5">
                                <h3 className="font-display text-xl font-semibold">{b.title}</h3>
                                <p className="text-fg-muted">{b.text}</p>
                            </li>
                        ))}
                    </ul>
                </Container>
            </Section>

            <Faqs faqs={DEALER_FAQS} title="Questions" />

            <CtaBand title="See it with your own stock in mind" text="Tell us a little about your dealership. We reply the way you ask." href={`${ROUTES.contact}?need=website`} />
        </>
    );
}
