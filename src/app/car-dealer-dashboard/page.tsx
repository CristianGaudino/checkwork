import Image from 'next/image';
import { Faqs } from '@/components/Faqs';
import { JsonLd } from '@/components/JsonLd';
import { WhatsAppChat } from '@/components/WhatsAppChat';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Shot } from '@/components/ui/Shot';
import { DASHBOARD_FAQS, FEATURES, TRADE_IN_CHAT, type Feature } from '@/content/dashboard';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { service } from '@/lib/schema';

export const metadata = pageMetadata({
    title: 'Dealer dashboard for car dealers in Ireland',
    description: 'Leads and follow-ups, test drives, stock and days in stock, margins and prep costs, reviews, customers with NCT reminders and reports. €149 a month before VAT.',
    path: ROUTES.dashboard,
});

/** One job the dashboard does: the words, then the screen. From lg they sit side by side, alternating; on a phone the words come first. */
function Job({ f, flip }: { f: Feature; flip: boolean }) {
    return (
        <Section id={f.id} className="border-t border-line">
            <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`grid content-start gap-4 ${flip ? 'lg:order-last' : ''}`}>
                    <h2 className="font-display text-4xl font-semibold md:text-5xl">{f.title}</h2>
                    {f.text.map(t => <p key={t} className="text-lg text-fg-muted">{t}</p>)}
                </div>
                <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-frame">
                    <Shot src={f.src} alt={f.alt} sizes="(min-width: 1024px) 600px, 100vw" />
                </div>
            </Container>
        </Section>
    );
}

const [leads, ...rest] = FEATURES;

export default function CarDealerDashboard() {
    return (
        <>
            <JsonLd data={service('Dealer dashboard', 'Dealer management software', ROUTES.dashboard)} />

            <section className="overflow-hidden border-b border-line pb-16 pt-14 md:pb-24 md:pt-24">
                <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="grid gap-6">
                        <h1 className="font-display text-4xl font-semibold sm:text-5xl md:text-6xl">Every lead, car and sale in one place</h1>
                        <p className="max-w-xl text-lg text-fg-muted md:text-xl">
                            The dashboard behind your dealership. Answer leads, book test drives, track stock and margins, and keep in touch with customers.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button href={`${ROUTES.contact}?need=dashboard`}>Talk to us</Button>
                            <Button href={ROUTES.pricing} variant="secondary">See prices</Button>
                        </div>
                        <p className="text-sm text-fg-muted">We show you the dashboard on a call, with a made-up dealer.</p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-frame">
                        <Image src="/dealer-demo/dash-overview.webp" alt="The demo dealer dashboard overview: leads each week and what needs attention" width={1920} height={1200} preload className="h-auto w-full" />
                    </div>
                </Container>
            </section>

            <Job f={leads} flip={false} />

            <Section id="alerts" className="border-t border-line">
                <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="grid content-start gap-4 lg:order-last">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">Alerts on your phone</h2>
                        <p className="text-lg text-fg-muted">Add the dashboard to your phone’s home screen and new leads and test drive requests arrive as notifications.</p>
                        <p className="text-lg text-fg-muted">On WhatsApp, your team can answer from the yard: confirm a test drive, drop the price on a car that has been in stock too long, or, with the website, reply to a trade-in with a price. Buyers only get WhatsApp messages if they asked for them.</p>
                        <p className="text-fg-muted">We connect your WhatsApp Business number when we set you up.</p>
                    </div>
                    <WhatsAppChat title="Checkwork Motors" caption="A trade-in sent from the website. From the demo, with a made-up buyer: in the demo, messages stay inside it." lines={TRADE_IN_CHAT} who={{ in: 'Your dashboard', out: 'Salesperson' }} />
                </Container>
            </Section>

            {rest.map((f, i) => <Job key={f.id} f={f} flip={i % 2 === 1} />)}

            <Section className="border-t border-line bg-surface">
                <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
                    <div id="team" className="grid content-start gap-3">
                        <h2 className="font-display text-4xl font-semibold">Your team</h2>
                        <p className="text-lg text-fg-muted">Logins for as many people as you need, each with a role: owner, manager, sales or finance. Costs and margins only for the roles that need them. Every change is in the activity history, with who made it.</p>
                    </div>
                    <div id="ai-writing" className="grid content-start gap-3">
                        <h2 className="font-display text-4xl font-semibold">AI writing</h2>
                        <p className="text-lg text-fg-muted">First drafts of car descriptions, replies to leads and review replies, from your own stock. Your team reads and changes them before anything is sent. Included in the plan.</p>
                    </div>
                </Container>
            </Section>

            <Faqs faqs={DASHBOARD_FAQS} title="Questions" />

            <CtaBand title="See the dashboard on a call" text="Tell us a little about your dealership and we will show you around it." href={`${ROUTES.contact}?need=dashboard&call=1`} label="Book a call" />
        </>
    );
}
