// The launch checklist on the home page. Each check names the problem it solves, in plain words. These are promises: keep only what Checkwork does on every project (owner to confirm the wording: issue #2).
export const CHECKS = [
    { title: 'Fast on a phone', text: 'Slow pages lose customers. We test on real phones, not just a fast laptop.' },
    { title: 'Found on Google', text: 'Customers search before they call. We set up page titles, structured data and local details so Google can read the site.' },
    { title: 'Enquiries reach you', text: 'No lost leads. Every message lands where your team will see it.' },
    { title: 'Easy to keep current', text: 'No out-of-date pages. Change something once and the site is up to date.' },
    { title: 'Your team can run it', text: 'No waiting on a developer. Day-to-day changes are yours to make.' },
] as const;

// The same promises in a car dealer's words, for the dealer page: only the two that differ are rewritten.
export const DEALER_CHECKS = [
    { ...CHECKS[0], text: 'Slow pages lose buyers. We test on real phones, not just a fast laptop.' },
    { ...CHECKS[1], text: 'Buyers search before they call. We set up page titles, structured data and local details so Google can read the site.' },
    CHECKS[2],
    { title: 'Stock stays current', text: 'No out-of-date listings. Change a price once and the site is up to date.' },
    CHECKS[4],
] as const;
