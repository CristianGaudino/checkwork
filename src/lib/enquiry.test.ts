import { expect, it } from 'vitest';
import { parseEnquiry } from './enquiry';

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
