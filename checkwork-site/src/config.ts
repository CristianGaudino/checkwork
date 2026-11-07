// Single source of truth for anything that may change (domain, contact, legal).
// Search for "TODO" across the project for everything that still needs real details.

export const site = {
  name: 'Checkwork',
  // The domain you build and launch on. Keep in sync with astro.config.mjs + public/robots.txt.
  url: 'https://madebycheck.com',
  // TODO: confirm the mailbox exists before launch.
  email: 'hello@madebycheck.com',
  tagline: 'Websites that work.',
  description:
    'Checkwork designs and builds websites and dealer tools for car dealerships and growing businesses in Ireland.',
  country: 'Ireland',
  // Used in the footer and privacy notice. TODO: replace with your registered company details.
  legal: {
    companyName: 'Checkwork', // TODO: registered company name
    companyNumber: '', // TODO: CRO number, shown in footer when set
    registeredOffice: '', // TODO: registered office address, shown in footer when set
  },
  // TODO: add real names/roles. Entries with an empty name are not shown on the About page.
  team: [
    { name: '', role: 'Developer' },
    { name: '', role: 'Developer' },
  ],
};

export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/car-dealer-websites', label: 'Car dealers' },
  { href: '/about', label: 'About' },
];

export const cta = { href: '/contact', label: 'Start a project' };
