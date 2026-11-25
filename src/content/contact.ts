// The contact form's choices. The `need` strings are stored with each enquiry: rename one and old rows keep the old text, which the admin
// list shows as it is (rows from before #58 have the old plans, such as 'The website', and before #56 the agency choices).
export const NEEDS = ['The website', 'The dashboard', 'Both', 'Not sure yet'] as const;

// One line under each choice, so a visitor can tell them apart without guessing
export const NEED_HINTS: Record<(typeof NEEDS)[number], string> = {
    'The website': 'Your own site on your stock, with finance, trade-ins and test drive requests.',
    'The dashboard': 'Leads, stock, sales, margins and customers.',
    'Both': 'The site and the dashboard, with every enquiry in the dashboard.',
    'Not sure yet': 'We can work it out on a call.',
};

// Stored when nothing is picked: only a name and a way to reply are required
export const NO_NEED = 'Not sure yet' satisfies (typeof NEEDS)[number];

// What `?need=<plan id>` on the contact page ticks: the product pages' Talk to us links, and the old plan ids
// (Showroom, Dealer, Group) so links from before #58 still tick the choice that replaced them
export const PLAN_NEEDS: Record<string, (typeof NEEDS)[number]> = {
    website: 'The website',
    dashboard: 'The dashboard',
    both: 'Both',
    showroom: 'The website',
    dealer: 'Both',
    group: 'Both',
};

// The plans are flat (#58), so this is only to know the yard. Old rows keep the old sizes; a stored value is shown as it is.
export const STOCK_SIZES = ['Under 30 cars', '30 to 80 cars', 'More than 80 cars', 'Not sure'] as const;
export const STOCK_SOURCES = ['On DoneDeal', 'On CarsIreland', 'On another listing site', 'In our own system or a spreadsheet', 'Not sure'] as const;
// Stored values; the form shows REPLY_LABELS. A call needs a phone number, email an email address.
export const REPLIES = ['A phone call', 'By email'] as const;
export const REPLY_LABELS: Record<(typeof REPLIES)[number], string> = { 'A phone call': 'Call me', 'By email': 'Email me' };

const shot = (name: string) => `/dealer-demo/${name}.webp`;

/**
 * What is not working for a dealer today. Picking one shows how the demo answers it (`demo`), worded from the dealer
 * page (content/dealer.ts), never more. `path`: the demo page to try it on; null for the dashboard, which is not public.
 * `show`: the class that reveals the answer while the box is ticked (written out whole, so Tailwind finds it).
 * The labels are stored with each enquiry: rename one and old rows keep the old text.
 */
export const CONCERNS = [
    {
        id: 'stock', label: 'Updating stock takes too long', show: 'group-has-[[data-concern=stock]:checked]:grid',
        demo: { text: 'Keep listing cars on DoneDeal or CarsIreland and the website follows it. Or, with the dashboard, keep your stock there instead of DoneDeal or CarsIreland, and the website changes at once.', src: shot('dash-stock'), alt: 'Demo dealer dashboard stock list with prices, margins and days in stock', path: null },
    },
    {
        id: 'enquiries', label: 'Not enough enquiries from the site', show: 'group-has-[[data-concern=enquiries]:checked]:grid',
        demo: { text: 'Car pages show the photos, the key facts and a monthly estimate, with Enquire, Call and WhatsApp in one place. Buyers can ask for a test drive, and the request comes to you by email.', src: shot('site-car'), alt: 'Demo dealer car page with the price and buttons to enquire and book a test drive', path: '/used-cars/mini-clubman-2019-4710021' },
    },
    {
        id: 'lost', label: 'Enquiries get lost or answered late', show: 'group-has-[[data-concern=lost]:checked]:grid',
        demo: { text: 'Every enquiry from the website lands in one list, with who has it and when to follow up.', src: shot('dash-leads'), alt: 'Demo dealer dashboard list of leads with their status and when they came in', path: null },
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
    { id: 'other', label: 'Something else', show: '', demo: null },
] as const;
export const CONCERN_LABELS = CONCERNS.map(c => c.label);

// How soon: the clearest sign of how warm a lead is
export const TIMINGS = ['As soon as possible', 'In the next few months', 'Just looking for now', 'Not sure'] as const;
