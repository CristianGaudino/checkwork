import { expect, it } from 'vitest';
import { detailLines, parseEnquiry } from './enquiry';

const valid = { name: ' Aoife ', business: '', email: 'aoife@example.ie', phone: '', need: 'Something else', message: 'Hello' };

it('accepts a valid enquiry and trims it', () => {
    const r = parseEnquiry(valid);
    expect(r.ok && r.data.name).toBe('Aoife');
});

it('reports each bad field once, with a plain message', () => {
    const r = parseEnquiry({ ...valid, name: '  ', email: 'nope', need: 'Hack', message: 'x'.repeat(5001) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(['email', 'message', 'name', 'need']);
});

it('treats a missing field (no form value) as an error, not a crash', () => {
    expect(parseEnquiry({ ...valid, name: null }).ok).toBe(false);
});

const dealer = { ...valid, need: 'A website for my dealership', message: '', reply: 'By email', stock: '25 to 75 cars', source: 'On DoneDeal', website: 'www.example.ie', concerns: ['Our site is poor on phones', 'Our site is poor on phones', 'Hack'], timing: 'In the next few months' };

it('keeps the dealer answers for a dealer, without needing a message', () => {
    const r = parseEnquiry(dealer);
    expect(r.ok && r.data.details).toEqual({ reply: 'By email', concerns: ['Our site is poor on phones'], timing: 'In the next few months', stock: '25 to 75 cars', source: 'On DoneDeal', website: 'www.example.ie' });
});

it('drops the dealer answers when the need is not a dealer one, and still asks for a message', () => {
    expect(parseEnquiry({ ...dealer, need: 'Something else' }).ok).toBe(false);
    const r = parseEnquiry({ ...dealer, need: 'Something else', message: 'Hi' });
    expect(r.ok && r.data.details).toEqual({ reply: 'By email' });
});

it('needs a phone number for a call, and reports it with the other errors at once', () => {
    const r = parseEnquiry({ ...dealer, reply: 'A phone call', name: '' });
    expect(!r.ok && Object.keys(r.errors).sort()).toEqual(['name', 'phone']);
    expect(parseEnquiry({ ...dealer, reply: 'A phone call', phone: '087 000 0000' }).ok).toBe(true);
    expect(parseEnquiry({ ...dealer, reply: 'A call with a demo walkthrough' }).ok).toBe(false);
});

it('offers the demo walkthrough to dealers only: anyone else asking gets a phone call', () => {
    const withPhone = { ...dealer, reply: 'A call with a demo walkthrough', phone: '087' };
    const a = parseEnquiry(withPhone), b = parseEnquiry({ ...withPhone, need: 'Something else', message: 'Hi' });
    expect(a.ok && a.data.details.reply).toBe('A call with a demo walkthrough');
    expect(b.ok && b.data.details.reply).toBe('A phone call');
});

it('treats an unknown or tampered choice as not answered', () => {
    const r = parseEnquiry({ ...dealer, stock: 'Thousands', source: null, reply: 'Fax', timing: 'Yesterday', concerns: 'not a list' });
    expect(r.ok && r.data.details).toEqual({ reply: 'By email', website: 'www.example.ie' });
});

it('reads stored details as lines, and gives none for an old or broken row', () => {
    expect(detailLines({ reply: 'By email', website: 'x.ie' })).toEqual(['Reply: By email', 'Current site: x.ie']);
    // What they want fixed and how soon come first
    expect(detailLines({ reply: 'By email', concerns: ['Our site is poor on phones', 'We pay too much for what we have'], timing: 'As soon as possible' }))
        .toEqual(['Wants to fix: Our site is poor on phones, We pay too much for what we have', 'Timing: As soon as possible', 'Reply: By email']);
    expect(detailLines(null)).toEqual([]);
    expect(detailLines('nonsense' as never)).toEqual([]);
    expect(detailLines({ interests: 'not a list' } as never)).toEqual([]);
});

it('ignores a bad website left in the hidden dealer box once the visitor picks something else', () => {
    expect(parseEnquiry({ ...dealer, need: 'Something else', message: 'Hi', website: 'x'.repeat(300) }).ok).toBe(true);
    expect(parseEnquiry({ ...dealer, website: 'x'.repeat(300) }).ok).toBe(false);
});
