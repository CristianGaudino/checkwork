// The contact form's choices. The `need` strings are stored with each enquiry: rename one and old rows keep the old text.
export const NEEDS = [
    'A website for my business',
    'A custom web app',
    'A website for my dealership',
    'Dealer tools (stock, finance, enquiries)',
    'AI features, training or advice',
    'Something else',
] as const;

// One line under each choice, so a visitor can tell them apart without guessing
export const NEED_HINTS: Record<(typeof NEEDS)[number], string> = {
    'A website for my business': 'A new site, or a rebuild of the one you have.',
    'A custom web app': 'Software built around how your business works.',
    'A website for my dealership': 'Stock, car pages and enquiries, like our demo.',
    'Dealer tools (stock, finance, enquiries)': 'Add to the site you have, or the dashboard behind it.',
    'AI features, training or advice': 'AI in your tools, or help for your team to use it.',
    'Something else': 'Tell us what you have in mind.',
};

// The choices that open the dealer questions. `?need=dealer` on the contact page picks the first.
export const DEALER_NEEDS = [NEEDS[2], NEEDS[3]] as const;

export const STOCK_SIZES = ['Under 25 cars', '25 to 75 cars', 'More than 75 cars'] as const;
export const STOCK_SOURCES = ['On DoneDeal', 'In our own system or a spreadsheet', 'On another listing site', 'Not sure'] as const;
export const INTERESTS = [
    'Stock search and car pages',
    'Leads in one place',
    'Test drive booking',
    'Trade-ins with registration lookup',
    'Finance estimator',
    'Reports and margins',
] as const;
export const REPLIES = ['By email', 'A phone call'] as const;
