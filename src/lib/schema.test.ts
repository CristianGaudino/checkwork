import { expect, it } from 'vitest';
import { breadcrumbs, dealerService, siteGraph } from './schema';

it('breadcrumbs are numbered from 1 with absolute URLs, and the home path has no trailing slash', () => {
    const b = breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }]);
    expect(b.itemListElement.map(i => i.position)).toEqual([1, 2]);
    expect(b.itemListElement[0].item).toMatch(/^https:\/\/[^/]+$/);
    expect(b.itemListElement[1].item).toMatch(/^https:\/\/[^/]+\/work$/);
});

it('the service points at the organisation declared in the site graph', () => {
    const org = siteGraph()['@graph'][0]['@id'];
    expect(dealerService().provider['@id']).toBe(org);
});

it('the organisation lists every service the site offers, including AI', () => {
    const names = siteGraph()['@graph'][0].hasOfferCatalog!.itemListElement.map(o => o.itemOffered.name);
    expect(names).toContain('AI for your business');
    expect(names).toHaveLength(5);
});
