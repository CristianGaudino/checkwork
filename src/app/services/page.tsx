import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { SERVICES } from '@/content/services';

export const metadata = pageMetadata({
    title: 'Services',
    description: 'Web design and development, custom web apps, dealer tools and ongoing support from Checkwork in Ireland.',
    path: '/services',
});

export default function Services() {
    return (
        <>
            <PageHead title="Services" lead="Websites and web apps for businesses in Ireland, and support once they are live." />
            <Section>
                <Container>
                    <ul className="border-t border-line">
                        {SERVICES.map(s => (
                            <li key={s.id} id={s.id} className="grid scroll-mt-28 gap-4 border-b border-line py-10 md:grid-cols-[1fr_1.6fr] md:gap-12">
                                <h2 className="font-display text-3xl font-semibold">{s.title}</h2>
                                <div>
                                    <p className="text-fg-muted">{s.text}</p>
                                    <ul className="mt-4 list-disc pl-5 marker:text-accent-alt">
                                        {s.points.map(p => <li key={p}>{p}</li>)}
                                    </ul>
                                    {'more' in s && (
                                        <p className="mt-5"><Link href={s.more.href} className="text-accent-alt underline underline-offset-4">{s.more.label}</Link></p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </Container>
            </Section>
            <CtaBand title="Not sure which one you need?" text="Describe what is not working today. We will tell you what we would do about it." />
        </>
    );
}
