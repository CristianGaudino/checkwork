import { z } from 'zod';
import { CONCERN_LABELS, NEEDS, NO_NEED, REPLIES, STOCK_SIZES, STOCK_SOURCES, TIMINGS } from '@/content/contact';

// Missing (not on the form) reads as empty, like a field left blank
const blank = <T extends z.ZodType>(schema: T) => z.preprocess(v => v ?? '', schema);
const optional = (max: number) => blank(z.string().trim().max(max, `Keep this under ${max.toLocaleString('en-IE')} characters.`));
// A choice left unpicked sends nothing, and a tampered one is dropped: either way it reads as "not answered", never an error
const pick = <T extends readonly [string, ...string[]]>(values: T) => z.enum(values).optional().catch(undefined);
// Ticked boxes sharing a name: the known ones, once each
const ticked = <T extends string>(values: readonly T[]) =>
    z.array(z.string()).catch([]).transform(a => [...new Set(a.filter((i): i is T => (values as readonly string[]).includes(i)))]);

export const enquirySchema = z.object({
    name: z.string().trim().min(1, 'Enter your name.').max(100, 'Keep this under 100 characters.'),
    business: optional(100),
    // Phone or email, whichever suits: one of them is checked for in parseEnquiry
    email: blank(z.string().trim().max(254, 'That email address is too long.')
        .refine(v => !v || z.email().safeParse(v).success, 'Enter an email address we can reply to, like name@example.ie.')),
    // Often the only way back to them, so it must look like a number we can ring
    phone: optional(30).refine(v => !v || (v.match(/\d/g)?.length ?? 0) >= 7, 'Enter a phone number we can call.'),
    need: z.enum(NEEDS).catch(NO_NEED),
    message: optional(5000),
    // The dealer questions, all optional
    stock: pick(STOCK_SIZES),
    source: pick(STOCK_SOURCES),
    website: optional(200),
    // Unknown boxes are dropped one by one, so a tampered one never costs the real ones
    concerns: ticked(CONCERN_LABELS),
    timing: pick(TIMINGS),
});

export type EnquiryField = keyof z.infer<typeof enquirySchema>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** What is stored in the `details` column (JSON): how to reply, and the dealer answers when there are any. */
export type EnquiryDetails = {
    reply: (typeof REPLIES)[number];
    concerns?: (typeof CONCERN_LABELS)[number][];
    timing?: (typeof TIMINGS)[number];
    stock?: (typeof STOCK_SIZES)[number];
    source?: (typeof STOCK_SOURCES)[number];
    website?: string;
    // Old rows only: asked by the form before the concerns questions
    interests?: string[];
    walkthrough?: boolean;
};

export type EnquiryInput = { name: string; business: string; email: string; phone: string; need: (typeof NEEDS)[number]; message: string; details: EnquiryDetails };

/** Validates raw form data (`concerns` is the list of ticked boxes). Every problem is reported at once, the first on each field. */
export function parseEnquiry(raw: Record<string, FormDataEntryValue | FormDataEntryValue[] | null>): { ok: true; data: EnquiryInput } | { ok: false; errors: EnquiryErrors } {
    const result = enquirySchema.safeParse(raw);
    const errors: EnquiryErrors = {};
    if (!result.success) for (const issue of result.error.issues) errors[issue.path[0] as EnquiryField] ??= issue.message;
    // Checked on the raw values, so they show alongside the errors above instead of after them
    const text = (k: string) => (typeof raw[k] === 'string' ? raw[k].trim() : '');
    // Only a way to reply is needed. No choice made: call when there is only a number, else email
    const phone = text('phone'), email = text('email');
    const reply = (REPLIES as readonly unknown[]).includes(raw.reply) ? raw.reply as (typeof REPLIES)[number] : phone && !email ? 'A phone call' : 'By email';
    if (!phone && !email) errors.phone ??= 'Add a phone number or an email so we can reply.';
    else if (reply === 'A phone call' && !phone) errors.phone ??= 'Add a number so we can call you.';
    else if (reply === 'By email' && !email) errors.email ??= 'Add an email so we can reply, or pick Call me.';
    if (!result.success || Object.keys(errors).length) return { ok: false, errors };

    const d = result.data;
    const details: EnquiryDetails = {
        reply,
        ...(d.concerns.length && { concerns: d.concerns }),
        ...(d.timing && { timing: d.timing }),
        ...(d.stock && { stock: d.stock }),
        ...(d.source && { source: d.source }),
        ...(d.website && { website: d.website }),
    };
    return { ok: true, data: { name: d.name, business: d.business, email: d.email, phone: d.phone, need: d.need, message: d.message, details } };
}

/** The details as plain lines, for the alert email and the admin list. Reads stored rows too, so a bad or old value gives no lines. */
export function detailLines(details: Partial<EnquiryDetails> | null | undefined): string[] {
    if (!details || typeof details !== 'object') return [];
    // What they want fixed and how soon first: what to open the reply with
    return [
        Array.isArray(details.concerns) && details.concerns.length && `Wants to fix: ${details.concerns.join(', ')}`,
        details.timing && `Timing: ${details.timing}`,
        details.reply && `Reply: ${details.reply}`,
        details.stock && `Stock: ${details.stock}`,
        details.source && `Stock is kept: ${details.source.charAt(0).toLowerCase()}${details.source.slice(1)}`,
        details.website && `Current site: ${details.website}`,
        Array.isArray(details.interests) && details.interests.length && `Interested in: ${details.interests.join(', ')}`,
        details.walkthrough && 'Wants a walkthrough of the demo',
    ].filter((l): l is string => typeof l === 'string');
}
