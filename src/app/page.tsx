import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Frame } from '@/components/ui/Frame';
import { Mark } from '@/components/ui/Mark';
import { CHECKS } from '@/content/checks';
import { PROJECTS } from '@/content/projects';
import { SERVICES, STEPS } from '@/content/services';
import { CTA, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: { absolute: 'Checkwork: websites and web apps for businesses in Ireland' },
    description: 'Checkwork builds fast websites and web apps for businesses in Ireland, with AI training and enablement for your team. See our work.',
    path: '/',
});

export default function Home() {
    return (
        <>
            <section className="py-12 md:py-14">
                <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <h1 className="font-display text-6xl font-bold md:text-8xl">
                            Websites that work
                            <Mark id="hero" className="ml-1 inline-block size-[0.7em] align-[-0.02em]" />
                        </h1>
                        <p className="rise mb-9 mt-7 max-w-xl text-lg text-fg-muted md:text-xl" style={{ "--d": 1 } as CSSProperties}>
                            Custom websites and web apps for businesses across Ireland. Fast on a phone, easy to find on Google, and easy for your team to run.
                        </p>
                        <div className="rise flex flex-wrap gap-3" style={{ "--d": 2 } as CSSProperties}>
                            <Button href={CTA.href}>{CTA.label}</Button>
                            <Button href={ROUTES.work} variant="secondary">See our work</Button>
                        </div>
                    </div>
                    {/* The one light surface on the page: a sign-off sheet. Ticks draw in, then the stamp lands. */}
                    <div className="rounded-sm bg-paper p-7 text-ink shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)] md:p-9" aria-labelledby="sheet-title">
                        <h2 id="sheet-title" className="font-sans text-xl font-semibold tracking-tight">Before it goes live</h2>
                        <p className="mt-1 text-sm text-ink-muted">Every Checkwork site passes these checks.</p>
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
                <Container className="grid gap-12">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <Frame label="Dealer demo site" alt="Demo dealer website, stock listing" hint="public/work/dealer-demo/home.png" />
                        <div className="grid gap-6">
                            <h2 className="font-display text-4xl font-semibold md:text-5xl">Our work</h2>
                            <p className="text-lg text-fg-muted">
                                A demo dealer website with searchable stock, a finance calculator and enquiry forms that store every lead. Also on the list: apps for resellers and a website for a vintage clothing shop.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button href={`${ROUTES.work}/dealer-demo`}>See the demo</Button>
                                <Button href={ROUTES.work} variant="secondary">All work</Button>
                            </div>
                        </div>
                    </div>
                    <ul className="border-t border-line">
                        {PROJECTS.map(p => (
                            <li key={p.slug} className="group relative grid gap-1 border-b border-line py-5 transition-colors hover:bg-surface has-[:focus-visible]:bg-surface md:grid-cols-[1fr_1.5fr] md:gap-10 md:px-4">
                                <h3 className="font-display text-xl font-semibold">
                                    <Link href={`${ROUTES.work}/${p.slug}`} className="after:absolute after:inset-0">{p.name}</Link>
                                </h3>
                                <p className="text-fg-muted">{p.kind}</p>
                            </li>
                        ))}
                    </ul>
                </Container>
            </Section>

            <Section className="border-t border-line">
                <Container>
                    <div className="mb-12 grid gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">What we build</h2>
                        <p className="text-lg text-fg-muted">Websites first, then the tools that keep them useful.</p>
                    </div>
                    <ul className="border-t border-line">
                        {SERVICES.map(s => (
                            <li key={s.id} className="group relative grid gap-3 border-b border-line py-7 transition-colors hover:bg-surface has-[:focus-visible]:bg-surface md:grid-cols-[1fr_1.5fr_auto] md:items-baseline md:gap-10 md:px-4">
                                <h3 className="font-display text-2xl font-semibold">
                                    {/* The link covers the whole row (bigger target); the arrow is decoration */}
                                    <Link href={`${ROUTES.services}#${s.id}`} className="after:absolute after:inset-0">{s.title}</Link>
                                </h3>
                                <p className="text-fg-muted">{s.summary}</p>
                                <span aria-hidden="true" className="hidden text-accent-alt transition-transform group-hover:translate-x-1 md:inline">→</span>
                            </li>
                        ))}
                    </ul>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container>
                    <div className="mb-12 grid gap-3">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">How a project runs</h2>
                        <p className="text-lg text-fg-muted">Four stages, and you are involved in each one.</p>
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

            <CtaBand title="Tell us about your business" text="Tell us what is not working today and what you want the site to do. We will reply by email." />
        </>
    );
}
