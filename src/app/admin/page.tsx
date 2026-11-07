import { desc } from 'drizzle-orm';
import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { requireAdmin } from '@/lib/access';
import { getDb } from '@/lib/db';
import { ENQUIRY_STATUSES, enquiries } from '@/lib/db/schema';
import { deleteEnquiry, setStatus } from './actions';

export const metadata: Metadata = { title: 'Enquiries', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const when = new Intl.DateTimeFormat('en-IE', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Dublin' });

export default async function Admin() {
    const email = await requireAdmin();
    // shortcut: newest 200 only, no paging or search. Upgrade when there are more than that to read.
    const rows = await getDb().select().from(enquiries).orderBy(desc(enquiries.id)).limit(200);

    return (
        <>
            <PageHead title="Enquiries" lead={`Signed in as ${email}. ${rows.length} shown, newest first.`} />
            <Section className="pt-0 md:pt-0">
                <Container className="grid gap-4">
                    {rows.length === 0 && <p className="text-fg-muted">No enquiries yet.</p>}
                    {rows.map(r => (
                        <article key={r.id} className="grid gap-3 rounded-xl border border-line bg-surface p-5">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <h2 className="font-display text-xl font-semibold">{r.name}{r.business && <span className="font-normal text-fg-muted">, {r.business}</span>}</h2>
                                <p className="text-sm text-fg-muted">{when.format(new Date(r.createdAt))}</p>
                            </div>
                            <p className="text-sm text-fg-muted">
                                <a href={`mailto:${r.email}`} className="underline underline-offset-4">{r.email}</a>
                                {r.phone && <> · <a href={`tel:${r.phone}`} className="underline underline-offset-4">{r.phone}</a></>} · {r.need}
                            </p>
                            <p className="whitespace-pre-wrap">{r.message}</p>
                            <div className="flex flex-wrap items-center gap-4">
                                <form action={setStatus.bind(null, r.id)} className="flex items-center gap-2">
                                    <label htmlFor={`status-${r.id}`} className="sr-only">Status</label>
                                    <select id={`status-${r.id}`} name="status" defaultValue={r.status} className="rounded-lg border border-line bg-canvas px-3 py-2">
                                        {ENQUIRY_STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                    <button className="rounded-lg border border-fg/40 px-3 py-2 font-semibold hover:border-fg">Save</button>
                                </form>
                                <details>
                                    <summary className="cursor-pointer text-fg-muted">Delete</summary>
                                    <form action={deleteEnquiry.bind(null, r.id)} className="mt-2">
                                        <button className="rounded-lg border border-red-400 px-3 py-2 font-semibold text-red-300">Delete {r.name} for good</button>
                                    </form>
                                </details>
                            </div>
                        </article>
                    ))}
                </Container>
            </Section>
        </>
    );
}
