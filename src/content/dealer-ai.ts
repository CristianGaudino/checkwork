// The AI page for car dealers (issue #45). Everything here is built in the demo dealer dashboard (the checkwork-demo repo, src/lib/ai).
// In the demo the writing is simulated: drafts are sample text built from the record. Keep each line true to that code: what a draft sees,
// the buttons, the monthly limit. Posting is simulated there too: nothing goes to Facebook, Instagram, TikTok or a mailbox. WhatsApp is on the dealer page (src/content/dealer.ts), not here.

/** The draft in the hero: the demo's car description for its 2019 MINI Clubman, with the buttons a car description gets */
export const DRAFT = {
    label: 'Description',
    text: '2019 MINI Clubman 1.5 Cooper in grey, 58,600 km on the clock.\n1.5 L petrol engine with manual gearbox.\nEquipment includes satellite navigation, heated front seats, reversing camera, keyless entry.',
    adjusts: ['Shorter', 'More detail', 'Highlight economy', 'Highlight family use'],
} as const;

export const WRITING = [
    { title: 'Car descriptions', text: 'From the details on the car: year, mileage, fuel, features and NCT. Adjust it to highlight economy or family use.' },
    { title: 'Social posts', text: 'Captions for Facebook, Instagram and TikTok, written for a post, a reel, a carousel or a story.' },
    { title: 'Newsletters', text: 'Your newest arrivals in one email, with a subject line.' },
    { title: 'Replies to leads', text: 'A reply to an enquiry, a trade-in or a test drive request, using the buyer’s first name and the car they asked about.' },
    { title: 'Replies to reviews', text: 'A reply to a new Google review, shorter or more apologetic as it needs.' },
] as const;

/** A social post from the demo's composer (src/components/admin/PostComposer.tsx there), one step per screen on a phone */
export const POST_STEPS = [
    { title: 'Pick a car', text: 'From photo cards of your stock.' },
    { title: 'Pick where it goes', text: 'Facebook, Instagram or TikTok, as a post, a reel or a carousel, or a story on Facebook and Instagram. Add a paid ad on Meta or Google if you want one.' },
    { title: 'AI writes the text', text: 'For that network and format, with your sign-off and hashtags. A story gets a ready layout: Just in, or Price drop.' },
    { title: 'Post now or later', text: 'Scheduled posts sit on a calendar and go out on time.' },
] as const;

export const POST_NOTES = [
    'Facebook and Instagram posts, reels and carousels go out on their own. Stories and TikTok are made ready for you to post from your phone, where those networks do not allow posting from outside.',
    'When a car is added to stock, your team can get a WhatsApp nudge to post it.',
    'Newsletters go only to people who signed up on your site, each with its own unsubscribe link. Your team can take someone off the list, never add them.',
] as const;

export const ADJUSTS = ['Shorter', 'Friendlier', 'More professional', 'More detail', 'Add urgency', 'Highlight economy', 'Highlight family use'] as const;

/** How it is kept safe: each line is how the demo works, and what we set up on a real site */
export const CARE = [
    { title: 'A person sends everything', text: 'AI writes a first draft, marked as an AI draft. Nothing is posted, emailed or saved until someone on your team reads it and presses the button.' },
    { title: 'Only what the draft needs', text: 'A draft sees the car’s details, and for a reply the customer’s first name and message. Never their phone number or email.' },
    { title: 'Check the facts', text: 'AI can get things wrong. Check prices, mileage and finance wording in every draft, as you would a new salesperson’s.' },
    { title: 'A monthly limit', text: 'Past it, the writing buttons stop for the month and your own text is left alone. Ask us if you need it raised.' },
    { title: 'In your privacy notice', text: 'Your site’s privacy notice says what goes to the AI, and that phone numbers and emails are taken out first. Leave AI out and it is switched off.' },
] as const;

export const AI_FAQS = [
    { q: 'Is this a separate product?', a: 'No. It is in the dashboard, on the Dealer and Group plans, and set up with the rest of it. Social posts and the newsletter are in Group, or add-ons on Dealer.' },
    { q: 'Will the drafts sound like us?', a: 'Each draft uses your dealership’s name, your stock and your sign-off. Adjust it with one tap, or edit it like any other text.' },
    { q: 'Can it make up details about a car?', a: 'It only gets the details on the car’s record, so that is what it writes from. AI can still get things wrong, which is why a person checks every draft.' },
    { q: 'Is there a limit?', a: 'Dealer includes 100 uses a month and Group 300. Past that each use is €0.04, or €0.08 for Premium, up to €50 a month unless you set a lower limit. At the limit the buttons stop until next month.' },
    { q: 'Can we try it?', a: 'It is in the demo dealer dashboard, where the drafts are sample text and nothing is posted. We walk you through it on a call.' },
] as const;
