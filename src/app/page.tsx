import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Frame } from '@/components/ui/Frame';
import { Mark } from '@/components/ui/Mark';
import { CHECKS } from '@/content/checks';
import { SERVICES, STEPS } from '@/content/services';
import { CTA, ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: { absolute: 'Checkwork: web design and development for car dealerships in Ireland' },
    description: 'Checkwork builds fast, easy-to-run websites and dealer tools for car dealerships in Ireland. See Carright, a dealer website with stock, lead and social tools built in.',
    path: '/',
});

export default function Home() {
    return (
        <>
            <section className="relative overflow-hidden bg-[radial-gradient(60%_70%_at_88%_0%,rgb(99_102_241/0.34),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgb(167_139_250/0.12),transparent_70%)] py-16 md:py-28">
                <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <h1 className="font-display text-6xl font-bold md:text-8xl">
                            Websites that work
                            <Mark id="hero" className="ml-1 inline-block size-[0.7em] align-[-0.02em]" />
                        </h1>
                        <p className="rise mb-9 mt-7 max-w-xl text-lg text-fg-muted md:text-xl" style={{ "--d": 1 } as CSSProperties}>
                            Custom websites and dealer tools for car dealerships across Ireland. Fast on a phone, easy to find on Google, and easy for your team to run.
                        </p>
                        <div className="rise flex flex-wrap gap-3" style={{ "--d": 2 } as CSSProperties}>
                            <Button href={CTA.href}>{CTA.label}</Button>
                            <Button href={`${ROUTES.work}/carright`} variant="secondary">See Carright</Button>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)] md:p-8" aria-labelledby="sheet-title">
                        <h2 id="sheet-title" className="font-display text-xl font-semibold">Before any site goes live</h2>
                        <p className="mt-1 text-sm text-fg-muted">Every Checkwork site passes these five checks.</p>
                        <ul className="mt-6 border-t border-line">
                            {CHECKS.map((c, i) => (
                                <li key={c.title} className="grid grid-cols-[1.75rem_1fr] gap-4 border-b border-line py-4">
                                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 size-5">
                                        <path d="M2.5 8.6 6.2 12 13.5 4" pathLength={1} className="tick" style={{ "--i": i } as CSSProperties} stroke="#A78BFA" strokeWidth="2.2" />
                                    </svg>
                                    <div>
                                        <h3 className="font-sans text-base font-semibold">{c.title}</h3>
                                        <p className="mt-0.5 text-sm text-fg-muted">{c.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="appear mt-5 flex justify-between text-sm"><span className="text-fg-muted">Launch check</span><strong>5 of 5 passed</strong></p>
                    </div>
                </Container>
            </section>

            <Section className="border-t border-line">
                <Container className="grid items-center gap-12 lg:grid-cols-2">
                    <Frame label="Carright" alt="Carright dealer website and dashboard" hint="public/work/carright/home.png" />
                    <div className="grid gap-6">
                        <h2 className="font-display text-4xl font-semibold md:text-5xl">Carright: a dealer website with the tools behind it</h2>
                        <p className="text-lg text-fg-muted">
                            A redesigned dealer website with the tools behind it: stock controls, lead tracking, a metrics dashboard and social media auto-posting.
                        </p>
                        <div><Button href={`${ROUTES.work}/carright`}>Read the Carright case study</Button></div>
                    </div>
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

            <CtaBand title="Running a dealership? Let's look at your website." text="Tell us about your stock, your enquiries and what is not working. We will reply by email." />
        </>
    );
}
