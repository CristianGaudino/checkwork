import { expect, it } from 'vitest';
import { service, siteGraph } from './schema';

it('the service points at the organisation declared in the site graph', () => {
    const org = siteGraph()['@graph'][0]['@id'];
    expect(service('A', 'B', '/a').provider['@id']).toBe(org);
});

it('the organisation lists the three dealer plans, priced a month before VAT', () => {
    const offers = siteGraph()['@graph'][0].hasOfferCatalog!.itemListElement;
    expect(offers.map(o => o.itemOffered.name)).toEqual(['Showroom plan', 'Dealer plan', 'Group plan']);
    expect(offers.map(o => o.priceSpecification.price)).toEqual([249, 449, 749]);
    expect(offers.every(o => o.priceSpecification.valueAddedTaxIncluded === false)).toBe(true);
    expect(offers[2].description).toContain('€149 a month for each branch after the first');
});
