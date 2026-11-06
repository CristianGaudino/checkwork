import type { ComponentProps } from 'react';

export function Container({ className = '', ...props }: ComponentProps<'div'>) {
    return <div className={`mx-auto w-[min(100%-2.5rem,75rem)] ${className}`} {...props} />;
}

export function Section({ className = '', ...props }: ComponentProps<'section'>) {
    return <section className={`py-20 md:py-32 ${className}`} {...props} />;
}
