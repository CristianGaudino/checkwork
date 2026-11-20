import { CTA } from '@/lib/config';
import { Button } from './Button';
import { Container, Section } from './Container';

export function CtaBand({ title, text, href = CTA.href, label = CTA.label }: { title: string; text: string; href?: string; label?: string }) {
    return (
        <Section className="border-t border-line bg-surface">
            <Container className="grid gap-6">
                <h2 className="font-display text-4xl font-semibold text-balance md:text-5xl">{title}</h2>
                <p className="max-w-xl text-lg text-fg-muted">{text}</p>
                <div><Button href={href}>{label}</Button></div>
            </Container>
        </Section>
    );
}
