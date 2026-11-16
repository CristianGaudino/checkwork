import Link from 'next/link';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Frame } from '@/components/ui/Frame';
import { PageHead } from '@/components/ui/PageHead';
import { PROJECTS } from '@/content/projects';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: 'Our work: websites and web apps',
    description: 'Websites and web apps built by Checkwork: our demo dealer website, plus stock and profit apps for resellers, and a finance app for sole traders.',
    path: ROUTES.work,
});

export default function Work() {
    const [lead, ...rest] = PROJECTS;
    return (
        <>
            <PageHead title="Our work" lead="A demo dealer website and dashboard, and three apps for resellers and sole traders." />
            <Section>
                <Container className="grid gap-14">
                    <article className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
                        <Link href={`${ROUTES.work}/${lead.slug}`} tabIndex={-1} aria-hidden="true">
                            <Frame alt={lead.shots[0].alt} src={lead.shots[0].src} />
                        </Link>
                        <div className="grid gap-3">
                            <h2 className="font-display text-4xl font-semibold">
                                <Link href={`${ROUTES.work}/${lead.slug}`} className="hover:text-accent-alt">{lead.name}</Link>
                            </h2>
                            <p className="text-fg">{lead.kind}.</p>
                            <p className="text-fg-muted">{lead.summary}</p>
                        </div>
                    </article>
                    <div className="grid gap-12 md:grid-cols-3">
                        {rest.map(p => (
                            <article key={p.slug} className="grid content-start gap-4">
                                <Link href={`${ROUTES.work}/${p.slug}`} tabIndex={-1} aria-hidden="true">
                                    <Frame alt={p.shots[0].alt} src={p.shots[0].src} />
                                </Link>
                                <h3 className="font-display text-2xl font-semibold">
                                    <Link href={`${ROUTES.work}/${p.slug}`} className="hover:text-accent-alt">{p.name}</Link>
                                </h3>
                                <p>{p.kind}.</p>
                                <p className="text-fg-muted">{p.summary}</p>
                            </article>
                        ))}
                    </div>
                </Container>
            </Section>
            <CtaBand title="Want something like this?" />
        </>
    );
}
