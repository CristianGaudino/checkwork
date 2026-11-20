import { expect, it } from 'vitest';
import { detailLines, parseEnquiry } from './enquiry';

const valid = { name: ' Aoife ', business: '', email: 'aoife@example.ie', phone: '', need: 'Not sure yet', message: 'Hello' };

it('accepts a valid enquiry and trims it', () => {
    const r = parseEnquiry(valid);
    expect(r.ok && r.data.name).toBe('Aoife');
});

it('reports each bad field once, with a plain message', () => {
    const r = parseEnquiry({ ...valid, name: '  ', email: 'nope', message: 'x'.repeat(5001) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(['email', 'message', 'name']);
});

it('needs only a name and a phone number or email; no need picked reads as not sure', () => {
    const bare = { name: 'Aoife', email: '', phone: '' };
    const none = parseEnquiry(bare);
    expect(!none.ok && none.errors).toEqual({ phone: 'Add a phone number or an email so we can reply.' });
    // A number alone means call; an email alone means email
    const call = parseEnquiry({ ...bare, phone: '087 000 0000' }), mail = parseEnquiry({ ...bare, email: 'a@example.ie', need: 'Hack' });
    expect(call.ok && [call.data.need, call.data.details.reply]).toEqual(['Not sure yet', 'A phone call']);
    expect(mail.ok && [mail.data.need, mail.data.details.reply]).toEqual(['Not sure yet', 'By email']);
    // The only way back must be a number we can ring
    const typo = parseEnquiry({ ...bare, phone: '087' });
    expect(!typo.ok && typo.errors).toEqual({ phone: 'Enter a phone number we can call.' });
    // Asked for email with only a number
    const r = parseEnquiry({ ...bare, phone: '087 000 0000', reply: 'By email' });
    expect(!r.ok && Object.keys(r.errors)).toEqual(['email']);
});

it('treats a missing field (no form value) as an error, not a crash', () => {
    expect(parseEnquiry({ ...valid, name: null }).ok).toBe(false);
});

const dealer = { ...valid, need: 'A website for my dealership', message: '', reply: 'By email', stock: '25 to 75 cars', source: 'On DoneDeal', website: 'www.example.ie', concerns: ['Our site is poor on phones', 'Our site is poor on phones', 'Hack'], timing: 'In the next few months' };

it('keeps the dealer answers for a dealer, without needing a message', () => {
    const r = parseEnquiry(dealer);
    expect(r.ok && r.data.details).toEqual({ reply: 'By email', concerns: ['Our site is poor on phones'], timing: 'In the next few months', stock: '25 to 75 cars', source: 'On DoneDeal', website: 'www.example.ie' });
});

it('keeps the dealer answers whatever the need, and reads a removed need as not sure', () => {
    const r = parseEnquiry({ ...dealer, need: 'A custom web app' });
    expect(r.ok && [r.data.need, r.data.details.stock]).toEqual(['Not sure yet', '25 to 75 cars']);
});

it('needs a phone number for a call, and reports it with the other errors at once', () => {
    const r = parseEnquiry({ ...dealer, reply: 'A phone call', name: '' });
    expect(!r.ok && Object.keys(r.errors).sort()).toEqual(['name', 'phone']);
    expect(parseEnquiry({ ...dealer, reply: 'A phone call', phone: '087 000 0000' }).ok).toBe(true);
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

it('reports a website address that is too long', () => {
    const r = parseEnquiry({ ...dealer, website: 'x'.repeat(300) });
    expect(!r.ok && Object.keys(r.errors)).toEqual(['website']);
});
