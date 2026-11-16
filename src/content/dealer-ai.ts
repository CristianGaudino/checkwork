// The AI page for car dealers (issue #45). Everything here is built in the demo dealer dashboard (the checkwork-demo repo, src/lib/ai).
// In the demo the writing is simulated: drafts are sample text built from the record. Keep each line true to that code: what a draft sees,
// the buttons, the cap. WhatsApp is on the dealer page (src/content/dealer.ts), not here.

/** The draft in the hero: the demo's car description for its 2019 MINI Clubman, with the buttons a car description gets */
export const DRAFT = {
    label: 'Description',
    text: '2019 MINI Clubman 1.5 Cooper in grey, 58,600 km on the clock.\n1.5 L petrol engine with manual gearbox.\nEquipment includes satellite navigation, heated front seats, reversing camera, keyless entry.',
    adjusts: ['Shorter', 'More detail', 'Highlight economy', 'Highlight family use'],
} as const;

export const WRITING = [
    { title: 'Car descriptions', text: 'From the details on the car: year, mileage, fuel, features and NCT. Adjust it to highlight economy or family use.' },
    { title: 'Social posts', text: 'A post or a story for a car in stock, with your sign-off and hashtags, ready to approve and schedule.' },
    { title: 'Newsletters', text: 'Your newest arrivals in one email, with a subject line.' },
    { title: 'Replies to leads', text: 'A reply to an enquiry, a trade-in or a test drive request, using the buyer’s first name and the car they asked about.' },
    { title: 'Replies to reviews', text: 'A reply to a new Google review, shorter or more apologetic as it needs.' },
] as const;

export const ADJUSTS = ['Shorter', 'Friendlier', 'More professional', 'More detail', 'Add urgency', 'Highlight economy', 'Highlight family use'] as const;

/** How it is kept safe: each line is how the demo works, and what we set up on a real site */
export const CARE = [
    { title: 'A person sends everything', text: 'AI writes a first draft, marked as an AI draft. Nothing is posted, emailed or saved until someone on your team reads it and presses the button.' },
    { title: 'Only what the draft needs', text: 'A draft sees the car’s details, and for a reply the customer’s first name and message. Never their phone number or email.' },
    { title: 'Check the facts', text: 'AI can get things wrong. Check prices, mileage and finance wording in every draft, as you would a new salesperson’s.' },
    { title: 'A monthly cap you set', text: 'Past it, the writing buttons stop for the month and your own text is left alone.' },
    { title: 'Named in your privacy notice', text: 'Your site’s privacy notice names the AI service and what it receives. Leave AI out and it is switched off.' },
] as const;

export const AI_FAQS = [
    { q: 'Is this a separate product?', a: 'No. It is part of the dealer website and dashboard we build, set up with the rest of it.' },
    { q: 'Will the drafts sound like us?', a: 'Each draft uses your dealership’s name, your stock and your sign-off. Adjust it with one tap, or edit it like any other text.' },
    { q: 'Can it make up details about a car?', a: 'It only gets the details on the car’s record, so that is what it writes from. AI can still get things wrong, which is why a person checks every draft.' },
    { q: 'What does it cost to run?', a: 'Each draft has a small running cost. We go through it with you before AI is switched on, and you set the monthly cap.' },
    { q: 'Can we try it?', a: 'It is in the demo dealer dashboard, where the drafts are sample text. We walk you through it on a call.' },
] as const;
