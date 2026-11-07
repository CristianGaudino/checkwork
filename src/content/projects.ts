// Case studies. Everything here comes from what the owner said about each build; nothing is invented.
// TODO (issue #2): real screenshots in /public/work/<slug>/ (set `src` on each shot) and measured results (`result`).

export type Project = {
  slug: string;
  name: string;
  kind: string; // short descriptor shown in lists
  summary: string; // one line for cards and meta descriptions
  intro: string; // opening paragraph on the case study
  built: { title: string; text: string }[];
  forDealers?: string; // why it matters to the motor trade
  shots: { src?: string; alt: string; caption?: string }[];
  result?: string; // TODO: real outcome, shown when set
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: 'dealer-demo',
    name: 'Dealer demo site',
    kind: 'Demo website for a used car dealer',
    summary:
      'Our demo dealer website: searchable stock, car pages, compare, saved cars, a finance calculator and enquiry forms that land in a database.',
    intro:
      'This is a demo we built to show what a modern used car dealer website can do. It is a full rebuild of a dealer site, with real-style stock, and every enquiry form goes somewhere it can be followed up. It is a demonstration, not a live client site.',
    built: [
      {
        title: 'Stock search and filters',
        text: 'Browse by make, model, year, budget, body type, fuel and gearbox, with sorting and a grid or list view.',
      },
      {
        title: 'Car pages',
        text: 'A photo gallery with full-screen view, the specs and equipment, a clear buy box and share button.',
      },
      {
        title: 'Compare and saved cars',
        text: 'Buyers can save cars and compare them side by side. Both are kept in their own browser, with no account.',
      },
      {
        title: 'Finance calculator',
        text: 'A repayment calculator on the site. The figures in the demo are placeholders, not real terms.',
      },
      {
        title: 'Enquiry forms',
        text: 'Separate forms for a car enquiry, finance, a trade-in valuation with photos, a car search request and a general message. Each asks for consent and is spam-checked.',
      },
      {
        title: 'Enquiries stored, not lost',
        text: 'Every enquiry is saved to a database with the consent text it was sent under, and cleared after a set retention period.',
      },
      {
        title: 'Sold cars and search basics',
        text: 'Sold cars stay up for a while as sold, and pages carry the structured data and share images search engines look for.',
      },
    ],
    forDealers:
      'For a dealership, the website is a sales channel. The stock on it has to be easy to search and every enquiry has to reach someone. This demo is built around exactly that, and it is fast on a mid-range phone.',
    shots: [
      { alt: 'Demo dealer site, stock listing page', caption: 'Stock listing' },
      { alt: 'Demo dealer site, car page', caption: 'Car page' },
      { alt: 'Demo dealer site, finance calculator', caption: 'Finance calculator' },
    ],
    featured: true,
  },
  {
    slug: 'how-many',
    name: 'How Many',
    kind: 'Stock, inventory and profit tracker for resellers',
    summary: 'Track what you have, what it cost and what it made, in one place built for resellers.',
    intro:
      'How Many is a web app for resellers who need to know what stock they hold and whether it is making money. It tracks inventory and works out profit, so those answers are not buried in a spreadsheet.',
    built: [
      { title: 'Stock and inventory', text: 'Every item you hold, with what you paid for it.' },
      { title: 'Profit tracking', text: 'See profit alongside stock, so you know what is actually making money.' },
      {
        title: 'Links to How Much',
        text: 'Connects to our finance app, How Much, so stock and accounts agree with each other.',
      },
    ],
    shots: [{ alt: 'How Many inventory and profit view', caption: 'Inventory and profit' }],
  },
  {
    slug: 'how-much',
    name: 'How Much',
    kind: 'Sales, expenses, mileage and reporting for small sellers',
    summary: 'Sales, expenses, mileage and reports in one finance system that links to How Many.',
    intro:
      'How Much is a finance system for small sellers. It records sales, expenses and mileage, and produces reports, and it can be linked with How Many so inventory and finances work together.',
    built: [
      { title: 'Sales and expenses', text: 'Record money in and money out as it happens.' },
      { title: 'Mileage', text: 'Log business mileage alongside everything else.' },
      { title: 'Reports', text: 'Reports on how the business is performing.' },
      {
        title: 'Works with How Many',
        text: 'Link it to How Many to run stock and finances as one system.',
      },
    ],
    shots: [{ alt: 'How Much sales and reports view', caption: 'Sales and reports' }],
  },
  {
    slug: 'blacktail-archive',
    name: 'Blacktail Archive',
    kind: 'Public website for a vintage clothing reseller',
    summary: 'A focused, public-facing website that shows a vintage reseller’s pieces properly.',
    intro:
      'Blacktail Archive is a vintage clothing reseller. Their site is purely public-facing: it exists to show the pieces well and to be found, without anything getting in the way.',
    built: [
      { title: 'Public storefront', text: 'A clean website built around showing each piece clearly.' },
      { title: 'Public only', text: 'No logins and no back-office. Just the website, doing one job well.' },
    ],
    shots: [{ alt: 'Blacktail Archive website', caption: 'Public website' }],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
