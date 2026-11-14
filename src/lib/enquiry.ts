import { z } from 'zod';
import { DEALER_NEEDS, INTERESTS, NEEDS, REPLIES, STOCK_SIZES, STOCK_SOURCES } from '@/content/contact';

const optional = (max: number) => z.string().trim().max(max, `Keep this under ${max.toLocaleString('en-IE')} characters.`);
// A choice left unpicked sends nothing, and a tampered one is dropped: either way it reads as "not answered", never an error
const pick = <T extends readonly [string, ...string[]]>(values: T) => z.enum(values).optional().catch(undefined);

export const enquirySchema = z.object({
    name: z.string().trim().min(1, 'Enter your name.').max(100, 'Keep this under 100 characters.'),
    business: optional(100),
    email: z.string().trim().max(254, 'That email address is too long.').pipe(z.email('Enter an email address we can reply to, like name@example.ie.')),
    phone: optional(30),
    need: z.enum(NEEDS, 'Choose what you need.'),
    message: optional(5000),
    reply: z.enum(REPLIES).catch('By email'),
    // The dealer questions. Kept only when the need is a dealer one (see parseEnquiry).
    stock: pick(STOCK_SIZES),
    source: pick(STOCK_SOURCES),
    website: optional(200).optional(), // only on the form while a dealer choice is ticked
    // Unknown boxes are dropped one by one, so a tampered one never costs the real ones
    interests: z.array(z.string()).catch([]).transform(a => [...new Set(a.filter((i): i is (typeof INTERESTS)[number] => (INTERESTS as readonly string[]).includes(i)))]),
    walkthrough: z.literal('yes').optional().catch(undefined),
});

export type EnquiryField = keyof z.infer<typeof enquirySchema>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** What is stored in the `details` column (JSON): how to reply, and the dealer answers when there are any. */
export type EnquiryDetails = {
    reply: (typeof REPLIES)[number];
    stock?: (typeof STOCK_SIZES)[number];
    source?: (typeof STOCK_SOURCES)[number];
    website?: string;
    interests?: (typeof INTERESTS)[number][];
    walkthrough?: boolean;
};

export type EnquiryInput = { name: string; business: string; email: string; phone: string; need: (typeof NEEDS)[number]; message: string; details: EnquiryDetails };

export const isDealerNeed = (need: unknown) => (DEALER_NEEDS as readonly unknown[]).includes(need);

/** Validates raw form data (`interests` is the list of ticked boxes). Every problem is reported at once, the first on each field. */
export function parseEnquiry(raw: Record<string, FormDataEntryValue | FormDataEntryValue[] | null>): { ok: true; data: EnquiryInput } | { ok: false; errors: EnquiryErrors } {
    const result = enquirySchema.safeParse(raw);
    const errors: EnquiryErrors = {};
    if (!result.success) for (const issue of result.error.issues) errors[issue.path[0] as EnquiryField] ??= issue.message;
    // Checked on the raw values, so they show alongside the errors above instead of after them
    const text = (k: string) => (typeof raw[k] === 'string' ? raw[k].trim() : '');
    // The dealer questions can stand in for a message; anything else needs a few lines
    if (!text('message') && !isDealerNeed(raw.need)) errors.message ??= 'Write a few lines about what you need.';
    if (raw.reply === 'A phone call' && !text('phone')) errors.phone ??= 'Add a number so we can call you.';
    if (!result.success || Object.keys(errors).length) return { ok: false, errors };

    const d = result.data;
    const details: EnquiryDetails = {
        reply: d.reply,
        ...(isDealerNeed(d.need) && {
            ...(d.stock && { stock: d.stock }),
            ...(d.source && { source: d.source }),
            ...(d.website && { website: d.website }),
            ...(d.interests.length && { interests: d.interests }),
            ...(d.walkthrough && { walkthrough: true }),
        }),
    };
    return { ok: true, data: { name: d.name, business: d.business, email: d.email, phone: d.phone, need: d.need, message: d.message, details } };
}

/** The details as plain lines, for the alert email and the admin list. Reads stored rows too, so a bad or old value gives no lines. */
export function detailLines(details: Partial<EnquiryDetails> | null | undefined): string[] {
    if (!details || typeof details !== 'object') return [];
    return [
        details.reply && `Reply: ${details.reply}`,
        details.stock && `Stock: ${details.stock}`,
        details.source && `Stock is kept: ${details.source.charAt(0).toLowerCase()}${details.source.slice(1)}`,
        details.website && `Current site: ${details.website}`,
        Array.isArray(details.interests) && details.interests.length && `Interested in: ${details.interests.join(', ')}`,
        details.walkthrough && 'Wants a walkthrough of the demo',
    ].filter((l): l is string => typeof l === 'string');
}
