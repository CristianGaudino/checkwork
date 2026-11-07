import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { PROJECTS } from '@/content/projects';
import { LEGAL, NAV, ROUTES, SITE } from '@/lib/config';

export function Footer() {
    const { companyName, companyNumber, registeredOffice } = LEGAL;
    return (
        <footer className="border-t border-line py-14 text-sm text-fg-muted">
            <Container className="grid gap-10">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div className="grid content-start gap-4">
                        <Image src="/brand/checkwork-logo-on-dark.svg" alt="" width={160} height={25} className="h-[25px] w-auto" />
                        <p className="max-w-sm">{SITE.description}</p>
                    </div>
                    <nav aria-label="Footer">
                        <h2 className="mb-3 font-display text-base font-semibold text-fg">Site</h2>
                        <ul className="grid gap-2">
                            {[...NAV, { href: ROUTES.contact, label: 'Contact' }].map(i => (
                                <li key={i.href}><Link href={i.href} className="hover:text-fg">{i.label}</Link></li>
                            ))}
                        </ul>
                    </nav>
                    <nav aria-label="Work">
                        <h2 className="mb-3 font-display text-base font-semibold text-fg">Work</h2>
                        <ul className="grid gap-2">
                            {PROJECTS.map(p => (
                                <li key={p.slug}><Link href={`${ROUTES.work}/${p.slug}`} className="hover:text-fg">{p.name}</Link></li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6">
                    <span>
                        © {new Date().getFullYear()} {companyName}
                        {companyNumber && `. Registered in Ireland, company number ${companyNumber}`}
                        {registeredOffice && `. Registered office: ${registeredOffice}`}
                    </span>
                    <Link href={ROUTES.privacy} className="hover:text-fg">Privacy</Link>
                </div>
            </Container>
        </footer>
    );
}
