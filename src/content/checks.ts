// The launch checklist shown on the home page and the dealer page. Each check names the problem it solves, in plain words. These are promises: keep only what Checkwork does on every project.
export const CHECKS = [
    { title: 'Fast on a phone', text: 'Slow pages lose buyers. We test on real phones, not just a fast laptop.' },
    { title: 'Found on Google', text: 'Buyers search before they call. We set up page titles, structured data and local details so Google can read the site.' },
    { title: 'Enquiries reach you', text: 'No lost leads. Every message lands where your team will see it.' },
    { title: 'Stock stays current', text: 'No out-of-date listings. Change a price once and the site is up to date.' },
    { title: 'Your team can run it', text: 'No waiting on a developer. Day-to-day changes are yours to make.' },
] as const;
