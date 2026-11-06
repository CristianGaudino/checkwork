'use server';

import { headers } from 'next/headers';
import { getDb } from '@/lib/db';
import { enquiries } from '@/lib/db/schema';
import { type EnquiryErrors, parseEnquiry } from '@/lib/enquiry';
import { verifyTurnstile } from '@/lib/turnstile';

export type ContactState = {
    status: 'idle' | 'sent' | 'error';
    errors?: EnquiryErrors;
    message?: string;
    values?: Record<string, string>;
};

const text = (data: FormData) => Object.fromEntries([...data.entries()].filter((e): e is [string, string] => typeof e[1] === 'string'));

export async function sendEnquiry(_prev: ContactState, data: FormData): Promise<ContactState> {
    // Honeypot: a field people never see. A bot that fills it is told it worked, and nothing is stored.
    if (data.get('company_website')) return { status: 'sent' };

    const values = text(data);
    const parsed = parseEnquiry(values);
    if (!parsed.ok) return { status: 'error', errors: parsed.errors, values };

    const ip = (await headers()).get('cf-connecting-ip') ?? undefined;
    if (!(await verifyTurnstile(String(data.get('cf-turnstile-response') ?? ''), ip))) {
        return { status: 'error', message: 'We could not check that you are a person. Reload the page and try again.', values };
    }

    try {
        await getDb().insert(enquiries).values({ ...parsed.data, business: parsed.data.business || null, phone: parsed.data.phone || null, createdAt: new Date().toISOString() });
    } catch (error) {
        console.error('Could not store enquiry', error);
        return { status: 'error', message: 'Your message did not send. Please try again in a moment.', values };
    }
    return { status: 'sent' };
}
