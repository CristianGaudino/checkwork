// The dealer dashboard page (issue #58): one section per job, worded from the site contract (docs/site-contract.md, 3.3) and the
// dashboard itself (checkwork-dash, docs/dealer-admin.md). The connections are set up when a dealer is onboarded (owner, 2026-11-24).
// Screenshots are of the demo dealer, made-up data only. `src: null` is a screen not captured yet: a marked placeholder, listed in #2.

const shot = (name: string) => `/dealer-demo/${name}.webp`;

export type Feature = { id: string; title: string; text: readonly string[]; src: string | null; alt: string };

export const FEATURES: readonly Feature[] = [
    {
        id: 'leads', title: 'Leads and follow-ups',
        text: [
            'Every enquiry from your website, DoneDeal and CarsIreland lands here with the car and what they asked. Each one has an owner and a follow-up date, so nothing waits in someone’s inbox.',
            'Reply in one tap by call, email or WhatsApp, with a first reply already written: the car, its price and its link. Each morning, everyone gets an email of the follow-ups due.',
        ],
        src: shot('dash-leads'), alt: 'Demo dealer dashboard list of leads with their status and when they came in',
    },
    {
        id: 'test-drives', title: 'Test drives',
        text: ['Bookings from the website land here to confirm, move to another time, mark done or mark as a no-show. Times already booked are not offered to the next buyer.'],
        src: shot('dash-drives'), alt: 'Demo dealer dashboard test drives for today and those waiting to be confirmed',
    },
    {
        id: 'stock', title: 'Stock',
        text: [
            'Days in stock on every car, and a suggested price drop on cars that have been on sale too long. We set the number of days and the drop with you.',
            'Add cars and photos here, or let them come from DoneDeal or CarsIreland. Change the price of several cars at once.',
        ],
        src: shot('dash-stock'), alt: 'Demo dealer dashboard stock list with prices, margins and days in stock',
    },
    {
        id: 'margins', title: 'Sales, margins and prep costs',
        text: [
            'Record each sale with the buyer, the warranty and any trade-in. Add prep costs, like a valet, tyres or the NCT, and see the margin after them.',
            'Only the people you choose see costs and margins. Export your sales for your accountant.',
        ],
        src: null, alt: 'A car in the demo dealer dashboard with its prep costs and margin',
    },
    {
        id: 'reviews', title: 'Reviews',
        text: [
            'Your Google reviews in one list, the low ones first. Reply from the dashboard. After a sale, ask the buyer for a review in one tap.',
            'We connect your Google Business Profile when we set you up.',
        ],
        src: null, alt: 'Demo dealer dashboard reviews with the low ratings first',
    },
    {
        id: 'customers', title: 'Customers and reminders',
        text: [
            'A page for each customer with what they bought and its warranty, and any warranty claims.',
            'Buyers who agreed to hear from you get a reminder 30 days before their NCT is due, and when a service is due.',
        ],
        src: null, alt: 'A customer in the demo dealer dashboard with their purchase and NCT due date',
    },
    {
        id: 'reports', title: 'Reports and the monthly report',
        text: [
            'Sales, profit, days to sell and which lead sources bring buyers, month by month. With the website, where visitors come from.',
            'On the 1st of each month, a summary of the month before by email. A salesperson sees only their own figures.',
        ],
        src: shot('dash-reports'), alt: 'Demo dealer dashboard reports with sales by month',
    },
    {
        id: 'history', title: 'Reg lookup and history check',
        text: ['Staff look a car up from its reg to fill in the make, model and year. A history check shows finance owed, a write-off, mileage that does not add up, an import, the number of owners and the NCT date.'],
        src: null, alt: 'A history check on a car in the demo dealer dashboard',
    },
];

export const DASHBOARD_FAQS = [
    { q: 'Can we see it before we sign up?', a: 'Yes. We show you the dashboard on a call, with a made-up dealer and sample data.' },
    { q: 'Do we need the website too?', a: 'No. The dashboard works on its own. Enquiries from DoneDeal and CarsIreland come into it, as well as those from a Checkwork website.' },
    { q: 'Who sees our margins?', a: 'Only the people you choose. Without the right role, costs and margins never reach their screen.' },
    { q: 'Does it work on a phone?', a: 'Yes. Add it to your home screen and it opens like an app, with notifications. On an iPhone this needs iOS 16.4 or later.' },
    { q: 'Will buyers get WhatsApp messages they did not ask for?', a: 'No. A buyer gets WhatsApp messages only if they ticked the box on the form. Otherwise they get an email, or your team is told to call.' },
    { q: 'What happens past the allowance?', a: 'Each extra lookup or WhatsApp message is billed at the price on the pricing page, and history checks are paid per check, up to a monthly limit you can set. At the limit it stops until the next month.' },
] as const;

// WhatsApp, from the demo dashboard (checkwork-dash, src/lib/whatsapp). The demo's own wording, with a made-up buyer; in the demo the
// messages stay inside it. `in` is what the phone receives, `out` what its owner sends.
export type ChatLine = { dir: 'in' | 'out'; text: string; photos?: readonly string[]; buttons?: readonly string[] };

const golf = ['/dealer-demo/trade-1.webp', '/dealer-demo/trade-2.webp', '/dealer-demo/trade-3.webp'];

export const TRADE_IN_CHAT: readonly ChatLine[] = [
    { dir: 'in', text: 'Ciarán wants a price for a trade-in.\nReg 131-D-20456.\n“2013 Golf, 142,000 km, full service history.”', photos: golf, buttons: ['Reply with a price', 'Ask for more photos', 'Not for us'] },
    { dir: 'out', text: 'Reply with a price' },
    { dir: 'in', text: 'What price do you want to offer Ciarán? Type it, like 8,500.' },
    { dir: 'out', text: '6.5k' },
    { dir: 'in', text: 'Done. I sent Ciarán your offer of €6,500 by WhatsApp. I will tell you when they answer.' },
    { dir: 'in', text: 'Ciarán replied: “That sounds good. Could I bring it in on Saturday morning?”', buttons: ['Call back', 'Mark handled'] },
];
