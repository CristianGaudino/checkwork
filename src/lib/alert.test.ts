import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const send = vi.fn();
const waitUntil = vi.fn();
vi.mock('@opennextjs/cloudflare', () => ({ getCloudflareContext: () => ({ env: { EMAIL: { send } }, ctx: { waitUntil } }) }));
const { buildEnquiryAlert, sendEnquiryAlert } = await import('./alert');

const base = { name: 'Ann', business: '', email: 'ann@example.ie', phone: '', need: 'A custom web app' as const, message: 'Hello\nthere' };

beforeEach(() => { send.mockReset(); waitUntil.mockReset(); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

it('builds a text alert with a fixed subject, reply-to the visitor and no empty lines', () => {
    const a = buildEnquiryAlert(base);
    expect(a.subject).toBe('New enquiry: A custom web app');
    expect(a.replyTo).toBe('ann@example.ie');
    expect(a.text).not.toMatch(/Business|Phone/);
    expect(a.text).toContain('Message:\nHello\nthere');
    expect(buildEnquiryAlert({ ...base, business: 'Acme', phone: '087' }).text).toMatch(/Business: Acme[\s\S]*Phone: 087/);
});

it('sends nothing when no ENQUIRY_ALERT_TO secret is set', () => {
    sendEnquiryAlert(base);
    expect(send).not.toHaveBeenCalled();
});

it('sends after the response (waitUntil) to the secret address', () => {
    vi.stubEnv('ENQUIRY_ALERT_TO', 'owner@example.ie');
    send.mockResolvedValue({ messageId: '1' });
    sendEnquiryAlert(base);
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: 'owner@example.ie', replyTo: 'ann@example.ie' }));
    expect(waitUntil).toHaveBeenCalledTimes(1);
});

it('logs a failed send and never throws, so the stored enquiry and the form are unaffected', async () => {
    vi.stubEnv('ENQUIRY_ALERT_TO', 'owner@example.ie');
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    send.mockRejectedValue(new Error('email down'));
    expect(() => sendEnquiryAlert(base)).not.toThrow();
    await waitUntil.mock.calls[0][0];
    expect(log).toHaveBeenCalledWith('Could not send enquiry alert', expect.any(Error));
});
