import { and, count, desc, eq, or, sql } from 'drizzle-orm';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui/Container';
import { PageHead } from '@/components/ui/PageHead';
import { requireAdmin } from '@/lib/access';
import { ROUTES } from '@/lib/config';
import { getDb } from '@/lib/db';
import { ENQUIRY_STATUSES, enquiries } from '@/lib/db/schema';
import { deleteEnquiry, saveNotes, setStatus } from './actions';

export const metadata: Metadata = { title: 'Enquiries', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const when = new Intl.DateTimeFormat('en-IE', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Dublin' });
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';
const field = 'rounded-lg border border-line bg-canvas px-3 py-2';

export default async function Admin({ searchParams }: PageProps<'/admin'>) {
    const email = await requireAdmin();
    const params = await searchParams;
    const status = ENQUIRY_STATUSES.find(s => s === first(params.status));
    const q = first(params.q).trim().slice(0, 100);
    const db = getDb();

    // Escape LIKE wildcards so a search for "%" or "_" matches the character itself
    const term = `%${q.replace(/[\\%_]/g, '\\$&')}%`;
    const search = q ? or(...[enquiries.name, enquiries.email, enquiries.business, enquiries.message, enquiries.notes].map(c => sql`${c} like ${term} escape '\\'`)) : undefined;
    // shortcut: newest 200 only, no paging. Upgrade when there are more than that to read.
    const rows = await db.select().from(enquiries).where(and(status && eq(enquiries.status, status), search)).orderBy(desc(enquiries.id)).limit(200);
    const totals = new Map((await db.select({ status: enquiries.status, n: count() }).from(enquiries).groupBy(enquiries.status)).map(t => [t.status, t.n]));
    const all = [...totals.values()].reduce((a, b) => a + b, 0);
    const href = (s?: string) => ({ pathname: ROUTES.admin, query: { ...(s && { status: s }), ...(q && { q }) } });

    return (
        <>
            <PageHead title="Enquiries" lead={`Signed in as ${email}. ${rows.length} shown, newest first.`} />
            <Section className="pt-0 md:pt-0">
                <Container className="grid gap-6">
                    <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
                        {[undefined, ...ENQUIRY_STATUSES].map(s => (
                            <Link key={s ?? 'all'} href={href(s)} aria-current={s === status ? 'true' : undefined}
                                className="rounded-full border border-line px-4 py-2 aria-[current=true]:border-fg aria-[current=true]:font-semibold">
                                {s ?? 'all'} <span className="text-fg-muted">{s ? (totals.get(s) ?? 0) : all}</span>
                            </Link>
                        ))}
                    </nav>
                    <form action={ROUTES.admin} className="flex flex-wrap gap-2">
                        {status && <input type="hidden" name="status" value={status} />}
                        <label htmlFor="q" className="sr-only">Search enquiries</label>
                        <input id="q" name="q" type="search" defaultValue={q} placeholder="Search name, email, message or notes" className={`${field} min-w-0 flex-1`} />
                        <button className="rounded-lg border border-fg/40 px-4 py-2 font-semibold hover:border-fg">Search</button>
                        {q && <Link href={{ pathname: ROUTES.admin, query: status ? { status } : {} }} className="px-2 py-2 text-fg-muted underline underline-offset-4">Clear</Link>}
                    </form>

                    {rows.length === 0 && <p className="text-fg-muted">{all === 0 ? 'No enquiries yet.' : 'Nothing matches.'}</p>}
                    {rows.map(r => {
                        const reply = `mailto:${r.email}?subject=${encodeURIComponent('Re: your Checkwork enquiry')}&body=${encodeURIComponent(`Hi ${r.name.split(' ')[0]},\n\n`)}`;
                        return (
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
                                <form action={saveNotes.bind(null, r.id)} className="grid gap-2">
                                    <label htmlFor={`notes-${r.id}`} className="text-sm font-medium">Private notes</label>
                                    <textarea id={`notes-${r.id}`} name="notes" rows={2} maxLength={2000} defaultValue={r.notes} className={field} />
                                    <button className="justify-self-start rounded-lg border border-fg/40 px-3 py-2 font-semibold hover:border-fg">Save notes</button>
                                </form>
                                <div className="flex flex-wrap items-center gap-4">
                                    <a href={reply} className="rounded-lg bg-action px-4 py-2 font-semibold text-white hover:bg-action-hover">Reply</a>
                                    <form action={setStatus.bind(null, r.id)} className="flex items-center gap-2">
                                        <label htmlFor={`status-${r.id}`} className="sr-only">Status</label>
                                        <select id={`status-${r.id}`} name="status" defaultValue={r.status} className={field}>
                                            {ENQUIRY_STATUSES.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                        <button className="rounded-lg border border-fg/40 px-3 py-2 font-semibold hover:border-fg">Save status</button>
                                    </form>
                                    <details>
                                        <summary className="cursor-pointer text-fg-muted">Delete</summary>
                                        <form action={deleteEnquiry.bind(null, r.id)} className="mt-2">
                                            <button className="rounded-lg border border-red-400 px-3 py-2 font-semibold text-red-300">Delete {r.name} for good</button>
                                        </form>
                                    </details>
                                </div>
                            </article>
                        );
                    })}
                </Container>
            </Section>
        </>
    );
}
