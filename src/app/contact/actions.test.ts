import { beforeEach, expect, it, vi } from 'vitest';

const limit = vi.fn();
const insert = vi.fn();
const headerIp = vi.fn();
vi.mock('@opennextjs/cloudflare', () => ({ getCloudflareContext: () => ({ env: { CONTACT_LIMITER: { limit } }, ctx: { waitUntil: vi.fn() } }) }));
vi.mock('next/headers', () => ({ headers: async () => ({ get: () => headerIp() }) }));
vi.mock('@/lib/db', () => ({ getDb: () => ({ insert: () => ({ values: insert }) }) }));
vi.mock('@/lib/turnstile', () => ({ verifyTurnstile: async () => true }));
const { sendEnquiry } = await import('./actions');

const form = () => {
    const f = new FormData();
    for (const [k, v] of Object.entries({ name: 'Ann', business: '', phone: '', email: 'ann@example.ie', need: 'Something else', message: 'Hello', 'cf-turnstile-response': 't' })) f.set(k, v);
    return f;
};

beforeEach(() => { vi.clearAllMocks(); headerIp.mockReturnValue('1.2.3.4'); insert.mockResolvedValue(undefined); });

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
