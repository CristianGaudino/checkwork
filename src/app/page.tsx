import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Mark } from '@/components/ui/Mark';
import { Shot } from '@/components/ui/Shot';
import { CHECKS } from '@/content/checks';
import { LEAD_PATH, PRODUCTS, STEPS } from '@/content/home';
import { eur, TIERS } from '@/content/pricing';
import { DEMO_URL, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: { absolute: 'Checkwork: websites and a dashboard for car dealers in Ireland' },
    description: 'A website on the stock you list on DoneDeal or CarsIreland, and a dashboard for your leads, stock, sales and customers. For car dealers in Ireland, from €149 a month.',
    path: '/',
});

const link = 'text-accent-alt underline underline-offset-4';
const tier = (id: string) => TIERS.find(t => t.id === id)!;
const both = tier('both');

export default function Home() {
    return (
        <>
            <section className="py-12 md:py-14">
                <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                    <div>
                        <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-7xl lg:text-6xl xl:text-7xl">
                            A website and a dashboard for your car dealership
                            <Mark id="hero" className="ml-2 inline-block size-[0.7em] align-[-0.02em]" />
                        </h1>
                        <p className="rise mb-9 mt-7 max-w-xl text-lg text-fg-muted md:text-xl" style={{ "--d": 1 } as CSSProperties}>
                            For independent used-car dealers in Ireland. A website on the stock you already list, and one place to answer every lead, track every car and see what you make on it.
                        </p>
                        <div className="rise flex flex-wrap gap-3" style={{ "--d": 2 } as CSSProperties}>
                            <Button href={ROUTES.contact}>Talk to us</Button>
                            <Button href={ROUTES.pricing} variant="secondary">See prices</Button>
                        </div>
                        <p className="rise mt-5 text-sm text-fg-muted" style={{ "--d": 3 } as CSSProperties}>
                            <a href={DEMO_URL} target="_blank" rel="noopener" className={link}>Try the demo website<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a>. The demo is a made-up dealer with sample stock.
                        </p>
                    </div>
                    {/* The one light surface on the page: a sign-off sheet. Ticks draw in, then the stamp lands. */}
                    <div className="rounded-sm bg-paper p-5 text-ink shadow-lift wrap-anywhere sm:p-7 md:p-8" aria-labelledby="sheet-title">
                        <h2 id="sheet-title" className="font-sans text-xl font-semibold tracking-tight">Before it goes live</h2>
                        <p className="mt-1 text-sm text-ink-muted">Every dealer website we launch has these.</p>
                        <ul className="mt-6 border-t border-ink/15">
                            {CHECKS.map((c, i) => (
                                <li key={c.title} className="grid grid-cols-[1.75rem_1fr] gap-4 border-b border-ink/15 py-4">
                                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 size-5 text-action-hover">
                                        <path d="M2.5 8.6 6.2 12 13.5 4" pathLength={1} className="tick" style={{ "--i": i } as CSSProperties} stroke="currentColor" strokeWidth="2.2" />
                                    </svg>
                                    <div>
                                        <h3 className="font-sans text-base font-semibold">{c.title}</h3>
                                        <p className="mt-0.5 text-sm text-ink-muted">{c.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="stamp mt-7 w-fit rounded-md border-2 border-action-hover px-4 py-1.5 font-display text-base font-bold text-action-hover">Checked</p>
                    </div>
                </Container>
            </section>

            <Section className="border-t border-line">
                <Container className="grid gap-12">
                    <h2 className="max-w-2xl font-display text-4xl font-semibold md:text-5xl">Two products. Take one or both.</h2>
                    <ul className="grid gap-12 md:grid-cols-2 md:gap-8">
                        {PRODUCTS.map(p => (
                            <li key={p.id} className="group relative grid content-start gap-4">
                                <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-frame">
                                    <Shot src={p.src} phone={p.phone} alt={p.alt} sizes="(min-width: 768px) 600px, 100vw" />
                                </div>
                                <h3 className="font-display text-2xl font-semibold">
                                    {/* The link covers the whole card (bigger target) */}
                                    <Link href={p.id === 'website' ? ROUTES.dealers : ROUTES.dashboard} className="after:absolute after:inset-0">{p.title}</Link>
                                </h3>
                                <p className="text-fg-muted">{p.text}</p>
                                <p className="font-display text-xl font-semibold tabular-nums">{eur(tier(p.tier).eur)}<span className="font-sans text-base font-normal text-fg-muted"> a month</span></p>
                                <p aria-hidden="true" className="text-accent-alt underline-offset-4 group-hover:underline">{p.link} <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span></p>
                            </li>
                        ))}
                    </ul>
                    <p className="text-lg text-fg-muted">Both together, {eur(both.eur)} a month. With both, every enquiry from your website lands in the dashboard.</p>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                    <div className="grid content-start gap-8">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">From a buyer’s tap to your phone</h2>
                        <ol className="grid gap-6">
                            {LEAD_PATH.map((s, i) => (
                                <li key={s.title} className="grid grid-cols-[2.25rem_1fr] gap-x-2 border-t border-line pt-5">
                                    <span className="font-display text-sm text-accent-alt">{String(i + 1).padStart(2, '0')}</span>
                                    <div className="grid gap-1">
                                        <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                                        <p className="text-fg-muted">{s.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <Link href={ROUTES.dashboard} className={`w-fit ${link}`}>More about the dashboard</Link>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-frame">
                        <Shot src="/dealer-demo/dash-lead.webp" alt="A lead in the demo dealer dashboard with buttons to call, email or WhatsApp" sizes="(min-width: 1024px) 640px, 100vw" />
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-10">
                    <div className="grid max-w-2xl gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">Three plans</h2>
                        <p className="text-lg text-fg-muted">A month, before VAT, for one dealership.</p>
                    </div>
                    {/* From xl the columns live on the list and each row takes them (subgrid), so the rows share their edges. Below xl they stack. */}
                    <ul className="border-t border-line xl:grid xl:grid-cols-[auto_minmax(14rem,1fr)_minmax(0,17rem)] xl:gap-x-10">
                        {TIERS.map(t => (
                            <li key={t.id} className="relative grid gap-y-2 border-b border-line py-6 transition-colors hover:bg-surface has-[:focus-visible]:bg-surface xl:col-span-full xl:grid-cols-subgrid xl:items-baseline xl:px-4">
                                <h3 className="font-display text-2xl font-semibold">
                                    {/* The link covers the whole row (bigger target) */}
                                    <Link href={`${ROUTES.pricing}#plan-${t.id}`} className="after:absolute after:inset-0">{t.name}</Link>
                                </h3>
                                <p className="text-fg-muted">{t.summary}</p>
                                <p className="font-display text-xl font-semibold tabular-nums xl:text-right"><span className="whitespace-nowrap">{eur(t.eur)}</span><span className="font-sans text-base font-normal text-fg-muted"> a month</span></p>
                            </li>
                        ))}
                    </ul>
                    <p className="text-fg-muted">€500 setup for a plan with the website, none on a 2-year contract.</p>
                    <div><Button href={ROUTES.pricing} variant="secondary">See what each plan includes</Button></div>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container>
                    <div className="mb-12 grid gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">How you get set up</h2>
                        <p className="text-lg text-fg-muted">You deal with one person from the first call to the launch, and after it.</p>
                    </div>
                    <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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

            <CtaBand title="See it with your own stock in mind" text="Tell us a little about your dealership. We reply the way you ask." />
        </>
    );
}
