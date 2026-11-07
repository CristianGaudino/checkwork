import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: 'About',
    description: 'Checkwork is a web development company in Ireland building websites and dealer tools.',
    path: '/about',
});

const PRINCIPLES = [
    { title: 'Plain answers', text: 'We explain what we are doing and why, without jargon.' },
    { title: 'Built to be run', text: 'We build things your team can use day to day, not things only a developer can change.' },
    { title: 'Checked before launch', text: 'Nothing goes live until it passes the same checks, every time.' },
];

export default function About() {
    return (
        <>
            <PageHead
                title="What we build and how we work"
                lead="Checkwork is a web development company in Ireland. We design and build websites, and the software behind them, for car dealerships and growing businesses."
            />
            <Section>
                <Container className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
                    <h2 className="font-display text-3xl font-semibold">What we have built</h2>
                    <div className="grid max-w-prose gap-4 text-fg-muted">
                        <p>We build in code, end to end. That is how we made our demo dealer website, with stock search, a finance calculator and enquiry capture, and a set of apps for resellers that track stock, profit and finances.</p>
                    </div>
                </Container>
            </Section>
            <Section className="border-t border-line bg-surface">
                <Container>
                    <h2 className="mb-10 font-display text-4xl font-semibold">How we work</h2>
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
            <CtaBand />
        </>
    );
}
