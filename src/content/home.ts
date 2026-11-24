// The home page (issue #58): the two products, how a lead reaches the dealer, and how setup goes. Worded from the site contract
// (docs/site-contract.md, 3.1): only what the products do.

export const PRODUCTS = [
    {
        id: 'website',
        title: 'Dealer website',
        text: 'Your own site, in your name and colours, on your stock. Buyers search, ask for a test drive, work out finance and send their car for a trade-in.',
        link: 'About the website',
        src: '/dealer-demo/site-home.webp',
        phone: '/dealer-demo/phone-stock.webp',
        alt: 'The demo dealer website: a stock search over a photo of the showroom',
    },
    {
        id: 'dashboard',
        title: 'Dealer dashboard',
        text: 'Leads, test drives, stock, sales, margins, reviews and customers. On a laptop in the office or a phone on the yard.',
        link: 'About the dashboard',
        src: '/dealer-demo/dash-overview.webp',
        alt: 'The demo dealer dashboard overview: leads each week and what needs attention',
    },
] as const;

/** A lead's path, from the car page to the team's phones */
export const LEAD_PATH = [
    { title: 'A buyer gets in touch', text: 'On a car page: Enquire, Test drive, Call or WhatsApp.' },
    { title: 'It lands in your dashboard', text: 'With the car, what they asked and how they want a reply.' },
    { title: 'Your team hears at once', text: 'A notification on their phone, an email, or a WhatsApp message.' },
] as const;

/** How a dealer gets set up, from the first call to going live */
export const STEPS = [
    { title: 'Talk to us', text: 'A short call about your yard, your stock and how leads reach you now.' },
    { title: 'See it working', text: 'Try the demo website yourself. We show you the dashboard on a call.' },
    { title: 'Connect your accounts', text: 'We connect your DoneDeal or CarsIreland account, your Google Business Profile and your WhatsApp Business number.' },
    { title: 'Go live', text: 'We build the site in your brand, check it on phones and launch it. Then we stay on for changes and support.' },
] as const;
