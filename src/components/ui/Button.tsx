import Link from 'next/link';
import type { ComponentProps } from 'react';

const base =
    'inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-base font-semibold leading-none ' +
    // Feedback is on the press, and instant (apple-design: response)
    'transition-[background-color,border-color,transform] duration-150 active:scale-[0.97] active:duration-100';

const variants = {
    primary: 'border-transparent bg-action text-white hover:bg-action-hover',
    secondary: 'border-fg/40 text-fg hover:border-fg',
} as const;

export function Button({ variant = 'primary', className = '', ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
    return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
