// The dealer plans (issue #56). Prices are a month, before VAT, from the owner's pricing model (checkwork-demo: docs/sales/pricing-strategy.md
// and src/lib/billing/rules.ts, TIERS). Change them there first, then here. No launch discount: a year upfront and a 2-year contract are the only deals.

const VAT_PCT = 23;

export type Tier = {
    id: 'showroom' | 'dealer' | 'group';
    name: string;
    eur: number;
    branchEur?: number;
    setupEur: number;
    fits: string;
    summary: string; // one line for the home page
    lead: string;
    items: readonly string[];
};

export const TIERS: readonly Tier[] = [
    {
        id: 'showroom',
        name: 'Showroom',
        eur: 249,
        setupEur: 950,
        fits: 'For 30 to 70 cars',
        summary: 'The website, with no dashboard. For 30 to 70 cars.',
        lead: 'Your own website.',
        items: [
            'Your own site, with stock synced from DoneDeal or CarsIreland',
            'Your Google reviews on the site',
            'Enquiries by email, and WhatsApp click to chat',
            'Finance estimator',
            'Trade-ins with 25 reg lookups a month',
            'Car finder for cars you don’t have in stock',
        ],
    },
    {
        id: 'dealer',
        name: 'Dealer',
        eur: 449,
        setupEur: 950,
        fits: 'For 60 to 150 cars',
        summary: 'The website plus the dashboard: leads, WhatsApp alerts, test drives and AI writing. For 60 to 150 cars.',
        lead: 'Everything in Showroom, plus the dashboard.',
        items: [
            'Leads inbox with follow-ups',
            'WhatsApp alerts to your team and confirmations to buyers, 500 a month',
            'Test drive booking',
            'Trade-ins with 100 reg lookups a month',
            'Reply to Google reviews from the dashboard',
            'AI writing, 100 uses a month, including better car descriptions to paste into DoneDeal. Each draft or rewrite is one use',
            'Deposits and sales records',
            'Site analytics: visitors, and which ads bring leads',
            'Staff logins with roles, as many as you need',
        ],
    },
    {
        id: 'group',
        name: 'Group',
        eur: 749,
        branchEur: 149,
        setupEur: 1950,
        fits: '2 or more branches on one site',
        summary: 'Dealer plus margins and reports, social posts, a newsletter and new cars. 2 or more branches on one site.',
        lead: 'Everything in Dealer, plus:',
        items: [
            'Margins and reports',
            'Social posts and ads, with AI writing raised to 300 uses a month',
            'Newsletter and stock alerts',
            'New cars and factory orders for 2 brands',
            'Commercial vehicles',
            'Reg lookups and WhatsApp alerts for each branch',
        ],
    },
];

/** What each plan includes every month. Null: not in that plan. */
export const ALLOWANCES = [
    { label: 'Reg lookups', showroom: '25', dealer: '100', group: '100 a branch' },
    { label: 'WhatsApp alerts', showroom: null, dealer: '500', group: '500 a branch' },
    { label: 'AI writing', showroom: null, dealer: '100', group: '300' },
] as const;

export const ADDONS = [
    { title: 'Commercial vehicles', on: 'any plan', eur: '€29' },
    { title: 'Service and aftersales', on: 'Dealer or Group', eur: '€49', text: 'Service booking and warranty claims, for dealers with a workshop.' },
    { title: 'Margins and reports', on: 'Dealer', eur: '€49' },
    { title: 'New cars', on: 'Dealer', eur: '€99', text: 'New cars and factory orders for up to 2 brands. €400 setup. Each extra brand is €29 a month and €100 setup, on Group too.' },
    { title: 'Social posts and ads', on: 'Dealer', eur: '€99', text: 'With 200 more AI uses a month. €150 setup.' },
    { title: 'Newsletter and stock alerts', on: 'Dealer', eur: '€59' },
] as const;

/** Each use past the allowance, before VAT */
export const USAGE = [
    { title: 'Reg lookup', eur: '€0.30' },
    { title: 'WhatsApp alert or confirmation', eur: '€0.05' },
    { title: 'WhatsApp reply to a buyer', eur: '€0.03' },
    { title: 'WhatsApp marketing message', eur: '€0.12' },
    { title: 'AI writing, Standard', eur: '€0.04' },
    { title: 'AI writing, Premium (the stronger model, if you choose it)', eur: '€0.08' },
] as const;

/** Where extra use stops each month unless the dealer sets a lower limit */
export const LIMITS = [
    { title: 'Reg lookups', eur: '€15' },
    { title: 'WhatsApp', eur: '€20', note: 'per branch on Group' },
    { title: 'AI writing', eur: '€50' },
] as const;

export const TERMS = [
    { title: 'Monthly', text: 'The prices on this page.' },
    { title: 'A year upfront', text: 'Pay for 11 months and get the 12th free.' },
    { title: 'A 2-year contract', text: 'No setup fee.' },
    { title: 'Moving up a plan', text: 'You pay only the difference in setup. Nothing on a 2-year contract.' },
] as const;

export const PRICING_FAQS = [
    { q: 'Do the prices include VAT?', a: `No. Every price on this page is before VAT, which is added at ${VAT_PCT}%.` },
    { q: 'What does the setup fee cover?', a: 'Building your site: your brand and content, connecting your stock, Google profile, WhatsApp and email, and the launch. There is no setup fee on a 2-year contract.' },
    { q: 'Do we keep DoneDeal or CarsIreland?', a: 'Yes. Keep listing there and your site follows your stock, or, on Dealer and Group, keep your stock in the dashboard instead.' },
    { q: 'What happens when we go past the allowance?', a: 'Each extra use is billed at the prices above, up to the monthly limit. At the limit it stops until next month: buyers type their car in themselves instead of a lookup. On Dealer and Group you can set lower limits in the dashboard. On Showroom, ask us.' },
    { q: 'Can we change plan later?', a: 'Yes. Moving up a plan costs only the difference in setup. Add-ons and branches you drop stop from the 1st of the next month.' },
    { q: 'Is there a launch discount?', a: 'No. A year paid upfront gets a month free, and a 2-year contract has no setup fee.' },
    { q: 'Is everything in the demo included?', a: 'Everything in the demo is on offer, in the plan that has it. At setup we connect your own accounts: DoneDeal or CarsIreland, WhatsApp, Google, Facebook and Instagram, and email.' },
] as const;

export const eur = (n: number) => `€${n.toLocaleString('en-IE')}`;
