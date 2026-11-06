import { CTA } from '@/lib/config';
import { ButtonLink } from './Button';
import { Container, Section } from './Container';

export function CtaBand({ title = 'Tell us what you need', text = 'A short message is enough to start. We will reply by email.' }: { title?: string; text?: string }) {
    return (
        <Section className="border-t border-line bg-surface">
            <Container className="grid gap-6">
                <h2 className="font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">{title}</h2>
                <p className="max-w-xl text-lg text-fg-muted">{text}</p>
                <div><ButtonLink href={CTA.href}>{CTA.label}</ButtonLink></div>
            </Container>
        </Section>
    );
}
