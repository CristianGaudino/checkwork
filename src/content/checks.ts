// The launch checklist on the home page. Each check is in every plan (content/pricing.ts), so it is a promise: keep only what every dealer site gets
// (owner to confirm the wording: issue #2).
export const CHECKS = [
    { title: 'Your stock on it', text: 'Synced from DoneDeal or CarsIreland, so you list a car once.' },
    { title: 'Your reviews on it', text: 'From your public Google listing.' },
    { title: 'Trade-ins with a reg lookup', text: 'Buyers type the reg and the car fills in.' },
    { title: 'Enquiries reach you', text: 'By email, or on WhatsApp from the car page.' },
    { title: 'Fast on a phone', text: 'Tested on a mid-range phone before launch.' },
] as const;
