// Case studies. Everything here comes from what the owner said about each build; nothing is invented.
// TODO (issue #2): measured results (`result`). Screenshots of the live sites are of their public front pages.

export type Project = {
  slug: string;
  name: string;
  kind: string; // short descriptor shown in lists
  summary: string; // one line for cards and meta descriptions
  intro: string; // opening paragraph on the case study
  built: { title: string; text: string }[];
  forDealers?: string; // why it matters to the motor trade
  shots: { src?: string; alt: string; caption?: string }[]; // no src: a placeholder with the alt text until there is a screenshot
  result?: string; // TODO: real outcome, shown when set
  live?: 'demo'; // has a live site to try (the demo)
  site?: string; // the live public site, linked from the case study
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
    name: 'How Many?',
    kind: 'Stock and profit tracker for second-hand resellers',
    summary: 'A free stock and profit tracker for resellers who buy by the bag and sell in bundles, across every platform.',
    intro:
      'How Many? is a phone-first web app for second-hand resellers. A spreadsheet stops working on the first bag: it cannot say what each item in a bag of 12 cost, what each item in a bundle made, or keep last month right after a return. How Many? does all three. It is live and free, with no limit on items.',
    built: [
      {
        title: 'Add stock in seconds',
        text: 'Photos, automatic item codes and QR labels to print. A whole bag is added at once with its cost split across the items, evenly or weighted. A spreadsheet can be imported, and a half-finished item saved as a draft.',
      },
      { title: 'Every platform', text: 'Vinted, eBay, Poshmark, Mercari, Depop, Facebook and in person, or the seller’s own. The listing text and photos are ready to copy into each one.' },
      {
        title: 'Profit on every item',
        text: 'Sale price less cost and postage, per item, per month and per bag. Bundles are split back by list price, and a refund counts in the month it happens, so past months stay right.',
      },
      { title: 'Expenses and reports', text: 'Expenses with receipt photos, a printable summary for any run of months, and a download of every sale, refund, expense and receipt.' },
      { title: 'Insights', text: 'What sells fastest and for the most, by brand, type, size and era, and which bags and suppliers pay off.' },
      { title: 'Work as a team', text: 'Invite a partner with full access, or a helper who adds, lists and posts but never sees costs or profit.' },
      { title: 'Try it before signing up', text: 'A visitor can add a first item with no account. It is kept on their phone, then saved and opened once they sign up.' },
    ],
    shots: [{ src: '/work/how-many/home.webp', alt: 'How Many? home page: profit this month, items sold and in stock, and a price tag showing the profit on one jacket', caption: 'The How Many? home page' }],
    site: 'https://www.checkhowmany.com',
  },
  {
    slug: 'cache-register',
    name: 'Cache Register',
    kind: 'Stock and profit tracker for tech resellers',
    summary: 'A resale app like How Many?, specialised for people who buy and sell tech.',
    intro:
      'Cache Register is a resale app for people who buy and sell tech. It works much like How Many?, tracking stock and what each item made, but is built around selling tech rather than clothes.',
    built: [{ title: 'Built for tech', text: 'Stock and profit tracking in the style of How Many?, specialised for tech.' }],
    shots: [{ alt: 'Cache Register' }],
  },
  {
    slug: 'how-much',
    name: 'How Much?',
    kind: 'Expenses, sales and year-end records for sole traders',
    summary: 'The sister app to How Many?: expenses with receipt photos, sales and mileage, and a year-end report to hand the accountant.',
    intro:
      'How Much? is a phone-first app for sole traders and small businesses. It keeps expenses with their receipt photos, sales and mileage in one place, and turns them into a year-end report for the accountant.',
    built: [
      { title: 'Expenses with receipts', text: 'Snap the receipt when you pay. It is saved as an expense to finish later.' },
      { title: 'Sales and mileage', text: 'Money in and business miles, alongside the expenses.' },
      { title: 'Year-end report', text: 'A report ready to hand to the accountant.' },
    ],
    shots: [{ alt: 'How Much?' }],
    site: 'https://www.checkhowmuch.com',
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
