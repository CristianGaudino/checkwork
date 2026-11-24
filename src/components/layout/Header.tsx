'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { CTA, NAV } from '@/lib/config';

export function Header() {
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menu = useRef<HTMLButtonElement>(null);
    const bar = useRef<HTMLElement>(null);
    // Before hydration (or with no script) the bar can't tell when content is under it, so it stays solid
    const hydrated = useSyncExternalStore(() => () => {}, () => true, () => false);
    const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? 'page' : undefined);

    // The divider and the blur appear only once content is under the bar: a scroll edge, not a permanent rule
    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 8);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    useEffect(() => {
        if (!open) return;
        // Escape closes the menu and puts focus back on the button that opened it
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menu.current?.focus(); } };
        // A tap outside the bar and its menu closes it
        const onTap = (e: PointerEvent) => { if (!bar.current?.contains(e.target as Node)) setOpen(false); };
        window.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onTap);
        return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onTap); };
    }, [open]);

    return (
        <header
            ref={bar}
            style={{ viewTransitionName: 'site-header' }}
            className={`sticky top-0 z-50 border-b transition-[border-color,background-color] duration-200 ${
                scrolled || open ? 'glass border-line bg-canvas/80 backdrop-blur-xl' : hydrated ? 'border-transparent bg-canvas/0' : 'border-transparent bg-canvas'
            }`}
        >
            <Container className="flex min-h-[4.5rem] items-center justify-between gap-6">
                <Link href="/" aria-label="Checkwork, home" onClick={() => setOpen(false)}>
                    <Logo alt="Checkwork" height={30} preload />
                </Link>
                <button
                    ref={menu}
                    type="button"
                    aria-expanded={open}
                    aria-controls="site-nav"
                    onClick={() => setOpen(o => !o)}
                    className="rounded-xl border border-line px-3.5 py-2 text-sm font-semibold transition-transform active:scale-[0.97] md:hidden"
                >
                    {open ? 'Close' : 'Menu'}
                </button>
                {/* On a phone the panel comes down from the bar and goes back the same way; it can be reversed mid-way (transitions start from the current value) */}
                <nav
                    id="site-nav"
                    aria-label="Main"
                    // Tabbing out of the open menu (to the page, not the Menu button) closes it, so it never hangs over what has focus
                    onBlur={e => { if (open && !e.currentTarget.contains(e.relatedTarget) && e.relatedTarget !== menu.current) setOpen(false); }}
                    className={`absolute inset-x-0 top-full flex origin-top flex-col border-b border-line bg-canvas px-5 pb-6 pt-2 transition-[opacity,transform,visibility] duration-200 ease-out md:visible md:static md:translate-y-0 md:flex-row md:items-center md:gap-6 md:border-0 lg:gap-8 md:bg-transparent md:p-0 md:opacity-100 ${
                        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                    }`}
                >
                    <ul className="flex flex-col md:flex-row md:gap-5 lg:gap-8">
                        {NAV.map(item => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={current(item.href)}
                                    onClick={() => setOpen(false)}
                                    className="block border-b border-line py-4 text-base text-fg-muted hover:text-fg aria-[current=page]:text-fg md:border-0 md:py-1.5 md:text-sm md:aria-[current=page]:underline md:aria-[current=page]:decoration-accent md:aria-[current=page]:decoration-2 md:aria-[current=page]:underline-offset-[0.6rem]"
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
