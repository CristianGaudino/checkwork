import Link from 'next/link';
import { DemoButton } from '@/components/DemoButton';
import { CtaBand } from '@/components/ui/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { ROUTES } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
    title: 'Who builds Checkwork for car dealers',
    description: 'Checkwork is run by one person in Ireland, building websites and a dashboard for car dealers. Who you deal with, and how it works with your dealership.',
    path: ROUTES.about,
});

// TODO (issue #2): the owner's name and a photo, once the owner wants them on the site
const PRINCIPLES = [
    { title: 'One person, start to finish', text: 'The person on the first call builds your site, launches it and answers when you need a change.' },
    { title: 'Your own accounts', text: 'Your stock stays on DoneDeal or CarsIreland, your reviews on Google and your WhatsApp Business number with you. We connect them at setup.' },
    { title: 'Prices you can see', text: 'Every plan, add-on and price per use is on the pricing page, before VAT.' },
    { title: 'Checked before launch', text: 'Nothing goes live until it passes the same checks, every time, on a phone as well as a laptop.' },
];

const link = 'text-accent-alt underline underline-offset-4';

export default function About() {
    return (
        <>
            <PageHead
                title="Who builds Checkwork"
                lead="Checkwork is run by one person in Ireland, building websites and a dashboard for car dealers on the stock they already list."
            >
                <DemoButton variant="secondary" />
            </PageHead>
            <Section>
                <Container className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
                    <h2 className="font-display text-3xl font-semibold">Why only car dealers</h2>
                    <div className="grid max-w-prose gap-4 text-fg-muted">
                        <p>A dealership sells from its stock, its reviews and how quickly it answers a lead. Checkwork is built around that: a site that follows your DoneDeal or CarsIreland stock, your Google reviews on it, trade-ins with a reg lookup, and a dashboard where every lead has an owner and a follow-up date.</p>
                        <p>All of it is in the <Link href={ROUTES.dealers} className={link}>demo dealer site and dashboard</Link>. AI writes first drafts of descriptions and replies for your team to check, as the <Link href={ROUTES.dealerAI} className={link}>AI for dealers</Link> page shows.</p>
                    </div>
                </Container>
            </Section>
            <Section className="border-t border-line bg-surface">
                <Container>
                    <h2 className="mb-10 font-display text-4xl font-semibold">How it works with you</h2>
                    <ul className="border-t border-line">
                        {PRINCIPLES.map(p => (
                            <li key={p.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[1fr_1.6fr] md:gap-12">
                                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                                <p className="text-fg-muted">{p.text}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-fg-muted">See the <Link href={ROUTES.pricing} className={link}>plans and prices</Link>.</p>
                </Container>
            </Section>
            <CtaBand title="Talk to the person who builds it" text="Tell us a little about your dealership. You will hear back from the same person who would build your site." />
        </>
    );
}
