'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CTA, NAV } from '@/lib/config';

export function Header() {
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? 'page' : undefined);

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl">
            <Container className="flex min-h-[4.5rem] items-center justify-between gap-6">
                <Link href="/" aria-label="Checkwork, home" onClick={() => setOpen(false)}>
                    <Image src="/brand/checkwork-logo-on-dark.svg" alt="Checkwork" width={190} height={30} priority className="h-[30px] w-auto" />
                </Link>
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls="site-nav"
                    onClick={() => setOpen(o => !o)}
                    className="rounded-xl border border-line px-3.5 py-2 text-sm font-semibold active:scale-[0.97] md:hidden"
                >
                    {open ? 'Close' : 'Menu'}
                </button>
                <nav
                    id="site-nav"
                    aria-label="Main"
                    className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col border-b border-line bg-canvas px-5 pb-6 pt-2 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}
                >
                    <ul className="flex flex-col md:flex-row md:gap-8">
                        {NAV.map(item => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={current(item.href)}
                                    onClick={() => setOpen(false)}
                                    className="block border-b border-line py-4 text-base text-fg-muted hover:text-fg aria-[current=page]:text-fg md:border-0 md:border-b-2 md:border-transparent md:py-1.5 md:text-sm md:aria-[current=page]:border-accent"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Button href={CTA.href} onClick={() => setOpen(false)} className="mt-4 md:mt-0 md:px-4 md:py-2.5 md:text-sm">{CTA.label}</Button>
                </nav>
            </Container>
        </header>
    );
}
