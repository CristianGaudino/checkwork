import { expect, it } from 'vitest';
import { service, siteGraph } from './schema';

it('the service points at the organisation declared in the site graph', () => {
    const org = siteGraph()['@graph'][0]['@id'];
    expect(service('A', 'B', '/a').provider['@id']).toBe(org);
});


it('the organisation lists no prices: they are given on a call', () => {
    expect(JSON.stringify(siteGraph())).not.toMatch(/Offer|price/i);
});
