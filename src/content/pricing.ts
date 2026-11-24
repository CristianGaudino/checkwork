// The dealer plans (issue #58). Prices are a month, before VAT, for one dealership, from the owner's pricing (checkwork-dash:
// docs/decisions.md, Pricing, and src/lib/billing/rules.ts, PLANS). Change them there first, then here. The first month free and the
// 12-month price lock for first dealers are contract terms and stay off the site (owner, 2026-11-24), as does the Social and ads add-on.

const VAT_PCT = 23;

export type Tier = {
    id: 'website' | 'dashboard' | 'both';
    /** Ids of the old plans (Showroom, Dealer, Group) whose links should still land on this card */
    oldIds: readonly string[];
    name: string;
    eur: number;
    setupEur: number;
    summary: string; // one line for the home page
    lead: string;
    items: readonly string[];
};

export const TIERS: readonly Tier[] = [
    {
        id: 'website',
        oldIds: ['showroom'],
        name: 'Website',
        eur: 149,
        setupEur: 500,
        summary: 'Your own site on your stock.',
        lead: 'Your own website.',
        items: [
            'Your own site on your DoneDeal or CarsIreland stock',
            'Car pages with enquire, call and WhatsApp',
            'Test drive requests, sent to you by email',
            'Finance estimator with your lender’s wording',
            'Trade-in and sell your car',
            'Find me a car',
            'Vans with prices before VAT',
            'Your Google reviews',
            'Enquiries by email',
        ],
    },
    {
        id: 'dashboard',
        oldIds: [],
        name: 'Dashboard',
        eur: 149,
        setupEur: 0,
        summary: 'Leads, stock, sales and customers.',
        lead: 'Everything to run the yard.',
        items: [
            'Leads and follow-ups',
            'Alerts on your phone, and on WhatsApp',
            'Test drives',
            'Stock with days in stock and suggested price drops',
            'Sales, margins and prep costs',
            'Reviews, with replies',
            'Customers with NCT and service reminders',
            'Reports and the monthly report',
            'Reg lookup and history check for staff',
            'AI writing',
            'Logins for your whole team, each with a role',
        ],
    },
    {
        id: 'both',
        oldIds: ['dealer', 'group'],
        name: 'Website + Dashboard',
        eur: 249,
        setupEur: 500,
        summary: 'Both, with every enquiry in the dashboard.',
        lead: 'Both, working together.',
        items: ['Everything in Website and Dashboard', 'Every enquiry from your website in the dashboard'],
    },
];

/** The plan card lifted out as the light sheet. No label says so (owner, 2026-11-24). */
export const PICK: Tier['id'] = 'both';

/** What each plan includes every month. Null: not in that plan. */
export const ALLOWANCES = [
    { label: 'Reg lookups', website: null, dashboard: '100', both: '100' },
    { label: 'WhatsApp alerts and confirmations', website: null, dashboard: '500', both: '500' },
    { label: 'History checks', website: null, dashboard: 'Paid per check', both: 'Paid per check' },
    { label: 'AI writing', website: null, dashboard: 'Included', both: 'Included' },
] as const;

/** Each use past the allowance, before VAT (checkwork-dash UNIT_PRICE_EUR). No history check price on the site (owner, 2026-11-24). */
export const USAGE = [
    { title: 'Reg lookup', eur: '€0.30' },
    { title: 'WhatsApp alert or confirmation', eur: '€0.05' },
    { title: 'WhatsApp reply to a buyer or review request', eur: '€0.03' },
    { title: 'WhatsApp NCT or service reminder', eur: '€0.12' },
] as const;

/** Where extra use stops each month unless the dealer sets a lower limit (checkwork-dash DEFAULT_CEILINGS). A cap, never a price per use. */
export const LIMITS = [
    { title: 'Reg lookups', eur: '€15' },
    { title: 'History checks', eur: '€25' },
    { title: 'WhatsApp', eur: '€20' },
] as const;

export const TERMS = [
    { title: 'A 1-year contract', text: 'The monthly price, and €500 setup for a plan with the website.' },
    { title: 'A 2-year contract', text: 'The monthly price, with no setup fee.' },
] as const;

export const PRICING_FAQS = [
    { q: 'Do the prices include VAT?', a: `No. Every price on this page is before VAT, which is added at ${VAT_PCT}%.` },
    { q: 'What does the setup fee cover?', a: 'Building your website: your brand and content, connecting your stock, your Google listing, WhatsApp and email, and the launch. The dashboard alone has no setup fee.' },
    { q: 'Does the price go up with more cars?', a: 'No. The plans are flat for one dealership, whatever your stock.' },
    { q: 'We have more than one branch.', a: 'Talk to us. The plans are for one dealership for now.' },
    { q: 'What happens at the monthly limit?', a: 'That service stops until the next month. Staff type the car’s details in, and WhatsApp alerts go by email instead.' },
    { q: 'Are DoneDeal or CarsIreland fees included?', a: 'No. You keep your own account with them and pay them as now.' },
] as const;

export const eur = (n: number) => `€${n.toLocaleString('en-IE')}`;

/** The setup line under a plan's price */
export const setupLine = (t: Tier) => (t.setupEur ? `${eur(t.setupEur)} setup, none on a 2-year contract.` : 'No setup fee.');

/** The setup terms in one line, from the plans: "€500 setup for a plan with the website, none on a 2-year contract." */
export const SETUP_SUMMARY = `${eur(Math.max(...TIERS.map(t => t.setupEur)))} setup for a plan with the website, none on a 2-year contract.`;
