// The contact form's choices. The `need` strings are stored with each enquiry: rename one and old rows keep the old text.
export const NEEDS = [
    'A website for my business',
    'A custom web app',
    'A website for my dealership',
    'Dealer tools (stock, finance, enquiries)',
    'AI features, training or advice',
    'Something else',
] as const;

// One line under each choice, so a visitor can tell them apart without guessing
export const NEED_HINTS: Record<(typeof NEEDS)[number], string> = {
    'A website for my business': 'A new site, or a rebuild of the one you have.',
    'A custom web app': 'Software built around how your business works.',
    'A website for my dealership': 'Stock, car pages and enquiries, like our demo.',
    'Dealer tools (stock, finance, enquiries)': 'Add to the site you have, or the dashboard behind it.',
    'AI features, training or advice': 'AI in your tools, or help for your team to use it.',
    'Something else': 'Tell us what you have in mind.',
};

// The choices that open the dealer questions. `?need=dealer` on the contact page picks the first.
export const DEALER_NEEDS = [NEEDS[2], NEEDS[3]] as const;

export const STOCK_SIZES = ['Under 25 cars', '25 to 75 cars', 'More than 75 cars'] as const;
export const STOCK_SOURCES = ['On DoneDeal', 'In our own system or a spreadsheet', 'On another listing site', 'Not sure'] as const;
export const INTERESTS = [
    'Stock search and car pages',
    'Leads in one place',
    'Test drive booking',
    'Trade-ins with registration lookup',
    'Finance estimator',
    'Reports and margins',
] as const;
export const REPLIES = ['By email', 'A phone call'] as const;

const shot = (name: string) => `/work/dealer-demo/${name}.webp`;

/**
 * What is not working for a dealer today. Picking one shows how the demo answers it (`demo`), worded from the dealer
 * page (content/dealer.ts), never more. `path`: the demo page to try it on; null for the dashboard, which is not public.
 * `show`: the class that reveals the answer while the box is ticked (written out whole, so Tailwind finds it).
 * The labels are stored with each enquiry: rename one and old rows keep the old text.
 */
export const CONCERNS = [
    {
        id: 'stock', label: 'Updating stock takes too long', show: 'group-has-[[data-concern=stock]:checked]:grid',
        demo: { text: 'Keep adding cars on DoneDeal and the site follows it (this needs API access from DoneDeal for your account), or add them in the dashboard and the site changes at once.', src: shot('dash-stock'), alt: 'Demo dealer dashboard stock list with prices, margins and days in stock', path: null },
    },
    {
        id: 'enquiries', label: 'Not enough enquiries from the site', show: 'group-has-[[data-concern=enquiries]:checked]:grid',
        demo: { text: 'Car pages show the photos, the key facts and a monthly estimate, with Enquire, Test drive, Call and WhatsApp in one place.', src: shot('site-car'), alt: 'Demo dealer car page with the price and buttons to enquire and book a test drive', path: '/used-cars/mini-clubman-2019-4710021' },
    },
    {
        id: 'lost', label: 'Enquiries get lost or answered late', show: 'group-has-[[data-concern=lost]:checked]:grid',
        demo: { text: 'Every lead lands in one list, from the website, the phone and social media, with who has it and when to follow up.', src: shot('dash-leads'), alt: 'Demo dealer dashboard list of leads with their status and when they came in', path: null },
    },
    {
        id: 'phones', label: 'Our site is poor on phones', show: 'group-has-[[data-concern=phones]:checked]:grid',
        demo: { text: 'Fast on a mid-range phone.', src: shot('phone-car'), alt: 'The demo dealer site on a phone: a car page', path: '/used-cars' },
    },
    {
        id: 'extras', label: 'No finance or trade-in on the site', show: 'group-has-[[data-concern=extras]:checked]:grid',
        demo: { text: 'A monthly estimate at your lender’s rate with the example you must show, and trade-ins with photos.', src: shot('site-finance'), alt: 'Demo dealer finance estimator showing a monthly payment', path: '/finance' },
    },
    {
        id: 'numbers', label: 'We can’t see what’s working', show: 'group-has-[[data-concern=numbers]:checked]:grid',
        demo: { text: 'Where buyers come from and which sources send leads, plus sales, profit and days to sell by month.', src: shot('dash-analytics'), alt: 'Demo dealer dashboard analytics with visitors each day and where they come from', path: null },
    },
    { id: 'cost', label: 'We pay too much for what we have', show: '', demo: null },
] as const;
export const CONCERN_LABELS = CONCERNS.map(c => c.label);

// How soon: the clearest sign of how warm a lead is
export const TIMINGS = ['As soon as possible', 'In the next few months', 'Just looking for now'] as const;
