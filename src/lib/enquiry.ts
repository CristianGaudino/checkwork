import { z } from 'zod';
import { NEEDS } from '@/content/contact';

const optional = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters.`);

export const enquirySchema = z.object({
    name: z.string().trim().min(1, 'Enter your name.').max(100, 'Keep this under 100 characters.'),
    business: optional(100),
    email: z.string().trim().max(254, 'That email address is too long.').pipe(z.email('Enter an email address we can reply to, like name@example.ie.')),
    phone: optional(30),
    need: z.enum(NEEDS, 'Choose what you need.'),
    message: z.string().trim().min(1, 'Write a few lines about what you need.').max(5000, 'Keep this under 5,000 characters.'),
});

export type EnquiryField = keyof z.infer<typeof enquirySchema>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** Validates raw form data. The first problem on each field wins. */
export function parseEnquiry(raw: Record<string, FormDataEntryValue | null>) {
    const result = enquirySchema.safeParse(raw);
    if (result.success) return { ok: true as const, data: result.data };
    const errors: EnquiryErrors = {};
    for (const issue of result.error.issues) errors[issue.path[0] as EnquiryField] ??= issue.message;
    return { ok: false as const, errors };
}

export type EnquiryInput = z.infer<typeof enquirySchema>;
