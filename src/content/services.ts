import { ROUTES } from '@/lib/config';

export const SERVICES = [
    {
        id: 'websites',
        title: 'Websites',
        summary: 'A fast website that brings in enquiries and is set up so Google can find it.',
        text: 'Design and development of fast, custom websites. We build them in code, so they load quickly and do exactly what your business needs, and we set up the technical basics Google looks for.',
        points: ['Design and build, start to finish', 'Set up for search: titles, structured data, local details', 'Tested on real phones before launch'],
        more: { href: ROUTES.dealers, label: 'Websites for car dealerships' },
    },
    {
        id: 'web-apps',
        title: 'Custom web apps',
        summary: 'Business software built around how you work, like our inventory, profit and finance apps for resellers.',
        text: 'Software built around a specific way of working. We have built inventory, profit and finance tools for resellers, and the two can be linked together.',
        points: ['Stock, inventory and profit tracking', 'Sales, expenses, mileage and reports'],
        more: { href: `${ROUTES.work}/how-many`, label: 'See How Many' },
    },
    {
        id: 'dealer-tools',
        title: 'Dealer tools',
        summary: 'Searchable stock, compare and saved cars, a finance calculator and enquiry forms that store every lead.',
        text: 'The tools a buyer uses on a dealership website, and the system that catches their enquiries so none are lost. See it working in our demo dealer site.',
        points: ['Stock search with filters', 'Compare and saved cars', 'Finance calculator', 'Enquiry forms with every lead stored'],
        more: { href: `${ROUTES.work}/dealer-demo`, label: 'See the demo dealer site' },
    },
    {
        id: 'ai',
        title: 'AI for your business',
        summary: 'AI features inside your website or tools, training for your team, and honest advice on where AI helps and where it does not.',
        text: 'We put AI to work where it saves your team time, help your people use AI tools safely in their day-to-day work, and review your workflows to tell you where AI would and would not help.',
        points: [
            'AI features inside the tools we build, such as draft listing descriptions, reply suggestions and summaries',
            'Training and enablement: your team learns to use AI tools safely',
            'Advice and audits: where AI would and would not help, and the workflow around it',
        ],
    },
    {
        id: 'support',
        title: 'Ongoing support',
        summary: 'Updates, fixes and improvements after launch, so the site keeps working.',
        text: 'A website is not finished at launch. We stay on to fix problems, keep things up to date and add what the business needs next.',
        points: ['Fixes and updates', 'Improvements as the business changes'],
    },
] as const;

export const STEPS = [
    { title: 'Talk', text: 'We learn how your business sells and what the website has to do for it.' },
    { title: 'Design', text: 'We design the pages and tools, and agree them with you before we build.' },
    { title: 'Build', text: 'We build it in code, test it on real phones and check it against the launch list.' },
    { title: 'Launch and look after', text: 'We launch it, set it up for Google and stay on to keep it working.' },
] as const;
