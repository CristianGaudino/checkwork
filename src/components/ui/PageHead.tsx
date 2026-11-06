import type { ReactNode } from 'react';
import { Container } from './Container';

export function PageHead({ title, lead, children }: { title: string; lead: string; children?: ReactNode }) {
    return (
        <div className="border-b border-line pb-14 pt-16 md:pb-20 md:pt-28">
            <Container className="grid gap-5">
                <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">{title}</h1>
                <p className="max-w-2xl text-lg text-fg-muted md:text-xl">{lead}</p>
                {children && <div className="mt-3 flex flex-wrap gap-3">{children}</div>}
            </Container>
        </div>
    );
}
