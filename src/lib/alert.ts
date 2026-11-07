import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { EnquiryInput } from '@/lib/enquiry';
import { ENQUIRY_ALERT_FROM } from '@/lib/config';

/** Plain text only, so nothing a visitor typed can inject markup. The subject uses the validated `need` only, never free text. */
export function buildEnquiryAlert(e: EnquiryInput) {
    const lines = [
        `Name: ${e.name}`,
        e.business && `Business: ${e.business}`,
        `Email: ${e.email}`,
        e.phone && `Phone: ${e.phone}`,
        `Needs: ${e.need}`,
        `Message:\n${e.message}`,
    ];
    return { subject: `New enquiry: ${e.need}`, text: lines.filter(Boolean).join('\n\n'), replyTo: e.email };
}

/**
 * Tells the owner a new enquiry arrived. Never throws: the enquiry is already stored, so a failed email is logged and nothing else.
 * No ENQUIRY_ALERT_TO secret means alerts are off (local dev, e2e).
 */
export async function sendEnquiryAlert(e: EnquiryInput): Promise<void> {
    const to = process.env.ENQUIRY_ALERT_TO;
    if (!to) return;
    try {
        await getCloudflareContext().env.EMAIL.send({ to, from: ENQUIRY_ALERT_FROM, ...buildEnquiryAlert(e) });
    } catch (error) {
        console.error('Could not send enquiry alert', error);
    }
}
