import { beforeEach, expect, it, vi } from 'vitest';

const limit = vi.fn();
const insert = vi.fn();
const headerIp = vi.fn();
vi.mock('@opennextjs/cloudflare', () => ({ getCloudflareContext: () => ({ env: { CONTACT_LIMITER: { limit } }, ctx: { waitUntil: vi.fn() } }) }));
vi.mock('next/headers', () => ({ headers: async () => ({ get: () => headerIp() }) }));
vi.mock('@/lib/db', () => ({ getDb: () => ({ insert: () => ({ values: insert }) }) }));
const verify = vi.fn();
vi.mock('@/lib/turnstile', () => ({ verifyTurnstile: (token: string) => verify(token) }));
const { sendEnquiry } = await import('./actions');

const form = () => {
    const f = new FormData();
    for (const [k, v] of Object.entries({ name: 'Ann', business: '', phone: '', email: 'ann@example.ie', need: 'Not sure yet', message: 'Hello', 'cf-turnstile-response': 't' })) f.set(k, v);
    return f;
};

beforeEach(() => { vi.clearAllMocks(); headerIp.mockReturnValue('1.2.3.4'); insert.mockResolvedValue(undefined); verify.mockResolvedValue(true); });

it('stores the enquiry when the IP is within the limit', async () => {
    limit.mockResolvedValue({ success: true });
    expect((await sendEnquiry({ status: 'idle' }, form())).status).toBe('sent');
    expect(insert).toHaveBeenCalledTimes(1);
});

it('refuses with a plain message and stores nothing when the IP is over the limit', async () => {
    limit.mockResolvedValue({ success: false });
    const r = await sendEnquiry({ status: 'idle' }, form());
    expect(r.status).toBe('error');
    expect(r.message).toMatch(/Wait a minute/);
    expect(insert).not.toHaveBeenCalled();
});

it('still stores the enquiry when the limiter itself throws (a dead limiter must not kill the form)', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    limit.mockRejectedValue(new Error('binding gone'));
    expect((await sendEnquiry({ status: 'idle' }, form())).status).toBe('sent');
    expect(insert).toHaveBeenCalledTimes(1);
});

it('skips the limiter when there is no IP (local dev)', async () => {
    headerIp.mockReturnValue(null);
    expect((await sendEnquiry({ status: 'idle' }, form())).status).toBe('sent');
    expect(limit).not.toHaveBeenCalled();
});

it('a failed spam check says JavaScript is needed only when the page never ran its script', async () => {
    limit.mockResolvedValue({ success: true });
    verify.mockResolvedValue(false);
    const noScript = form();
    noScript.set('cf-turnstile-response', '');
    expect((await sendEnquiry({ status: 'idle' }, noScript)).message).toMatch(/^This form needs JavaScript/);
    noScript.set('js', '1'); // the script ran, the check didn't finish
    expect((await sendEnquiry({ status: 'idle' }, noScript)).message).toMatch(/^We couldn’t check that you’re a person/);
    expect(insert).not.toHaveBeenCalled();
});
