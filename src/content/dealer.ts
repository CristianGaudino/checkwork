// The car dealer page: what the product does, from the demo dealer site (the checkwork-demo repo). Everything here is built and working in
// the demo. Some need the dealer's own account before they work for real, and say so: DoneDeal's API, a registration lookup service and Google reviews.
// Screenshots are of the demo with its made-up dealer and sample data.

const shot = (name: string) => `/work/dealer-demo/${name}.webp`;

export type TourStop = { id: string; title: string; text: string; path: string; src: string; alt: string };

export const TOUR: { id: 'site' | 'team'; label: string; lead: string; stops: TourStop[] }[] = [
    {
        id: 'site',
        label: 'What buyers see',
        lead: 'The website your customers use, on a phone or a laptop.',
        stops: [
            { id: 'home', title: 'Search from the first screen', text: 'Make, model, body type and price, right on the home page, over a photo of your forecourt.', path: '/', src: shot('site-home'), alt: 'Demo dealer home page with a stock search over a photo of the showroom' },
            { id: 'stock', title: 'Stock that is easy to search', text: 'Filters with live counts, sorting, a grid or a list, and saved cars and compare with no account needed.', path: '/used-cars', src: shot('site-stock'), alt: 'Demo dealer used cars page with filters down the side and car cards' },
            { id: 'car', title: 'Car pages that ask for the sale', text: 'The photos, the key facts and a monthly estimate, with Enquire, Test drive, Call and WhatsApp in one place.', path: '/used-cars/mini-clubman-2019', src: shot('site-car'), alt: 'Demo dealer car page for a MINI Clubman with the price and buttons to enquire and book a test drive' },
            { id: 'trade-in', title: 'Trade-ins with a registration lookup', text: 'With a lookup service connected, the buyer types the reg and the make, model and year fill in. They add photos and get a price back.', path: '/trade-in', src: shot('site-trade-in'), alt: 'Demo dealer trade-in form with a registration looked up to a Kia Sorento' },
            { id: 'finance', title: 'Finance with your wording', text: 'A monthly payment estimate at your lender’s rate, with the representative example you are required to show.', path: '/finance', src: shot('site-finance'), alt: 'Demo dealer finance estimator showing about 296 euro a month' },
        ],
    },
    {
        id: 'team',
        label: 'What your team sees',
        lead: 'The dashboard behind the site, where every lead and car is handled.',
        stops: [
            { id: 'overview', title: 'What needs doing today', text: 'Leads waiting for a reply, test drives to confirm and cars on sale too long, on one screen.', path: '/dashboard', src: shot('dash-overview'), alt: 'Demo dealer dashboard overview with leads each week and a list of what needs attention' },
            { id: 'leads', title: 'Every lead in one place', text: 'From the website, the phone and social media, each with its status, who has it and when to follow up.', path: '/dashboard/leads', src: shot('dash-leads'), alt: 'Demo dealer dashboard list of leads with their status and when they came in' },
            { id: 'lead', title: 'One press to reply', text: 'Call, email or WhatsApp from the lead, add notes, set a follow-up and look up the car they are selling.', path: '/dashboard/leads/1001', src: shot('dash-lead'), alt: 'A lead in the demo dealer dashboard with buttons to call, email or WhatsApp' },
            { id: 'stock', title: 'Stock, prices and margins', text: 'Add cars and photos, drop the price on several at once, and see days in stock and the margin on each.', path: '/dashboard/stock', src: shot('dash-stock'), alt: 'Demo dealer dashboard stock list with prices, margins and days in stock' },
            { id: 'drives', title: 'Test drives booked from the site', text: 'Requests land here to confirm, move, mark done or mark as a no-show.', path: '/dashboard/test-drives', src: shot('dash-drives'), alt: 'Demo dealer dashboard test drives for today and those waiting to be confirmed' },
            { id: 'reports', title: 'Sales and profit by month', text: 'Cars sold, sales, profit and days to sell. Only the people you choose see the margins.', path: '/dashboard/reports', src: shot('dash-reports'), alt: 'Demo dealer dashboard reports with sales by month' },
            { id: 'analytics', title: 'Where buyers come from', text: 'Visitors, the sources that send leads, and how many visitors become one.', path: '/dashboard/analytics', src: shot('dash-analytics'), alt: 'Demo dealer dashboard analytics with visitors each day and where they come from' },
        ],
    },
];

// The rest of what is in the demo, grouped the way a dealer thinks about it
export const FEATURES = [
    { title: 'Selling', items: ['Stock search, compare and saved cars', 'Car pages with photos, facts and a monthly estimate', 'Price alerts when a car drops', 'Find me a car requests', 'New cars, factory orders and commercials with VAT shown'] },
    { title: 'Leads', items: ['Every enquiry stored with the consent it was sent under', 'Status, owner and follow-up dates', 'Test drive booking from the car page', 'Trade-in and sell your car forms with photos', 'Lead emails to the addresses you choose'] },
    { title: 'Running the yard', items: ['Add, edit and hide cars, with photos', 'Or keep your stock on DoneDeal: the site follows it every 15 minutes', 'Deposits and sales, with the buyer and the warranty', 'Prep costs on each car, and the margin after them', 'Several cars at once: price drops, sold, delete', 'An activity history of every change'] },
    { title: 'Customers and aftersales', items: ['A page for each customer and what they bought', 'Warranty cover and claims', 'Service requests from the website', 'Your Google reviews on the site, answered from the dashboard once your Google profile is connected'] },
    { title: 'Your team', items: ['Owner, manager, sales and finance roles', 'Margins and figures only for the people you choose', 'Signed in through your company email'] },
    { title: 'Data and trust', items: ['Data requests: see, export or erase a person’s data', 'Old leads cleared after a set time', 'Spam checks and limits on every form', 'Fast on a mid-range phone'] },
] as const;

