import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { DemoButton } from '@/components/DemoButton';
import { WhatsAppChat } from '@/components/WhatsAppChat';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Mark } from '@/components/ui/Mark';
import { CHECKS } from '@/content/checks';
import { TRADE_IN_CHAT } from '@/content/dealer';
import { GETS, STEPS } from '@/content/home';
import { eur, TIERS } from '@/content/pricing';
import { DEALER_CONTACT, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: { absolute: 'Checkwork: websites and a dashboard for car dealers in Ireland' },
    description: 'Your own dealer website on your DoneDeal or CarsIreland stock, with your Google reviews, trade-ins with a reg lookup and every lead answered. Try the live demo.',
    path: '/',
});

const link = 'text-accent-alt underline underline-offset-4';

export default function Home() {
    return (
        <>
            <section className="py-12 md:py-14">
                <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <h1 className="font-display text-5xl font-bold md:text-7xl">
                            Your own dealer website, on the stock you already list
                            <Mark id="hero" className="ml-2 inline-block size-[0.7em] align-[-0.02em]" />
                        </h1>
                        <p className="rise mb-9 mt-7 max-w-xl text-lg text-fg-muted md:text-xl" style={{ "--d": 1 } as CSSProperties}>
                            For car dealers in Ireland. Keep listing on DoneDeal or CarsIreland and your site follows it, with your Google reviews, trade-ins and finance. Every enquiry reaches someone who will answer it.
                        </p>
                        <div className="rise flex flex-wrap gap-3" style={{ "--d": 2 } as CSSProperties}>
                            <DemoButton />
                            <Button href={ROUTES.pricing} variant="secondary">See prices</Button>
                        </div>
                        <p className="rise mt-5 text-sm text-fg-muted" style={{ "--d": 3 } as CSSProperties}>The demo is a made-up dealer with sample stock. Nothing you send there reaches anyone.</p>
                    </div>
                    {/* The one light surface on the page: a sign-off sheet. Ticks draw in, then the stamp lands. */}
                    <div className="rounded-sm bg-paper p-7 text-ink shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)] md:p-9" aria-labelledby="sheet-title">
                        <h2 id="sheet-title" className="font-sans text-xl font-semibold tracking-tight">Before it goes live</h2>
                        <p className="mt-1 text-sm text-ink-muted">Every dealer site we launch has these, on every plan.</p>
                        <ul className="mt-6 border-t border-ink/15">
                            {CHECKS.map((c, i) => (
                                <li key={c.title} className="grid grid-cols-[1.75rem_1fr] gap-4 border-b border-ink/15 py-4">
                                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 size-5">
                                        <path d="M2.5 8.6 6.2 12 13.5 4" pathLength={1} className="tick" style={{ "--i": i } as CSSProperties} stroke="#4a4ede" strokeWidth="2.2" />
                                    </svg>
                                    <div>
                                        <h3 className="font-sans text-base font-semibold">{c.title}</h3>
                                        <p className="mt-0.5 text-sm text-ink-muted">{c.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="stamp mt-7 w-fit rounded-md border-2 border-action-hover px-4 py-1.5 font-display text-lg font-bold text-action-hover">Checked</p>
                    </div>
                </Container>
            </section>

            <Section className="border-t border-line">
                <Container className="grid gap-14">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">What you get</h2>
                        <p className="text-lg text-fg-muted">All of it works in the demo today, with a made-up dealer and sample stock.</p>
                    </div>
                    {/* One screen of the demo, then the four answers: only some have a screenshot, so none are shown per item (the dealer page tours them all) */}
                    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                        <Image src="/work/dealer-demo/site-stock.webp" alt="Demo dealer used cars page with filters down the side and car cards" width={1920} height={1200} sizes="(min-width: 1200px) 1200px, 100vw" className="h-auto w-full" />
                    </div>
                    <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {GETS.map(g => (
                            <li key={g.id} className="grid content-start gap-2 border-t border-line pt-5">
                                <p className="text-sm text-fg-muted">{g.problem}</p>
                                <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                                <p className="text-fg-muted">{g.text}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <DemoButton variant="secondary" />
                        <Link href={ROUTES.dealers} className={link}>See every screen, on the site and in the dashboard</Link>
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
                    <div className="grid content-start gap-5">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">Answer leads from the yard</h2>
                        <p className="text-lg text-fg-muted">On Dealer and Group, every new lead reaches your team’s phones on WhatsApp. A trade-in comes with the reg and the photos. Tap Reply with a price, type the number, and the buyer gets an offer from your dealership.</p>
                        <p className="text-fg-muted">Test drives, new reviews and cars on sale too long come the same way, each answered with a tap. <Link href={`${ROUTES.dealers}#whatsapp`} className={link}>More about WhatsApp alerts</Link></p>
                    </div>
                    <WhatsAppChat title="Checkwork Motors" caption="Your salesperson’s phone. From the demo, with a made-up buyer." lines={TRADE_IN_CHAT.dealer} who={{ in: 'Your site', out: 'Salesperson' }} />
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-10">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">Three plans</h2>
                        <p className="text-lg text-fg-muted">A month, before VAT, plus a setup fee. No setup fee on a 2-year contract.</p>
                    </div>
                    <ul className="border-t border-line">
                        {TIERS.map(t => (
                            <li key={t.id} className="relative grid gap-2 border-b border-line py-6 transition-colors hover:bg-surface has-[:focus-visible]:bg-surface md:grid-cols-[1fr_1.6fr_auto] md:items-baseline md:gap-10 md:px-4">
                                <h3 className="font-display text-2xl font-semibold">
                                    {/* The link covers the whole row (bigger target) */}
                                    <Link href={`${ROUTES.pricing}#plan-${t.id}`} className="after:absolute after:inset-0">{t.name}</Link>
                                </h3>
                                <p className="text-fg-muted">{t.summary}</p>
                                <p className="font-display text-xl font-semibold tabular-nums">{eur(t.eur)}<span className="font-sans text-base font-normal text-fg-muted"> a month{t.branchEur && `, plus ${eur(t.branchEur)} a branch`}</span></p>
                            </li>
                        ))}
                    </ul>
                    <div><Button href={ROUTES.pricing} variant="secondary">See what each plan includes</Button></div>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container>
                    <div className="mb-12 grid gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">How you get set up</h2>
                        <p className="text-lg text-fg-muted">You deal with one person from the first call to the launch, and after it.</p>
                    </div>
                    <ol className="grid gap-8 md:grid-cols-4">
                        {STEPS.map((s, i) => (
                            <li key={s.title} className="grid content-start gap-2 border-t border-line pt-5">
                                <span className="font-display text-sm text-accent-alt">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                                <p className="text-fg-muted">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </Container>
            </Section>

            <CtaBand title="See it with your own stock in mind" text="Tell us a little about your dealership. We will reply the way you ask, and walk you through the demo if you would like." href={DEALER_CONTACT} label="Talk to us" />
        </>
    );
}
