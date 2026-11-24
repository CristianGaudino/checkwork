// The dealer website page: what the website does, from the demo dealer site (the checkwork-demo repo), worded from the site contract
// (docs/site-contract.md, 3.2). Screenshots are of the demo with its made-up dealer and sample stock. `src: null` is a screen not captured
// yet: it shows a marked placeholder and is listed in issue #2.

const shot = (name: string) => `/dealer-demo/${name}.webp`;

export type TourStop = { id: string; title: string; text: string; path: string; src: string | null; phone?: string; alt: string };

export const TOUR: readonly TourStop[] = [
    { id: 'home', title: 'Search from the first screen', text: 'Make, model, body type and price, right on the home page.', path: '/', src: shot('site-home'), alt: 'Demo dealer home page with a stock search over a photo of the showroom' },
    { id: 'stock', title: 'Stock that is easy to search', text: 'Filters with live counts, a grid or a list, and saved cars and compare with no account needed.', path: '/used-cars', src: shot('site-stock'), phone: shot('phone-stock'), alt: 'Demo dealer used cars page with filters down the side and car cards' },
    { id: 'car', title: 'Every way to get in touch', text: 'Photos, the key facts and a monthly estimate, with Enquire, Test drive, Call and WhatsApp in one place.', path: '/used-cars/mini-clubman-2019-4710021', src: shot('site-car'), phone: shot('phone-car'), alt: 'Demo dealer car page for a MINI Clubman with the price and buttons to enquire and book a test drive' },
    { id: 'drive', title: 'Test drives booked online', text: 'The buyer picks a car, a day and a time you are open.', path: '/test-drive', src: null, alt: 'Demo dealer test drive booking with a car, a day and a time' },
    { id: 'finance', title: 'Finance with your wording', text: 'A monthly estimate at your lender’s rate, with the representative example you must show. We never make up rates.', path: '/finance', src: shot('site-finance'), alt: 'Demo dealer finance estimator showing a monthly payment' },
    { id: 'trade', title: 'Trade-ins and cars to sell', text: 'The buyer sends the reg, the mileage and photos. You reply with a price.', path: '/trade-in', src: null, alt: 'Demo dealer trade-in form with the reg, mileage and photos' },
    { id: 'finder', title: 'Find me a car', text: 'Can’t see the car they want? They tell you what they are after, and you look for it.', path: '/find-a-car', src: null, alt: 'Demo dealer find a car form' },
    { id: 'reviews', title: 'Your Google reviews', text: 'Shown as Google gives them, with the rating and a link to every review. We never pick or hide them.', path: '/reviews', src: null, alt: 'Demo dealer reviews page with the Google rating' },
    { id: 'vans', title: 'Vans with prices before VAT', text: 'Commercials show the price before VAT, so trade buyers see what they pay.', path: '/commercial', src: null, alt: 'Demo dealer commercials page with prices before VAT' },
];

export const BUILT = [
    { title: 'Fast on a phone', text: 'Tested on a mid-range phone before launch.' },
    { title: 'Ready for Google', text: 'Page titles, details for each car that search engines read, and your local details. No one can promise a ranking.' },
    { title: 'Spam checks on every form', text: 'And a limit on how often one person can send.' },
    { title: 'Your buyers’ data handled properly', text: 'We keep only what a form needs, and can show, export or delete it when someone asks.' },
] as const;

export const DEALER_FAQS = [
    { q: 'Can we try it before we talk to you?', a: 'Yes. The demo website is live for anyone, with a made-up dealer and sample stock.' },
    { q: 'Do we keep DoneDeal or CarsIreland?', a: 'Yes. Keep listing there and the site follows it. We connect your account when we set you up.' },
    { q: 'Can our team update cars without a developer?', a: 'Yes. Change the ad on DoneDeal or CarsIreland and the site follows within 15 minutes. With the dashboard you can also keep stock there.' },
    { q: 'Where do enquiries go?', a: 'By email to the addresses you choose, and into the dashboard if you have it.' },
    { q: 'Can we show finance?', a: 'Yes. The estimator uses your lender’s rate and the representative example and warnings you must show. We never make up rates.' },
    { q: 'Will the website rank on Google?', a: 'We set up what Google looks for: speed, page titles, details for each car and your local details. No one can promise a ranking.' },
    { q: 'What does it cost?', a: '€149 a month before VAT, plus €500 setup, or no setup on a 2-year contract. With the dashboard, €249 a month for both.' },
] as const;
