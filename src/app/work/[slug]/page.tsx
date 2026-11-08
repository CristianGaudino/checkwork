import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Frame } from '@/components/ui/Frame';
import { PageHead } from '@/components/ui/PageHead';
import { getProject, PROJECTS } from '@/content/projects';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbs } from '@/lib/schema';

// Only the case studies in content/projects.ts exist
export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
    const project = getProject((await params).slug);
    if (!project) return {};
    return pageMetadata({ title: `${project.name} case study`, description: project.summary.length < 120 ? `${project.summary} A Checkwork case study.` : project.summary, path: `${ROUTES.work}/${project.slug}` });
}

export default async function CaseStudy({ params }: PageProps<'/work/[slug]'>) {
    const project = getProject((await params).slug);
    if (!project) notFound();
    const others = PROJECTS.filter(p => p.slug !== project.slug);

    return (
        <>
            <JsonLd data={breadcrumbs([{ name: 'Home', path: ROUTES.home }, { name: 'Work', path: ROUTES.work }, { name: project.name, path: `${ROUTES.work}/${project.slug}` }])} />
            <PageHead title={project.name} lead={`${project.kind}.`}>
                <Link href={ROUTES.work} className="text-accent-alt underline underline-offset-4">All work</Link>
            </PageHead>

            <Section className="pb-0 md:pb-0">
                <Container className={`grid gap-6 ${project.shots.length > 1 ? 'md:grid-cols-2' : ''}`}>
                    {project.shots.map((s, i) => (
                        <Frame key={s.alt} label={project.name} alt={s.alt} caption={s.caption} src={s.src} hint={`public/work/${project.slug}/${i + 1}.png`} />
                    ))}
                </Container>
            </Section>

            <Section>
                <Container className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
                    <div className="grid max-w-prose content-start gap-4">
                        <h2 className="font-display text-4xl font-semibold">The brief</h2>
                        <p className="text-fg-muted">{project.intro}</p>
                        {project.forDealers && <p className="text-fg-muted">{project.forDealers}</p>}
                        {project.result && <p className="font-semibold">{project.result}</p>}
                    </div>
                    <div>
                        <h2 className="sr-only">What we built</h2>
                        <dl className="border-t border-line">
                            {project.built.map(b => (
                                <div key={b.title} className="grid gap-1 border-b border-line py-5">
                                    <dt className="font-display text-xl font-semibold">{b.title}</dt>
                                    <dd className="text-fg-muted">{b.text}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </Container>
            </Section>

            <Section className="border-t border-line bg-surface">
                <Container>
                    <h2 className="mb-10 font-display text-4xl font-semibold">More work</h2>
                    <ul className="border-t border-line">
                        {others.map(p => (
                            <li key={p.slug} className="group relative grid gap-3 border-b border-line py-6 transition-colors hover:bg-surface has-[:focus-visible]:bg-surface md:grid-cols-[1fr_1.5fr_auto] md:items-baseline md:gap-10 md:px-4">
                                <h3 className="font-display text-2xl font-semibold">
                                    <Link href={`${ROUTES.work}/${p.slug}`} className="after:absolute after:inset-0">{p.name}</Link>
                                </h3>
                                <p className="text-fg-muted">{p.kind}.</p>
                                <span aria-hidden="true" className="hidden text-accent-alt transition-transform group-hover:translate-x-1 md:inline">→</span>
                            </li>
                        ))}
                    </ul>
                </Container>
            </Section>
            <CtaBand />
        </>
    );
}
