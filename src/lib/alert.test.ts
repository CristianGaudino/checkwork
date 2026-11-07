import { expect, it } from 'vitest';
import { buildEnquiryAlert } from './alert';

const base = { name: 'Ann', business: '', email: 'ann@example.ie', phone: '', need: 'A custom web app' as const, message: 'Hello\nthere' };

it('builds a text alert with a fixed subject, reply-to the visitor and no empty lines', () => {
    const a = buildEnquiryAlert(base);
    expect(a.subject).toBe('New enquiry: A custom web app');
    expect(a.replyTo).toBe('ann@example.ie');
    expect(a.text).not.toMatch(/Business|Phone/);
    expect(a.text).toContain('Message:\nHello\nthere');
    expect(buildEnquiryAlert({ ...base, business: 'Acme', phone: '087' }).text).toMatch(/Business: Acme[\s\S]*Phone: 087/);
});
