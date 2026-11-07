'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/access';
import { getDb } from '@/lib/db';
import { ENQUIRY_STATUSES, enquiries } from '@/lib/db/schema';

// Each action checks the owner itself: a server action is a public POST endpoint, not part of the page.
export async function setStatus(id: number, data: FormData) {
    await requireAdmin();
    const status = ENQUIRY_STATUSES.find(s => s === data.get('status'));
    if (!status) return;
    await getDb().update(enquiries).set({ status }).where(eq(enquiries.id, id));
    revalidatePath('/admin');
}

export async function deleteEnquiry(id: number) {
    await requireAdmin();
    await getDb().delete(enquiries).where(eq(enquiries.id, id));
    revalidatePath('/admin');
}
