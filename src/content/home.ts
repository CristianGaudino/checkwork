// The home page (issue #56): what a dealer gets, each the answer to a common problem. Every line is built in the demo (checkwork-demo), and
// says so when it needs more than the Showroom plan (content/pricing.ts). `problem` is a plain statement, never a quote: no invented dealers.

export const GETS = [
    {
        id: 'site',
        problem: 'Your cars sit on DoneDeal next to everyone else’s.',
        title: 'Your own site, on your own stock',
        text: 'A site in your name and your colours, on the stock you already list. Keep listing on DoneDeal or CarsIreland and the site follows it.',
    },
    {
        id: 'reviews',
        problem: 'Your Google reviews aren’t on your own site.',
        title: 'Your Google reviews on your site',
        text: 'They show on the site, straight from your public Google listing. On Dealer and Group you reply to them from the dashboard.',
    },
    {
        id: 'trade-in',
        problem: 'Valuing a trade-in takes a phone call.',
        title: 'Trade-ins with a reg lookup',
        text: 'The buyer types the reg, the make, model and year fill in, and they add photos. You reply with a price.',
    },
    {
        id: 'leads',
        problem: 'Leads get lost in someone’s email.',
        title: 'Every lead in one inbox',
        text: 'On Dealer and Group, every enquiry lands in one inbox with who has it and when to follow up, and reaches your team’s phones on WhatsApp.',
    },
] as const;

/** How a dealer gets set up, from the first call to going live */
export const STEPS = [
    { title: 'Try the demo', text: 'Use the demo site yourself, then we walk you through the dashboard on a call.' },
    { title: 'Pick a plan', text: 'Showroom, Dealer or Group, with any add-ons. You see the price before you agree to anything.' },
    { title: 'Connect your accounts', text: 'We connect the accounts your plan uses: DoneDeal or CarsIreland, Google, WhatsApp, email, and Facebook and Instagram for social posts.' },
    { title: 'Go live', text: 'We build the site in your brand on your stock, check it on phones and launch it. Then we stay on for changes and support.' },
] as const;
