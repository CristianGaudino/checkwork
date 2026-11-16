// The AI and WhatsApp page for car dealers (issue #45). Everything here is built in the demo dealer dashboard (the checkwork-demo repo):
// AI writing is src/lib/ai there, WhatsApp is src/lib/whatsapp. In the demo both are simulated: drafts are sample text and messages stay
// inside the demo. Keep each line true to that code: what a draft sees, the buttons, the caps.

/** The conversation in the hero: the demo's own enquiry alert, buttons and replies, with a made-up buyer */
export const CHAT = [
    { from: 'site', text: 'New enquiry: 2019 MINI Clubman\nAoife: Is this still available? Could I see it this week?', buttons: ['Yes, it’s available', 'Can you come in Saturday?', 'Call back'] },
    { from: 'staff', text: 'Can you come in Saturday?' },
    { from: 'site', text: 'Sent to Aoife by WhatsApp: can you come in Saturday?' },
    { from: 'site', text: 'Aoife replied: “Saturday works for me. Is 11:00 ok?”', buttons: ['Call back', 'Mark handled'] },
] as const;

export const WRITING = [
    { title: 'Car descriptions', text: 'From the details on the car: year, mileage, fuel, features and NCT. Adjust it to highlight economy or family use.' },
    { title: 'Social posts', text: 'A post or a story for a car in stock, with your sign-off and hashtags, ready to approve and schedule.' },
    { title: 'Newsletters', text: 'Your newest arrivals in one email, with a subject line.' },
    { title: 'Replies to leads', text: 'A reply to an enquiry, a trade-in or a test drive request, using the buyer’s first name and the car they asked about.' },
    { title: 'Replies to reviews', text: 'A reply to a new Google review, shorter or more apologetic as it needs.' },
] as const;

export const ADJUSTS = ['Shorter', 'Friendlier', 'More professional', 'More detail', 'Add urgency', 'Highlight economy', 'Highlight family use'] as const;

/** The WhatsApp alerts, and the buttons the team taps to answer (src/lib/whatsapp/rules.ts in the demo) */
export const ALERTS = [
    { title: 'New enquiry', text: 'The car and the question. Tap a reply and the buyer is answered.', buttons: ['Yes, it’s available', 'Can you come in Saturday?', 'Call back'] },
    { title: 'Trade-in request', text: 'The car, the registration and the photos. Reply with a price and the buyer gets your offer.', buttons: ['Reply with a price', 'Ask for more photos', 'Not for us'] },
    { title: 'Test drive booking', text: 'A booking to confirm, or a new time to suggest.', buttons: ['Confirm', 'Suggest another time'] },
    { title: 'A car 60 days in stock', text: 'With a suggested price drop you can apply in one tap.', buttons: ['Drop the price'] },
    { title: 'New Google review', text: 'Type a reply and it is posted on Google.', buttons: ['Reply'] },
    { title: 'Finance, service and deposits', text: 'A finance application, a service booking or a deposit taken, so nobody waits to hear back.', buttons: ['Acknowledge', 'Confirm a slot'] },
    { title: 'The Monday summary', text: 'Last week in a few lines, with a link to the full report.', buttons: ['Open the report'] },
] as const;

/** How it is kept safe: each line is how the demo works, and what we set up on a real site */
export const CARE = [
    { title: 'A person sends everything', text: 'AI writes a first draft. Nothing is posted, emailed or sent until someone on your team reads it and presses send.' },
    { title: 'Only what the draft needs', text: 'A draft sees the car’s details, and for a reply the customer’s first name and message. Never their phone number or email.' },
    { title: 'Check the facts', text: 'AI can get things wrong. Check prices, mileage and finance wording in every draft, as you would a new salesperson’s.' },
    { title: 'WhatsApp only when asked', text: 'A buyer gets WhatsApp messages only if they ticked the box on the form. Otherwise they get an email, or your team is told to call.' },
    { title: 'Only your team can act', text: 'Alerts go from your business number to the phones you link. Only a linked phone can answer a lead, and every tap is in the activity log.' },
    { title: 'A monthly cap you set', text: 'AI writing and WhatsApp each have a monthly limit. Past it, drafts stop and alerts come by email instead.' },
    { title: 'Named in your privacy notice', text: 'Your site’s privacy notice names the AI and WhatsApp services and what they receive. Leave either out and it is switched off.' },
] as const;

export const AI_FAQS = [
    { q: 'Is this a separate product?', a: 'No. It is part of the dealer website and dashboard we build, set up with the rest of it.' },
    { q: 'Does my team need a new app?', a: 'No. Alerts come to the WhatsApp they already use, from your dealership’s WhatsApp Business number.' },
    { q: 'Will the drafts sound like us?', a: 'Each draft uses your dealership’s name, your stock and your sign-off. Adjust it with one tap, or edit it like any other text.' },
    { q: 'Can buyers message us on WhatsApp from the site?', a: 'Yes. Every car page has a WhatsApp button, and buyers can ask for updates on WhatsApp when they enquire.' },
    { q: 'What does it cost to run?', a: 'AI drafts and WhatsApp messages have small running costs. We go through them with you before anything is switched on, and you set the monthly cap.' },
    { q: 'Can we try it?', a: 'Both are in the demo dealer dashboard, where drafts are sample text and messages stay inside the demo. We walk you through it on a call.' },
] as const;
