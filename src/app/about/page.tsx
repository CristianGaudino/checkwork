import type { Metadata } from 'next';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { TEAM } from '@/lib/config';

export const metadata: Metadata = {
    title: 'About',
    description: 'Checkwork is a two-person web development company in Ireland building websites and dealer tools.',
    alternates: { canonical: '/about' },
};

const PRINCIPLES = [
    { title: 'Plain answers', text: 'We explain what we are doing and why, without jargon.' },
    { title: 'Built to be run', text: 'We build things your team can use day to day, not things only a developer can change.' },
    { title: 'Checked before launch', text: 'Nothing goes live until it passes the same checks, every time.' },
];

export default function About() {
    const team = TEAM.filter(t => t.name);
    return (
        <>
            <PageHead
                title="Two developers, one company"
                lead="Checkwork is a web development company in Ireland. We design and build websites, and the software behind them, for car dealerships and growing businesses."
            />
            <Section>
                <Container className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
                    <h2 className="font-display text-3xl font-semibold">What we have built</h2>
                    <div className="grid max-w-prose gap-4 text-fg-muted">
                        <p>We build in code, end to end. That is how we made Carright, a dealer website with stock, lead and social media tools, and a set of apps for resellers that track stock, profit and finances.</p>
                        <p>We started in the motor trade because we have connections there, and because a dealership gives a website a clear job: sell cars.</p>
                    </div>
                </Container>
            </Section>
            <Section className="border-t border-line bg-surface">
                <Container>
                    <h2 className="mb-10 font-display text-4xl font-semibold tracking-tight">How we work</h2>
                    <ul className="border-t border-line">
                        {PRINCIPLES.map(p => (
                            <li key={p.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[1fr_1.6fr] md:gap-12">
                                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                                <p className="text-fg-muted">{p.text}</p>
                            </li>
                        ))}
                    </ul>
                </Container>
            </Section>
            {team.length > 0 && (
                <Section>
                    <Container>
                        <h2 className="mb-10 font-display text-4xl font-semibold tracking-tight">The team</h2>
                        <ul className="border-t border-line">
                            {team.map(t => (
                                <li key={t.name} className="grid gap-2 border-b border-line py-6 md:grid-cols-[1fr_1.6fr] md:gap-12">
                                    <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                                    <p className="text-fg-muted">{t.role}</p>
                                </li>
                            ))}
                        </ul>
                    </Container>
                </Section>
            )}
            <CtaBand />
        </>
    );
}
