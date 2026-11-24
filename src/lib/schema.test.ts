import { expect, it } from 'vitest';
import { service, siteGraph } from './schema';

it('the service points at the organisation declared in the site graph', () => {
    const org = siteGraph()['@graph'][0]['@id'];
    expect(service('A', 'B', '/a').provider['@id']).toBe(org);
});

it('the organisation lists the three dealer plans, priced a month before VAT', () => {
    const offers = siteGraph()['@graph'][0].hasOfferCatalog!.itemListElement;
    expect(offers.map(o => o.itemOffered.name)).toEqual(['Website plan', 'Dashboard plan', 'Website + Dashboard plan']);
    expect(offers.map(o => o.priceSpecification.price)).toEqual([149, 149, 249]);
    expect(offers.every(o => o.priceSpecification.valueAddedTaxIncluded === false)).toBe(true);
    expect(offers[0].description).toContain('€500 setup, none on a 2-year contract');
    expect(offers[1].description).toContain('No setup fee');
});
