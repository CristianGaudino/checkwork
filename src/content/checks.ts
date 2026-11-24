// The launch checklist on the home page. Each check is in the Website plan (content/pricing.ts), so it is a promise: keep only what every
// dealer website gets. No reg lookup here: the website takes the reg as typed, the lookup is the dashboard's (checkwork-dash #182).
export const CHECKS = [
    { title: 'Your stock on it', text: 'From your DoneDeal or CarsIreland account.' },
    { title: 'Your reviews on it', text: 'From your Google listing, as Google shows them.' },
    { title: 'Finance with your wording', text: 'A monthly estimate at your lender’s rate.' },
    { title: 'Trade-ins and cars to sell', text: 'Buyers send the reg, the mileage and photos.' },
    { title: 'Enquiries reach you', text: 'By email, and in the dashboard if you have it.' },
    { title: 'Fast on a phone', text: 'Tested on a mid-range phone before launch.' },
] as const;
