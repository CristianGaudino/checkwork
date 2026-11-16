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
  live?: 'demo'; // has a live site to try (the demo)
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: 'dealer-demo',
    name: 'Dealer demo site',
    kind: 'Demo website and dashboard for a car dealer',
    summary:
      'Our live demo dealer website and the dashboard behind it: searchable stock, car pages, test drives, trade-ins, finance, and every lead in one place.',
    intro:
      'This is a demo we built to show what a modern car dealer website can do, with a made-up dealer and sample stock. It is live, so anyone can try it. Behind it is a dashboard where the dealer’s team handles every lead, test drive, car and sale.',
    built: [
      {
        title: 'Stock search and car pages',
        text: 'Search by make, model, body type and price, with filters that show live counts. Each car has a gallery, its facts, a monthly estimate and buttons to enquire, book a test drive, call or WhatsApp.',
      },
      {
        title: 'Compare, saved cars and price alerts',
        text: 'Buyers save and compare cars with no account, and can ask to hear when a car drops in price.',
      },
      {
        title: 'Trade-ins and finance',
        text: 'A trade-in form with a registration lookup and photos, and a finance estimator with the dealer’s rate and required wording.',
      },
      {
        title: 'Every lead in one place',
        text: 'Enquiries from the website, the phone and social media land in the dashboard with their status, who has them and when to follow up. Each is stored with the consent it was sent under.',
      },
      {
        title: 'Stock, sales and margins',
        text: 'The team adds cars and photos, drops prices on several at once, records deposits and sales, and sees the margin on each car. Only the people the owner chooses see the figures.',
      },
      {
        title: 'Reports and analytics',
        text: 'Sales and profit by month, days to sell, where visitors come from and how many become leads.',
      },
      {
        title: 'AI writing help',
        text: 'A first draft of car descriptions, social posts, newsletters and replies to leads and reviews, for the team to check and send. A draft sees the car and the message, never a phone number or email. In the demo the drafts are sample text.',
      },
      {
        title: 'Leads on WhatsApp',
        text: 'New enquiries, trade-ins, test drives and reviews reach the team’s phones with buttons to answer from the yard, and every tap updates the lead in the dashboard. In the demo the messages stay inside it.',
      },
      {
        title: 'Personal data handled properly',
        text: 'Data requests to see, export or erase what is held about a person, and old leads cleared after a set time.',
      },
    ],
    forDealers:
      'For a dealership, the website is a sales channel and the dashboard is where the sale is won. The stock has to be easy to search, every enquiry has to reach someone, and the team has to see what needs doing today. The demo is built around exactly that, and it is fast on a mid-range phone.',
    shots: [
      { src: '/work/dealer-demo/site-stock.webp', alt: 'Demo dealer site, used cars page with filters', caption: 'Stock search' },
      { src: '/work/dealer-demo/site-car.webp', alt: 'Demo dealer site, a car page with the price and buttons to enquire', caption: 'Car page' },
      { src: '/work/dealer-demo/dash-overview.webp', alt: 'Demo dealer dashboard overview with leads each week', caption: 'Dashboard overview' },
      { src: '/work/dealer-demo/dash-leads.webp', alt: 'Demo dealer dashboard list of leads', caption: 'Leads' },
    ],
    live: 'demo',
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
