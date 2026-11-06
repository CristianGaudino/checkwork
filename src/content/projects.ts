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
    slug: 'carright',
    name: 'Carright',
    kind: 'Website and dealer system for a second-hand car dealer',
    summary:
      'A redesigned dealer website with the tools behind it: stock controls, lead tracking, a metrics dashboard and social media auto-posting.',
    intro:
      'Carright is a second-hand car dealer. We redesigned their public website and built the system behind it, so the people running the dealership can manage the site, follow up enquiries, see how the business is doing and handle social media from one place.',
    built: [
      {
        title: 'Public website redesign',
        text: 'A redesigned public website for showing the dealership’s cars.',
      },
      {
        title: 'Dealer controls',
        text: 'Controls for the dealership team to manage their own site, so day-to-day changes do not wait on a developer.',
      },
      {
        title: 'Owner controls',
        text: 'Controls for the owner, kept separate from the dealer team’s.',
      },
      {
        title: 'Lead tracking',
        text: 'Enquiries from the website are captured as leads in the system, not left in an inbox.',
      },
      {
        title: 'Metrics dashboard',
        text: 'A dashboard of metrics, so the numbers that matter are in one place.',
      },
      {
        title: 'Social media tools',
        text: 'Social media management tools in the same system, including automatic posting.',
      },
    ],
    forDealers:
      'For a dealership, the website is a sales channel. The stock on it has to be current and every enquiry has to reach someone. The controls, lead tracking and dashboard in Carright are there for exactly that.',
    shots: [
      { alt: 'Carright public website, stock listing page', caption: 'Public stock listing' },
      { alt: 'Carright dealer controls, editing a vehicle', caption: 'Dealer controls' },
      { alt: 'Carright metrics dashboard', caption: 'Metrics dashboard' },
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