export const DEALER_FAQS = [
    { q: 'Can we try it before we talk to you?', a: 'Yes. The demo site is live for anyone to use, with a made-up dealer and sample stock. The dealer dashboard is shown in the screenshots on this page, and we walk you through it on a call.' },
    { q: 'Can our team add and update cars without a developer?', a: 'Yes. Keep adding cars on DoneDeal and the site follows it every 15 minutes, or add them in the dashboard and the site changes at once. Following DoneDeal needs API access from DoneDeal for your account.' },
    { q: 'Where do enquiries go?', a: 'Into the dashboard as leads, by email to the addresses you choose, and on WhatsApp to the phones you link. Each one is stored with the consent it was sent under.' },
    { q: 'Can we show finance on the site?', a: 'Yes. The estimator uses your lender’s rate and the representative example and warnings you are required to show. We never make up rates.' },
    { q: 'Who sees our margins?', a: 'Only the people you choose. Each person has a role, and figures like cost and margin are checked on the server, not just hidden on screen.' },
    { q: 'Does my team need a new app for WhatsApp?', a: 'No. Alerts come to the WhatsApp they already use, from your dealership’s WhatsApp Business number. Each message has a small running cost, and you set the monthly cap.' },
    { q: 'Will buyers get WhatsApp messages they did not ask for?', a: 'No. A buyer gets WhatsApp messages only if they ticked the box on the form; otherwise they get an email, or your team is told to call. Every car page also has a WhatsApp button for buyers who want to message you.' },
    { q: 'Who can act on a WhatsApp alert?', a: 'Only the phones you link to your WhatsApp Business number, and every tap is in the activity log. Past your monthly cap, alerts come by email instead.' },
    { q: 'Will the website rank on Google?', a: 'We set up what Google looks for: speed, page titles, structured data for each car and your local details. No one can promise a ranking, and anyone who does is guessing.' },
] as const;

// WhatsApp, from the demo dashboard (src/lib/whatsapp there). The demo's own wording, with a made-up buyer; in the demo the messages stay
// inside it. `in` is what the phone receives, `out` what its owner sends.
export type ChatLine = { dir: 'in' | 'out'; text: string; photos?: readonly string[]; buttons?: readonly string[] };

const golf = ['/work/dealer-demo/trade-1.webp', '/work/dealer-demo/trade-2.webp', '/work/dealer-demo/trade-3.webp'];

export const TRADE_IN_CHAT: { dealer: readonly ChatLine[]; buyer: readonly ChatLine[] } = {
    dealer: [
        { dir: 'in', text: 'Ciarán wants a price for a trade-in.\nReg 131-D-20456.\n“2013 Golf, 142,000 km, full service history.”', photos: golf, buttons: ['Reply with a price', 'Ask for more photos', 'Not for us'] },
        { dir: 'out', text: 'Reply with a price' },
        { dir: 'in', text: 'What price do you want to offer Ciarán? Type it, like 8,500.' },
        { dir: 'out', text: '6.5k' },
        { dir: 'in', text: 'Done. I sent Ciarán your offer of €6,500 by WhatsApp. I will tell you when they answer.' },
        { dir: 'in', text: 'Ciarán replied: “That sounds good. Could I bring it in on Saturday morning?”', buttons: ['Call back', 'Mark handled'] },
    ],
    buyer: [
        { dir: 'in', text: 'Hi Ciarán, thanks for sending us your car. We have your details and photos, and we will come back to you shortly.' },
        { dir: 'in', text: 'Hi Ciarán, thank you for sending us your car. We can offer you €6,500 for it, subject to seeing it. Reply here and we will book a time for you to bring it in. Checkwork Motors' },
        { dir: 'out', text: 'That sounds good. Could I bring it in on Saturday morning?' },
    ],
};

/** The other WhatsApp alerts, each answered with a tap (the buttons are the demo's) */
export const WHATSAPP_ALERTS = [
    { title: 'New enquiry', text: 'The car and the question. Tap “Yes, it’s available” or “Can you come in Saturday?” and the buyer is answered.' },
    { title: 'Test drive booking', text: 'Confirm it, or suggest another time.' },
    { title: 'A car 60 days in stock', text: 'With a suggested price drop to apply in one tap.' },
    { title: 'New Google review', text: 'Type a reply and it is posted on Google.' },
    { title: 'Finance, service and deposits', text: 'Acknowledge an application, confirm a service slot or a deposit, so nobody waits.' },
    { title: 'The Monday summary', text: 'Last week in a few lines, with a link to the full report.' },
] as const;
