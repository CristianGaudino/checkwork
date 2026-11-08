import { beforeEach, expect, it, vi } from 'vitest';

// Server actions are public POST endpoints: each must check the owner before it touches the database.
const requireAdmin = vi.fn();
const where = vi.fn();
const set = vi.fn(() => ({ where }));
const db = { update: vi.fn(() => ({ set })), delete: vi.fn(() => ({ where })) };
vi.mock('@/lib/access', () => ({ requireAdmin: () => requireAdmin() }));
vi.mock('@/lib/db', () => ({ getDb: () => db }));
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
const { deleteEnquiry, saveNotes, setStatus } = await import('./actions');

const form = (entries: Record<string, string>) => {
    const f = new FormData();
    for (const [k, v] of Object.entries(entries)) f.set(k, v);
    return f;
};

beforeEach(() => { vi.clearAllMocks(); requireAdmin.mockResolvedValue('owner@example.ie'); });

it('does nothing to the database when the visitor is not the owner', async () => {
    requireAdmin.mockRejectedValue(new Error('NEXT_NOT_FOUND'));
    await expect(deleteEnquiry(1)).rejects.toThrow();
    await expect(setStatus(1, form({ status: 'won' }))).rejects.toThrow();
    await expect(saveNotes(1, form({ notes: 'x' }))).rejects.toThrow();
    expect(db.update).not.toHaveBeenCalled();
    expect(db.delete).not.toHaveBeenCalled();
});

it('ignores a status that is not one of the known ones', async () => {
    await setStatus(1, form({ status: 'hacked' }));
    expect(db.update).not.toHaveBeenCalled();
    await setStatus(1, form({ status: 'won' }));
    expect(set).toHaveBeenCalledWith({ status: 'won' });
});

it('trims notes and caps them at 2,000 characters', async () => {
    await saveNotes(1, form({ notes: `  ${'a'.repeat(2500)}  ` }));
    expect(set).toHaveBeenCalledWith({ notes: 'a'.repeat(2000) });
});
