import { DemoButton } from '@/components/DemoButton';
import { Faqs } from '@/components/Faqs';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { ALLOWANCES, eur, LIMITS, PICK, PRICING_FAQS, setupLine, TERMS, TIERS, USAGE, type Tier } from '@/content/pricing';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: 'Prices for car dealers',
    description: 'Website €149, Dashboard €149, or both for €249 a month before VAT, for one dealership. €500 setup with the website, none on a 2-year contract.',
    path: ROUTES.pricing,
});

const tick = <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 size-4 shrink-0"><path d="M2.5 8.6 6.2 12 13.5 4" stroke="currentColor" strokeWidth="2" /></svg>;

const TALK: Record<Tier['id'], string> = { website: 'Talk to us about the website', dashboard: 'Talk to us about the dashboard', both: 'Talk to us about both' };

/** One plan. Website + Dashboard is the light sheet, the page's one light surface, with no label (owner, 2026-11-24) */
function Plan({ tier }: { tier: Tier }) {
    const pick = tier.id === PICK;
    return (
        // At lg the card's four parts sit on rows shared with the other cards (subgrid), so prices and buttons line up. The picked card's
        // lift (-my-4, 16px) is made up by its padding (py-11, 44px = 16px + the others' 28px), so its content sits on the same lines.
        <article id={`plan-${tier.id}`} aria-labelledby={`plan-${tier.id}-name`} className={`relative grid min-w-0 scroll-mt-24 content-start gap-6 rounded-2xl p-5 wrap-anywhere sm:p-7 lg:row-span-4 lg:grid-rows-subgrid ${pick ? 'bg-paper text-ink shadow-lift lg:-my-4 lg:py-11' : 'border border-line bg-surface'}`}>
            {/* Old plan links (#plan-showroom, #plan-dealer, #plan-group) still land on the card that replaced them */}
            {tier.oldIds.map(id => <span key={id} id={`plan-${id}`} className="absolute top-0 scroll-mt-24" aria-hidden="true" />)}
            <div className="grid gap-1">
                <h2 id={`plan-${tier.id}-name`} className="font-display text-2xl font-semibold">{tier.name}</h2>
                <p className={pick ? 'text-ink-muted' : 'text-fg-muted'}>{tier.summary}</p>
            </div>
            <div className="grid gap-1">
                <p><span className="whitespace-nowrap font-display text-4xl font-semibold tracking-tight sm:text-5xl">{eur(tier.eur)}</span> <span className={pick ? 'text-ink-muted' : 'text-fg-muted'}>a month</span></p>
                <p className={`text-sm ${pick ? 'text-ink-muted' : 'text-fg-muted'}`}>{setupLine(tier)} Before VAT.</p>
            </div>
            <Button href={`${ROUTES.contact}?need=${tier.id}`} variant={pick ? 'primary' : 'secondary'}>{TALK[tier.id]}</Button>
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
function PriceList({ rows }: { rows: readonly { title: string; eur: string }[] }) {
    return (
        <dl className="border-t border-line">
            {rows.map(r => (
                <div key={r.title} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line py-4">
                    <dt className="font-semibold">{r.title}</dt>
                    <dd className="text-right font-display font-semibold tabular-nums">{r.eur}</dd>
                </div>
            ))}
        </dl>
    );
}

export default function Pricing() {
    return (
        <>
            <PageHead title="Prices" lead="For one dealership, a month, before VAT, on a 1 or 2 year contract. The price does not change with the number of cars.">
                <Button href={ROUTES.contact}>Talk to us</Button>
                <DemoButton variant="secondary" />
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
                                        <span className="font-display text-xl font-semibold tabular-nums"><span className="whitespace-nowrap">{eur(t.eur)}</span><span className="font-sans text-sm font-normal text-fg-muted"> a month</span></span>
                                        <span className="col-span-2 text-sm text-fg-muted">{t.summary}</span>
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
                        <p className="text-fg-muted">Past these, you pay per use, up to a limit.</p>
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
                    <table className="hidden w-full table-fixed border-t border-line text-left md:table">
                        <caption className="sr-only">What each plan includes a month</caption>
                        {/* Labels a third, the three plans equal */}
                        <colgroup><col className="w-[34%]" /><col /><col /><col /></colgroup>
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
                                    {TIERS.map(({ id }) => <td key={id} className={`py-4 pl-2 align-top tabular-nums ${a[id] ? '' : 'text-fg-muted'}`}>{a[id] ?? 'None'}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container className="grid gap-14 md:grid-cols-2 md:gap-16">
                    <div className="grid content-start gap-6">
                        <div className="grid gap-3">
                            <h2 className="font-display text-3xl font-semibold">Past the allowance</h2>
                            <p className="text-fg-muted">Each use, before VAT. Replies to buyers and reminders are billed from the first one. History checks are paid per check, with none included.</p>
                        </div>
                        <PriceList rows={USAGE} />
                    </div>
                    <div className="grid content-start gap-6">
                        <div className="grid gap-3">
                            <h2 className="font-display text-3xl font-semibold">Monthly limits</h2>
                            <p className="text-fg-muted">Extra use stops at these amounts until the next month. You can set lower ones in the dashboard.</p>
                        </div>
                        <PriceList rows={LIMITS} />
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                    <h2 className="font-display text-4xl font-semibold">Paying</h2>
                    <dl className="border-t border-line">
                        {TERMS.map(t => (
                            // Label and text side by side while both fit (12rem and at least 10rem), else the text goes under: never a squeezed column
                            <div key={t.title} className="flex flex-wrap gap-x-6 gap-y-1 border-b border-line py-5">
                                <dt className="basis-48 font-semibold">{t.title}</dt>
                                <dd className="grow basis-40 text-fg-muted">{t.text}</dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </Section>

            <Faqs faqs={PRICING_FAQS} title="Questions about prices" />

            <CtaBand title="Find the right plan for your yard" text="Tell us about your dealership. We will reply and price it with you." />
        </>
    );
}
