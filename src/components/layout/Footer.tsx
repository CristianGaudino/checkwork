import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { CONTACT_EMAIL, LEGAL, NAV, ROUTES, SITE } from '@/lib/config';

export function Footer() {
    const { companyName, companyNumber, registeredOffice } = LEGAL;
    return (
        <footer className="border-t border-line py-14 text-sm text-fg-muted">
            <Container className="grid gap-10">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
                    <div className="grid content-start gap-4">
                        <Logo alt="" height={25} />
                        <p className="max-w-sm">{SITE.description}</p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="w-fit text-accent-alt underline underline-offset-4">{CONTACT_EMAIL}</a>
                    </div>
                    <nav aria-label="Footer">
                        <h2 className="mb-3 font-display text-base font-semibold text-fg">Site</h2>
                        <ul className="grid gap-2">
                            {[...NAV, { href: ROUTES.contact, label: 'Contact' }].map(i => (
                                <li key={i.href}><Link href={i.href} className="hover:text-fg">{i.label}</Link></li>
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
