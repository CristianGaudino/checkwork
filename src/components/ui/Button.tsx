import Link from 'next/link';
import type { ComponentProps } from 'react';

const base =
    // Side padding shrinks on a very narrow screen, so a button's whole words still fit at 320px with large text
    'inline-flex items-center justify-center gap-2 rounded-xl border px-[min(1.25rem,5vw)] py-3.5 text-center text-base font-semibold leading-none ' +
    // Feedback is on the press, and instant (apple-design: response)
    'transition-[background-color,border-color,transform] duration-150 active:scale-[0.97] active:duration-100';

const variants = {
    primary: 'border-transparent bg-action text-on-action hover:bg-action-hover',
    secondary: 'border-fg/40 text-fg hover:border-fg',
} as const;

export function Button({ variant = 'primary', className = '', ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
    // data-button: kept to whole words like a real button (globals.css)
    return <Link data-button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
