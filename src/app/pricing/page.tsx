import { DemoButton } from '@/components/DemoButton';
import { Faqs } from '@/components/Faqs';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { ADDONS, ALLOWANCES, eur, LIMITS, PRICING_FAQS, TERMS, TIERS, USAGE, type Tier } from '@/content/pricing';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: 'Prices for car dealers',
    description: 'Checkwork plans for car dealers in Ireland: Showroom €249, Dealer €449 and Group €749 a month before VAT. What each includes, add-ons, usage and payment terms.',
    path: ROUTES.pricing,
});

const tick = <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 size-4 shrink-0"><path d="M2.5 8.6 6.2 12 13.5 4" stroke="currentColor" strokeWidth="2" /></svg>;

/** One plan. Dealer, the one we recommend, is the light sheet: the site's one light surface, as on the home page */
function Plan({ tier }: { tier: Tier }) {
    const pick = tier.id === 'dealer';
    return (
        // At lg the card's four parts sit on rows shared with the other cards (subgrid), so prices and buttons line up. The Dealer card's
        // lift (-my-4, 16px) is made up by its padding (py-11, 44px = 16px + the others' 28px), so its content sits on the same lines.
        <article id={`plan-${tier.id}`} aria-labelledby={`plan-${tier.id}-name`} className={`grid min-w-0 scroll-mt-24 content-start gap-6 rounded-2xl p-5 wrap-anywhere sm:p-7 lg:row-span-4 lg:grid-rows-subgrid ${pick ? 'bg-paper text-ink shadow-lift lg:-my-4 lg:py-11' : 'border border-line bg-surface'}`}>
            <div className="grid gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h2 id={`plan-${tier.id}-name`} className="font-display text-2xl font-semibold">{tier.name}</h2>
                    {pick && <p className="text-sm font-semibold text-action-hover">Recommended</p>}
                </div>
                <p className={pick ? 'text-ink-muted' : 'text-fg-muted'}>{tier.fits}</p>
            </div>
            <div className="grid gap-1">
                <p><span className="font-display text-5xl font-semibold tracking-tight">{eur(tier.eur)}</span> <span className={pick ? 'text-ink-muted' : 'text-fg-muted'}>a month</span></p>
                <p className={`text-sm ${pick ? 'text-ink-muted' : 'text-fg-muted'}`}>
                    {tier.branchEur && <>Plus {eur(tier.branchEur)} a month for each branch after the first. </>}
                    {eur(tier.setupEur)} setup. Before VAT.
                </p>
            </div>
            <Button href={`${ROUTES.contact}?need=${tier.id}`} variant={pick ? 'primary' : 'secondary'}>Talk to us about {tier.name}</Button>
            <div className={`grid content-start gap-3 border-t pt-6 ${pick ? 'border-ink/15' : 'border-line'}`}>
                <p className="font-semibold">{tier.lead}</p>
                <ul className="grid gap-2.5">
                    {tier.items.map(i => (
                        <li key={i} className={`flex gap-3 ${pick ? 'text-ink-muted [&>svg]:text-action-hover' : 'text-fg-muted [&>svg]:text-accent-alt'}`}>{tick}{i}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

/** A two-column price list: what on the left, the price on the right */
function PriceList({ rows }: { rows: readonly { title: string; eur: string; note?: string; on?: string; text?: string }[] }) {
    return (
        <dl className="border-t border-line">
            {rows.map(r => (
                <div key={r.title} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line py-4">
                    <dt className="font-semibold">{r.title}{r.on && <span className="font-normal text-fg-muted">, on {r.on}</span>}</dt>
                    <dd className="text-right font-display font-semibold tabular-nums">{r.eur}</dd>
                    {(r.text || r.note) && <dd className="col-span-2 text-sm text-fg-muted">{r.text ?? r.note}</dd>}
                </div>
            ))}
        </dl>
    );
}

const PLAN_IDS = ['showroom', 'dealer', 'group'] as const;

export default function Pricing() {
    return (
        <>
            <PageHead title="Prices for car dealers" lead="Three plans, each a month, before VAT. Everything in the demo is on offer, in the plan that has it.">
                <DemoButton />
                <Button href={ROUTES.contact} variant="secondary">Talk to us</Button>
            </PageHead>

            <Section className="pt-12 md:pt-20">
                <Container className="grid gap-10">
                    {/* On a phone the cards stack and run long: the three plans at a glance first, each a jump to its card */}
                    <ul className="mx-auto grid w-full max-w-xl border-t border-line lg:hidden" aria-label="The plans at a glance">
                        {TIERS.map(t => (
                            <li key={t.id}>
                                <a href={`#plan-${t.id}`} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-line py-4">
                                    <span className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1">
                                        <span className="font-display text-xl font-semibold wrap-normal">{t.name}</span>
                                        <span className="font-display text-xl font-semibold tabular-nums">{eur(t.eur)}<span className="font-sans text-sm font-normal text-fg-muted"> a month</span></span>
                                        <span className="col-span-2 text-sm text-fg-muted">{t.id === 'dealer' && <span className="font-semibold text-accent-alt">Recommended. </span>}{t.fits}{t.branchEur && `. Plus ${eur(t.branchEur)} a month for each branch after the first`}</span>
                                    </span>
                                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 text-fg-muted transition-transform group-hover:translate-y-0.5"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="2" /></svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="mx-auto grid w-full max-w-xl gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-x-5">
                        {TIERS.map(t => <Plan key={t.id} tier={t} />)}
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line">
                {/* The table sits under its heading, not beside it: four columns need the full width with large text */}
                <Container className="grid gap-10">
                    <div className="grid max-w-2xl content-start gap-3">
                        <h2 className="font-display text-4xl font-semibold">Included each month</h2>
                        <p className="text-fg-muted">Each plan includes these every month. Past them you pay per use, up to a limit.</p>
                    </div>
                    {/* Below md, one short list per plan: four columns don’t fit a phone with large text */}
                    <div className="grid gap-6 md:hidden">
                        {TIERS.map(t => (
                            <div key={t.id} className="border-t border-line">
                                <h3 className="py-3 font-display text-base font-semibold">{t.name}</h3>
                                <dl>
                                {ALLOWANCES.map(a => (
                                    <div key={a.label} className="flex flex-wrap justify-between gap-x-4 border-t border-line py-2.5">
                                        <dt>{a.label}</dt>
                                        <dd className={`tabular-nums ${a[t.id] ? '' : 'text-fg-muted'}`}>{a[t.id] ?? 'None'}</dd>
                                    </div>
                                ))}
                                </dl>
                            </div>
                        ))}
                    </div>
                    <table className="hidden w-full border-t border-line text-left md:table">
                        <caption className="sr-only">What each plan includes a month</caption>
                        <thead>
                            <tr className="border-b border-line">
                                <td className="py-3" />
                                {TIERS.map(t => <th key={t.id} scope="col" className="py-3 pl-2 font-display font-semibold">{t.name}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {ALLOWANCES.map(a => (
                                <tr key={a.label} className="border-b border-line">
                                    <th scope="row" className="py-4 pr-2 align-top font-semibold">{a.label}</th>
                                    {PLAN_IDS.map(id => <td key={id} className={`py-4 pl-2 align-top tabular-nums ${a[id] ? '' : 'text-fg-muted'}`}>{a[id] ?? 'None'}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <div className="grid content-start gap-3">
                        <h2 className="font-display text-4xl font-semibold">Add-ons</h2>
                        <p className="text-fg-muted">A month, before VAT. Group already has every add-on but service and aftersales.</p>
                    </div>
                    <PriceList rows={ADDONS} />
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-14 md:grid-cols-2 md:gap-16">
                    <div className="grid content-start gap-6">
                        <div className="grid gap-3">
                            <h2 className="font-display text-3xl font-semibold">Past the allowance</h2>
                            <p className="text-fg-muted">Each use, before VAT. Replies to buyers and marketing messages are billed from the first one.</p>
                        </div>
                        <PriceList rows={USAGE} />
                    </div>
                    <div className="grid content-start gap-6">
                        <div className="grid gap-3">
                            <h2 className="font-display text-3xl font-semibold">Monthly limits</h2>
                            <p className="text-fg-muted">Extra use stops at these amounts until the next month. On Dealer and Group you can set lower ones in the dashboard. On Showroom, ask us. Ask us too if you need a limit raised.</p>
                        </div>
                        <PriceList rows={LIMITS} />
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <h2 className="font-display text-4xl font-semibold">Paying</h2>
                    <dl className="border-t border-line">
                        {TERMS.map(t => (
                            <div key={t.title} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-6">
                                <dt className="font-semibold">{t.title}</dt>
                                <dd className="text-fg-muted">{t.text}</dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </Section>

            <Faqs faqs={PRICING_FAQS} title="Questions about prices" />

            <CtaBand title="Find the right plan for your yard" text="Tell us about your dealership and how many cars you carry. We will reply, walk you through the demo and price it with you." />
        </>
    );
}
