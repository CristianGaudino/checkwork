# Site contract: the remade www.checkwork.ie (#58)

The design and content contract for the remade site, written before any UI code. The owner reviews it; the build follows it. Anything
the build needs that is not here is a question for the owner, not a guess.

Sources: issue #58 (the products and prices), issue #2 (the placeholder register), the dealer dashboard (`checkwork-dash`:
`docs/dealer-admin.md`, `docs/decisions.md` Pricing, `src/lib/billing/rules.ts` `PLANS`) and the dealer website template
(`checkwork-demo`). Every claim below was checked against those repos on 2026-11-24. The owner answered the open questions the same
day (section 8): the outside connections are presented as working features that we connect when we set a dealer up (section 3,
"Connected at setup").

## 1. Aim and reader

**The reader:** the owner of an independent used-car dealership in Ireland, 20 to 150 cars, listing on DoneDeal or CarsIreland. Reading
on a phone, often on the yard, between jobs. Busy, wary of agencies and software that promised a lot. Knows their trade far better than
we do. Not technical.

**What they need to see, in this order:**
1. What Checkwork sells: two products, a dealer website and a dealer dashboard, sold alone or together.
2. That it fits how they already work: they keep listing on DoneDeal or CarsIreland.
3. What it costs, in plain numbers, before VAT.
4. That a real person sets it up with them.

**What they should do:** send an enquiry (the contact form, which asks how they want a reply: "Call me" or "Email me"). That is the one
primary action on every page, labelled **Talk to us**. A "call" is that form with "Call me" ticked: there is no calendar booking. The
secondary action is trying the demo website (it opens in a new tab). There is no public demo of the dashboard and never a public link to
one: we show it on a call.

**What success looks like:** a dealer who reads one page on a phone can say what each product does and what it costs, and sends an
enquiry without needing to read another page.

## 2. Information architecture

| Page | URL | Purpose | In nav |
|---|---|---|---|
| Home | `/` | The two products at a glance, prices, how setup works, the enquiry | Logo |
| Dealer website | `/car-dealer-websites` | Everything the website does, the demo link | Website |
| Dealer dashboard | `/car-dealer-dashboard` (new) | Everything the dashboard does | Dashboard |
| Pricing | `/pricing` | The three plans, allowances, per-use prices, terms | Pricing |
| About | `/about` | Who builds it and how we work with a dealer | About |
| Contact | `/contact` | The enquiry form | Talk to us (button) |
| Privacy | `/privacy` | Privacy notice | Footer |
| Admin | `/admin` | The owner's enquiry list, behind Access, not in the sitemap | No |

`/car-dealer-websites` keeps its URL: it already ranks and is linked from outside. The dashboard page is new and sits beside it.

Nav (`NAV` in `src/lib/config.ts`): Website, Dashboard, Pricing, About, then the **Talk to us** button. Footer: the same, plus Contact
and Privacy.

### Redirects (`next.config.ts`), so no link breaks

| From | To | Kind |
|---|---|---|
| `/car-dealer-ai` | `/car-dealer-dashboard#ai-writing` | 301 |
| `/services` | `/pricing` | 301 (kept) |
| `/work`, `/work/:slug` | `/car-dealer-websites` | 301 (kept) |
| `checkwork.ie/*` | `https://www.checkwork.ie/*` | 301 (kept) |

Old in-page links that a server redirect cannot see:
- **Plan anchors** `/pricing#plan-showroom`, `#plan-dealer`, `#plan-group`: the new plan cards are `#plan-website`, `#plan-dashboard`
  and `#plan-both`. Each card also carries an empty anchor with an old id, so old links still land on a card: `plan-showroom` on
  Website, `plan-dealer` and `plan-group` on Website + Dashboard.
- **Contact preselects** `/contact?need=showroom|dealer|group`: `PLAN_NEEDS` in `src/content/contact.ts` maps the old ids too
  (showroom to The website, dealer and group to Both). New links use `?need=website|dashboard|both`.
- `/car-dealer-websites#whatsapp`: WhatsApp moves to the dashboard page. The website page keeps no `#whatsapp` section, so the link
  lands at the top of the page. Acceptable: it was only linked from our own home page, which changes.

## 3. Pages, section by section, with the copy

Rules for all copy: plain, short, human. No em dashes. No hype ("powerful", "seamless", "cutting-edge"). No invented figures,
dealers, quotes or results. Prices are before VAT and say so. Built copy uses typographic apostrophes (’) as the current site does.
Button labels are verbs. "Try the demo website" always opens in a new tab with "(opens in a new tab)" for screen readers (the existing
`DemoButton`).

### Connected at setup (owner, 2026-11-24)

The outside connections are working features that we connect during onboarding, and the copy presents them that way, with no caveat.
Where the dealer's own account is involved, one plain line says we connect it when we set them up.

| Connection | The line we use, where it fits |
|---|---|
| DoneDeal or CarsIreland stock (website and dashboard) | We connect your DoneDeal or CarsIreland account when we set you up. |
| DoneDeal and CarsIreland enquiries into the dashboard | Enquiries from DoneDeal and CarsIreland come in too. |
| WhatsApp alerts and messages | We connect your WhatsApp Business number when we set you up. |
| Google review replies | We connect your Google Business Profile when we set you up. |
| Reg lookup and history check | (nothing to add: the provider account is ours) |

Carzone is not mentioned.

### 3.1 Home `/`

**Section 1: Hero.** Two columns from `lg`; on a phone the text first, the sheet under it.

- H1: **A website and a dashboard for your car dealership**
- Lead: For independent used-car dealers in Ireland. A website on the stock you already list, and one place to answer every lead, track
  every car and see what you make on it.
- Buttons: **Talk to us** (primary, `/contact`), **See prices** (secondary, `/pricing`)
- Line under the buttons: [Try the demo website ↗] The demo is a made-up dealer with sample stock.
- Right column: the launch sheet (kept, the site's signature), with corrected checks (`src/content/checks.ts`):
  - Heading: **Before it goes live**. Under it: Every dealer website we launch has these.
  - Your stock on it: From your DoneDeal or CarsIreland account.
  - Your reviews on it: From your Google listing, as Google shows them.
  - Finance with your wording: A monthly estimate at your lender’s rate.
  - Trade-ins and cars to sell: Buyers send the reg, the mileage and photos.
  - Enquiries reach you: By email, and in the dashboard if you have it.
  - Fast on a phone: Tested on a mid-range phone before launch.
  - Stamp: **Checked**

  (The old check "Trade-ins with a reg lookup: buyers type the reg and the car fills in" is gone: the website no longer has a lookup,
  checkwork-dash #182. The lookup is for staff in the dashboard.)

**Section 2: The two products.** H2 and lead, then two cards side by side from `md`, stacked on a phone.

- H2: **Two products. Take one or both.**
- Card 1, with screenshot `home-website` (phone shot below `sm`):
  - H3: **Dealer website**
  - Your own site, in your name and colours, on your stock. Buyers search, ask for a test drive, work out finance and send their car
    for a trade-in.
  - €149 a month
  - Link: **About the website** (`/car-dealer-websites`)
- Card 2, with screenshot `home-dashboard`:
  - H3: **Dealer dashboard**
  - Leads, test drives, stock, sales, margins, reviews and customers. On a laptop in the office or a phone on the yard.
  - €149 a month
  - Link: **About the dashboard** (`/car-dealer-dashboard`)
- Line under both: Both together, €249 a month. With both, every enquiry from your website lands in the dashboard.

**Section 3: From a buyer’s tap to your phone.** Three numbered steps beside the screenshot `dash-lead` (stacked on a phone).

- H2: **From a buyer’s tap to your phone**
- 01 **A buyer gets in touch.** On a car page: Enquire, Test drive, Call or WhatsApp.
- 02 **It lands in your dashboard.** With the car, what they asked and how they want a reply.
- 03 **Your team hears at once.** A notification on their phone, an email, or a WhatsApp message.
- Link: **More about the dashboard**

**Section 4: Prices.** The existing three-row list (`TIERS` on the home page), one row per plan, each row a link to its card.

- H2: **Three plans**
- Lead: A month, before VAT, for one dealership.
- Rows: **Website** Your own site on your stock. €149 a month. / **Dashboard** Leads, stock, sales and customers. €149 a month. /
  **Website + Dashboard** Both, with every enquiry in the dashboard. €249 a month.
- Line: €500 setup for a plan with the website, none on a 2-year contract.
- Button: **See what each plan includes** (secondary)

**Section 5: How you get set up.** Four numbered steps (`STEPS` in `src/content/home.ts`).

- H2: **How you get set up**
- Lead: You deal with one person from the first call to the launch, and after it.
- 01 **Talk to us.** A short call about your yard, your stock and how leads reach you now.
- 02 **See it working.** Try the demo website yourself. We show you the dashboard on a call.
- 03 **Connect your accounts.** We connect your DoneDeal or CarsIreland account, your Google Business Profile and your WhatsApp
  Business number.
- 04 **Go live.** We build the site in your brand, check it on phones and launch it. Then we stay on for changes and support.

**Section 6: CTA band** (`CtaBand`).

- H2: **See it with your own stock in mind**
- Tell us a little about your dealership. We reply the way you ask.
- Button: **Talk to us**

The home page's WhatsApp chat section moves to the dashboard page.

### 3.2 Dealer website `/car-dealer-websites`

**Section 1: Hero.** Text left, the laptop screenshot with the phone in front right (the existing layout). Stacked on a phone.

- H1: **A website for your dealership, on your own stock**
- Lead: Built for one dealer: your name, your colours and the cars you already list. Fast on a phone, with every way for a buyer to get
  in touch.
- Buttons: **Talk to us** (primary), **Try the demo website ↗** (secondary)
- Note: The demo is a made-up dealer with sample stock. Nothing you send there reaches anyone.
- Images: `site-home` (laptop), `phone-stock` (phone)

**Section 2: Your stock, kept up to date.** Text beside `site-stock`.

- H2: **List once, on the site you already use**
- Keep listing on DoneDeal or CarsIreland and your website follows it, checking every 15 minutes. New ads go up, price changes follow,
  and a car that comes down leaves the site.
- We connect your DoneDeal or CarsIreland account when we set you up. Or keep your stock in the dashboard instead of DoneDeal or
  CarsIreland, and the site changes as soon as you save.

**Section 3: What buyers can do.** The existing `DealerTour` with the site tab only (pick a screen, see the screenshot). H2 **What
buyers see**, lead: Pick a screen. Every one is from the demo, with its made-up dealer and sample stock.

| Stop | Title | Text | Screenshot |
|---|---|---|---|
| home | Search from the first screen | Make, model, body type and price, right on the home page. | `site-home` |
| stock | Stock that is easy to search | Filters with live counts, a grid or a list, and saved cars and compare with no account needed. | `site-stock`, `phone-stock` |
| car | Every way to get in touch | Photos, the key facts and a monthly estimate, with Enquire, Test drive, Call and WhatsApp in one place. | `site-car`, `phone-car` |
| drive | Test drives booked online | The buyer picks a car, a day and a time you are open. The request comes to you by email, and with the dashboard it lands in your calendar. | `site-test-drive` |
| finance | Finance with your wording | A monthly estimate at your lender’s rate, with the representative example you must show. We never make up rates. | `site-finance` |
| trade | Trade-ins and cars to sell | The buyer sends the reg, the mileage and photos. You reply with a price. | `site-trade-in` (recapture) |
| finder | Find me a car | Can’t see the car they want? They tell you what they are after, and you look for it. | `site-find-a-car` |
| reviews | Your Google reviews | Shown as Google gives them, with the rating and a link to every review. We never pick or hide them. | `site-reviews` |
| vans | Vans with prices before VAT | Commercials show the price before VAT, so trade buyers see what they pay. | `site-commercial` |

**Section 4: Where enquiries go.**

- H2: **Every enquiry reaches you**
- Each enquiry is emailed to the addresses you choose. With the dashboard, it lands there too, with the car, what they asked and how
  they want a reply.
- Every one is kept with the consent it was sent under, and old ones are cleared after a set time.

**Section 5: Built properly.** Four short items in a grid (2 columns from `sm`).

- H2: **The parts you don’t see**
- **Fast on a phone.** Tested on a mid-range phone before launch.
- **Ready for Google.** Page titles, details for each car that search engines read, and your local details. No one can promise a
  ranking.
- **Spam checks on every form.** And a limit on how often one person can send.
- **Your buyers’ data handled properly.** We keep only what a form needs, and can show, export or delete it when someone asks.

**Section 6: Questions** (`Faqs`, H2 **Questions**)

- **Can we try it before we talk to you?** Yes. The demo website is live for anyone, with a made-up dealer and sample stock.
- **Do we keep DoneDeal or CarsIreland?** Yes. Keep listing there and the site follows it. We connect your account when we set
  you up.
- **Can our team update cars without a developer?** Yes. Change the ad on DoneDeal or CarsIreland and the site follows within 15
  minutes. Or keep your stock in the dashboard instead of DoneDeal or CarsIreland.
- **Where do enquiries go?** By email to the addresses you choose, and into the dashboard if you have it.
- **Can we show finance?** Yes. The estimator uses your lender’s rate and the representative example and warnings you must show. We
  never make up rates.
- **Will the website rank on Google?** We set up what Google looks for: speed, page titles, details for each car and your local
  details. No one can promise a ranking.
- **What does it cost?** €149 a month before VAT, plus €500 setup, or no setup on a 2-year contract. With the dashboard, €249 a month
  for both.

**Section 7: CTA band.** H2 **See it with your own stock in mind**. Text: Tell us a little about your dealership. We reply the way you
ask. Button **Talk to us**.

### 3.3 Dealer dashboard `/car-dealer-dashboard` (new)

**Section 1: Hero.** Text left, `dash-overview` (laptop) with `phone-dash-overview` in front, right. Stacked on a phone.

- H1: **Every lead, car and sale in one place**
- Lead: The dashboard behind your dealership. Answer leads, book test drives, track stock and margins, and keep in touch with customers.
- Buttons: **Talk to us** (primary), **See prices** (secondary)
- Note: We show you the dashboard on a call, with a made-up dealer.

**Sections 2 to 10: one per job.** Each is H2, one or two short paragraphs, then the screenshot. Text and screenshot alternate sides
from `lg`; on a phone the text is always first and the phone screenshot is used. Each has an `id` so it can be linked.

2. `#leads` **Leads and follow-ups** (`dash-leads`, `dash-lead`)
   - Every enquiry from your website, DoneDeal and CarsIreland lands here with the car and what they asked. Each one has an owner and a follow-up date, so
     nothing waits in someone’s inbox.
   - Reply in one tap by call, email or WhatsApp, with a first reply already written: the car, its price and its link. Each morning,
     everyone gets an email of the follow-ups due.

3. `#alerts` **Alerts on your phone** (the existing `WhatsAppChat`, the trade-in conversation)
   - Add the dashboard to your phone’s home screen and new leads and test drive requests arrive as notifications.
   - On WhatsApp, your team can answer from the yard: confirm a test drive, drop the price on a car that has been in stock too long, or,
     with the website, reply to a trade-in with a price. Buyers only get WhatsApp messages if they asked for them.
   - We connect your WhatsApp Business number when we set you up.
   - Chat caption: A trade-in sent from the website. From the demo, with a made-up buyer: in the demo, messages stay inside it.

4. `#test-drives` **Test drives** (`dash-drives`)
   - Bookings from the website land here to confirm, move to another time, mark done or mark as a no-show. Times already booked are not
     offered to the next buyer.

5. `#stock` **Stock** (`dash-stock`)
   - Days in stock on every car, and a suggested price drop on cars that have been on sale too long. We set the number of days and the
     drop with you.
   - Add cars and photos here, or let them come from DoneDeal or CarsIreland. Change the price of several cars at once.

6. `#margins` **Sales, margins and prep costs** (`dash-car-costs`)
   - Record each sale with the buyer, the warranty and any trade-in. Add prep costs, like a valet, tyres or the NCT, and see the margin
     after them.
   - Only the people you choose see costs and margins. Export your sales for your accountant.

7. `#reviews` **Reviews** (`dash-reviews`)
   - Your Google reviews in one list, the low ones first. Reply from the dashboard. After a sale, ask the buyer for a review in one tap.
   - We connect your Google Business Profile when we set you up.

8. `#customers` **Customers and reminders** (`dash-customer`)
   - A page for each customer with what they bought and its warranty, and any warranty claims.
   - Buyers who agreed to hear from you get a reminder 30 days before their NCT is due, and when a service is due.

9. `#reports` **Reports and the monthly report** (`dash-reports`)
   - Sales, profit, days to sell and which lead sources bring buyers, month by month. With the website, where visitors come from.
   - On the 1st of each month, a summary of the month before by email. A salesperson sees only their own figures.

10. `#history` **Reg lookup and history check** (`dash-history`)
    - Staff look a car up from its reg to fill in the make, model and year. A history check shows finance owed, a write-off, mileage
      that does not add up, an import, the number of owners and the NCT date.

**Section 11: Your team, and AI writing.** Two short columns, no screenshot.

- `#team` H2 **Your team**: Logins for as many people as you need, each with a role: owner, manager, sales or finance. Costs and margins only for the roles that need them. Every change is
  in the activity history, with who made it.
- `#ai-writing` H2 **AI writing**: First drafts of car descriptions, replies to leads and review replies, from your own stock. Your team
  reads and changes them before anything is sent. Included in the plan.

**Section 12: Questions** (`Faqs`)

- **Can we see it before we sign up?** Yes. We show you the dashboard on a call, with a made-up dealer and sample data.
- **Do we need the website too?** No. The dashboard works on its own. Enquiries from DoneDeal and CarsIreland come into it, as well as
  those from a Checkwork website.
- **Who sees our margins?** Only the people you choose. Without the right role, costs and margins never reach their screen.
- **Does it work on a phone?** Yes. Add it to your home screen and it opens like an app, with notifications. On an iPhone this needs
  iOS 16.4 or later.
- **Will buyers get WhatsApp messages they did not ask for?** No. A buyer gets WhatsApp messages only if they ticked the box on the
  form. Otherwise they get an email, or your team is told to call.
- **What happens past the allowance?** Each extra lookup or WhatsApp message is billed at the price on the pricing page, and history
  checks are paid per check, up to a monthly limit you can set. At the limit it stops until the next month.

**Section 13: CTA band.** H2 **See the dashboard on a call**. Text: Tell us a little about your dealership and we will show you around
it. Button **Book a call**, to `/contact?need=dashboard&call=1`, which ticks The dashboard and Call me.

### 3.4 Pricing `/pricing`

**Section 1: PageHead.**

- H1: **Prices**
- Lead: For one dealership, a month, before VAT, on a 1 or 2 year contract. The price does not change with the number of cars.
- Buttons: **Talk to us** (primary), **Try the demo website ↗** (secondary)

**Section 2: The plans.** Three cards (the existing `Plan` layout, subgrid rows). On a phone, the at-a-glance list first (existing),
then the cards stacked. **Website + Dashboard** is the light card ("paper"). The old "Recommended" label goes: the light card is the only emphasis, and
we have no dealers yet to back a label.

| | Website `#plan-website` | Dashboard `#plan-dashboard` | Website + Dashboard `#plan-both` |
|---|---|---|---|
| Price | €149 a month | €149 a month | €249 a month |
| Under the price | €500 setup, none on a 2-year contract. Before VAT. | No setup fee. Before VAT. | €500 setup, none on a 2-year contract. Before VAT. |
| Button | Talk to us about the website (`/contact?need=website`) | Talk to us about the dashboard (`?need=dashboard`) | Talk to us about both (`?need=both`) |
| List lead | Your own website. | Everything to run the yard. | Both, working together. |
| List | Your own site on your DoneDeal or CarsIreland stock; Car pages with enquire, call and WhatsApp; Test drive requests, sent to you by email; Finance estimator with your lender’s wording; Trade-in and sell your car; Find me a car; Vans with prices before VAT; Your Google reviews; Enquiries by email | Leads and follow-ups; Alerts on your phone, and on WhatsApp; Test drives; Stock with days in stock and suggested price drops; Sales, margins and prep costs; Reviews, with replies; Customers with NCT and service reminders; Reports and the monthly report; Reg lookup and history check for staff; AI writing; Logins for your whole team, each with a role | Everything in Website and Dashboard; Every enquiry from your website in the dashboard |

**Section 3: Included each month.** Table from `md`, one short list per plan below it (existing pattern).

- H2: **Included each month**
- Lead: Past these, you pay per use, up to a limit.

| | Website | Dashboard | Website + Dashboard |
|---|---|---|---|
| Reg lookups | None | 100 | 100 |
| WhatsApp alerts and confirmations | None | 500 | 500 |
| History checks | None | Paid per check | Paid per check |
| AI writing | None | Included | Included |

**Section 4: Past the allowance, and limits.** Two columns from `md` (existing `PriceList`).

- H2: **Past the allowance**. Lead: Each use, before VAT. Replies to buyers, reminders and review requests are billed from the
  first one. History checks
  are paid per check, with none included.
  - Reg lookup €0.30
  - WhatsApp alert or confirmation €0.05
  - WhatsApp reply to a buyer €0.03
  - WhatsApp reminder or review request €0.12
- H2: **Monthly limits**. Lead: Extra use stops at these amounts until the next month. You can set lower ones in the dashboard.
  - Reg lookups €15
  - History checks €25 (a cap, not a price per check)
  - WhatsApp €20

**Section 5: Paying.** (existing `dl` layout)

- H2: **Paying**
- **A 1-year contract.** The monthly price, and €500 setup for a plan with the website.
- **A 2-year contract.** The monthly price, with no setup fee.

**Section 6: Questions** (H2 **Questions about prices**)

- **Do the prices include VAT?** No. Every price on this page is before VAT, which is added at 23%.
- **What does the setup fee cover?** Building your website: your brand and content, connecting your stock, your Google listing,
  WhatsApp and email, and the launch. The dashboard alone has no setup fee.
- **Does the price go up with more cars?** No. The plans are flat for one dealership, whatever your stock.
- **We have more than one branch.** Talk to us. The plans are for one dealership for now.
- **What happens at the monthly limit?** That service stops until the next month. Staff type the car’s details in, and
  WhatsApp alerts go by email instead.
- **Are DoneDeal or CarsIreland fees included?** No. You keep your own account with them and pay them as now.

**Section 7: CTA band.** H2 **Find the right plan for your yard**. Text: Tell us about your dealership. We will reply and price it
with you. Button **Talk to us**.

Removed from pricing: the three old plans and their sizes ("30 to 70 cars"), branches, add-ons (Social and ads stays off the site), AI
usage prices and AI limits (AI writing is fair use, never billed), "a year upfront, 12th month free", "moving up a plan", the history
check's price, the first month free and the 12-month price lock (owner: both stay off the site).

### 3.5 About `/about`

Kept as it is, with these changes:

- Lead: Checkwork is run by one person in Ireland, building a website and a dashboard for independent used-car dealers.
- "Why only car dealers", second paragraph: All of it is in the [demo website] and the [dashboard] pages. AI writes first drafts of
  descriptions and replies for your team to check. (The link to the AI page goes.)
- Principle "Your own accounts": Your stock stays on DoneDeal or CarsIreland, your reviews on Google and your WhatsApp Business number
  with you. We connect them when we set you up.
- Principle "Prices you can see": Every plan and every price per use is on the pricing page, before VAT.
- The owner’s name and photo stay a placeholder in #2 until the owner wants them shown.

### 3.6 Contact `/contact`

Kept: the form, Turnstile, the rate limit, D1, the alert email and the steps beside the form. Changes in `src/content/contact.ts`:

- `NEEDS` (stored with each enquiry; old rows keep their old text): **The website**, **The dashboard**, **Both**, **Not sure yet**.
- `NEED_HINTS`: The website: Your own site on your stock, with finance, trade-ins and test drive requests. / The dashboard: Leads, stock, sales,
  margins and customers. / Both: The site and the dashboard, with every enquiry in the dashboard. / Not sure yet: We can work it out on
  a call.
- `PLAN_NEEDS`: `website`, `dashboard`, `both`, plus the old `showroom` (The website), `dealer` and `group` (Both).
- `STOCK_SIZES`: Under 30 cars, 30 to 80 cars, More than 80 cars, Not sure. (The old sizes matched the old plans; the new plans are
  flat. Old rows keep their text.)
- `CONCERNS`: the stock answer loses "on Dealer and Group" (Or keep your stock in the dashboard instead of DoneDeal or CarsIreland, and the website changes at once.); the
  rest stay.
- PageHead and the steps stay. The step "You pick a plan" says: We go through which plan fits your yard and what it costs. Then you
  decide.

### 3.7 Privacy `/privacy`

Unchanged. The reviewed wording stays an open item in #2.

### 3.8 Not found

Buttons: **Go to the home page**, **See the dealer website** (unchanged target).

## 4. Visual direction

The site keeps its look: Midnight canvas, the Sora and Inter pairing, one light "paper" surface per page, few colours, lines rather than
boxes. Two products is a content change, not a new brand. From `apple-design`: response on press, restraint, hierarchy from weight and
size together, tracking and leading that follow size, respect for reduced motion, transparency and contrast settings.

### Colour tokens (semantic only)

Components use the semantic utilities (`bg-canvas`, `text-fg-muted`, `border-line`), never a raw colour. The site gains a light theme
that follows the phone’s setting (`prefers-color-scheme`); dark is the other. Both sets live in `src/styles/globals.css` as `:root` values; no component changes for the theme. The logo swaps between
`checkwork-logo-on-dark.svg` and `checkwork-logo-on-light.svg` (both in the brand pack, copied to `public/brand/`). The big shadows
are lighter in the light theme.

| Token | Use | Dark (now) | Light (new) |
|---|---|---|---|
| `canvas` | Page background | #0b0f1f Midnight | #f4f6fb |
| `surface` | Bands, cards, frames | #121832 | #ffffff |
| `fg` | Text | #f5f6fa | #161a33 |
| `fg-muted` | Secondary text | #aab0cc | #4a5070 |
| `line` | Dividers, borders | white 11% | #161a33 at 12% |
| `accent` | Underline on the current nav item, marks | #6366f1 Indigo | #6366f1 |
| `accent-alt` | Links, step numbers, ticks | #a78bfa Lavender | #4f46e5 |
| `action` / `action-hover` | Primary button | #5a5deb / #4a4ede | same |
| `on-action` | Text on the primary button | #ffffff | same |
| `paper` / `ink` / `ink-muted` | The one light sheet (launch check, the recommended plan) | #f4f6fb / #161a33 / #4a5070 | #ffffff / #161a33 / #4a5070, with the `lift` shadow doing the separating |
| `bad` | Errors | #fca5a5 | #b91c1c |

Each light value must pass the axe contrast check the E2E suite runs (4.5:1 for text). `prefers-contrast: more` firms up `line` and
`fg-muted` in both themes, as now.

### Type scale

Sora for headings (`font-display`), Inter for everything else. Sizes in `rem` so they grow with the user’s text size. Tracking and
leading as already set in `globals.css` (h1 -0.03em / 1.04, h2 -0.022em / 1.1, h3 -0.012em / 1.25).

| Role | Phone | From `md` | Weight |
|---|---|---|---|
| H1 (home) | 2.25rem (`text-4xl`) | 3.75rem to 4.5rem | 700 |
| H1 (other pages) | 2.25rem | 3.75rem (`text-6xl`) | 600 |
| H2 | 2.25rem | 3rem (`text-5xl`) | 600 |
| H3 | 1.25rem | 1.25rem to 1.5rem | 600 |
| Lead | 1.125rem | 1.25rem | 400, `fg-muted` |
| Body | 1rem | 1rem | 400 |
| Small print, captions | 0.875rem | 0.875rem | 400, `fg-muted` |
| Prices | `font-display`, tabular figures | | 600 |

### Spacing and layout

- Container: `min(100% - 2.5rem, 75rem)`, so a 20px gutter on a phone. Sections `py-20`, `md:py-32` (`Section`). A section is
  separated from the next by a `line` border, or a `surface` band for the setup steps and the CTA.
- Inside a section: heading block gap 12px (`gap-3`), heading to content 40 to 56px (`gap-10`, `gap-14`).
- Phone first: every layout is written for 360px and checked at 320px with 200% text. No horizontal scroll. Two columns from `md` or
  `lg` only where both columns keep at least 20rem.
- Touch targets at least 44px tall.

### Components

| Component | Status | Where |
|---|---|---|
| `Header`, `Footer`, `Container`, `Section`, `Button`, `PageHead`, `CtaBand`, `Faqs`, `JsonLd`, `ContactForm`, `Turnstile` | Reuse | Every page |
| `DemoButton` | Reuse, label changes to "Try the demo website" | Home, website, pricing |
| `Shot` (laptop shot that swaps to the phone shot below `sm`) | Reuse | Every screenshot |
| `DealerTour` | Reuse with one tab (the website); the dashboard tab goes | Website page |
| `WhatsAppChat` | Reuse | Dashboard page, alerts |
| Launch sheet (home hero) | Reuse with new checks | Home |
| `ProductCard` | New: a screenshot, an H3, two lines, the price and a link; the whole card is the link target | Home, section 2 |
| `Feature` | New: an H2 section with text and a screenshot, alternating sides from `lg`, an `id` for linking | Dashboard page, website section 2 |
| `Steps` | New, from the home page’s inline steps: numbered list, used for setup and "from a tap to your phone" | Home |
| `Shot` placeholder | `Shot` with no image yet: a `surface` box marked "Screenshot to come" with what it will show (section 5) | Wherever a shot is not captured |
| `Plan`, `PriceList` (pricing page) | Reuse, new data | Pricing |

No badges or pills ("New", "Coming soon", "Beta").

### Motion (restrained)

- Kept: the launch sheet’s ticks drawing in and the stamp landing (once, on load), the hero text rising (`rise`), the page crossfade
  (view transitions), button press scale (0.97, 100ms), the header’s blur appearing on scroll.
- New: none, except the screenshot swap in `DealerTour` (the existing 200ms fade).
- Transform and opacity only. Everything ends at once under `prefers-reduced-motion`. No scroll-triggered reveals, no parallax, no
  autoplaying carousels.

## 5. Screenshots

All from the demo dealer (a made-up dealer with made-up data only): the demo website (www.demo.checkwork.ie) and the demo dealer in the
dashboard (the dev dashboard, signed in as the demo owner so every feature shows). Never a real dealer’s data, never a real person’s name,
phone or email on screen. Format WebP, in `public/dealer-demo/`.

- **Laptop:** 1920 x 1200, captured at 1440 x 900 CSS pixels and device scale 1.333 (the size `Shot` expects).
- **Phone:** 780 x 1688, captured at 390 x 844 CSS pixels, scale 2.
- Taken in the product’s light theme, so they read on both site themes. The demo bar, if shown, is cropped out.
- Alt text says what the screen shows and that it is the demo ("Demo dealer dashboard list of leads with their status").

Until a shot is captured, its slot shows a marked placeholder (a `surface` box with the line "Screenshot to come" and what it will show)
and the shot is listed in #2. The older dashboard shots (`dash-*`) are real screenshots of the demo dealer and stay in use until they are
recaptured.

| File | Screen | Used in | Status |
|---|---|---|---|
| `site-home.webp` | Demo website home | Website hero, tour | Have; recheck it matches the demo today |
| `phone-stock.webp` | Demo website used cars, phone | Website hero, tour | Have; recheck |
| `site-stock.webp` | Demo website used cars | Website section 2, tour | Have; recheck |
| `site-car.webp`, `phone-car.webp` | A car page | Tour | Have; recheck |
| `site-finance.webp` | Finance estimator | Tour | Have; recheck |
| `site-trade-in.webp` | Trade-in form | Tour | **Recapture**: the current one shows a reg lookup the site no longer has |
| `site-test-drive.webp` | Test drive booking | Tour | Placeholder |
| `site-find-a-car.webp` | Find a car | Tour | Placeholder |
| `site-reviews.webp` | Reviews | Tour | Placeholder |
| `site-commercial.webp` | Commercials with prices before VAT | Tour | Placeholder |
| `home-website.webp`, `phone-home-website.webp` | Demo website home, framed for the product card | Home, section 2 | Placeholder (may reuse `site-home`) |
| `home-dashboard.webp`, `phone-home-dashboard.webp` | Dashboard overview | Home, section 2 | Placeholder |
| `dash-overview.webp`, `phone-dash-overview.webp` | Dashboard overview | Dashboard hero | **Recapture**: the current one is from the old dashboard inside the demo |
| `dash-leads.webp` | Leads list | Dashboard, leads | **Recapture** |
| `dash-lead.webp`, `phone-dash-lead.webp` | One lead with its reply buttons | Home section 3, dashboard leads | **Recapture** |
| `dash-drives.webp` | Test drives | Dashboard | **Recapture** |
| `dash-stock.webp` | Stock with days in stock and a suggested drop | Dashboard, contact concerns | **Recapture** |
| `dash-car-costs.webp` | A car’s page with prep costs and margin | Dashboard | Placeholder |
| `dash-reviews.webp` | Reviews | Dashboard | Placeholder |
| `dash-customer.webp` | A customer with purchases and NCT due | Dashboard | Placeholder |
| `dash-reports.webp` | Reports | Dashboard | **Recapture** |
| `dash-history.webp` | A history check on a car (a demo plate) | Dashboard | Placeholder |
| `dash-analytics.webp` | Analytics | Contact concerns | **Recapture** |
| `og-image.png` | 1200 x 630 share image for the two products | Every page’s share tags | Placeholder: the current alt text speaks of the old agency |

`trade-1/2/3.webp` (the trade-in photos in the WhatsApp chat) stay.

## 6. SEO

| Page | Title (the template adds " · Checkwork" unless absolute) | Description |
|---|---|---|
| Home | Checkwork: websites and a dashboard for car dealers in Ireland (absolute) | A website on the stock you list on DoneDeal or CarsIreland, and a dashboard for your leads, stock, sales and customers. For car dealers in Ireland, from €149 a month. |
| Website | Car dealer websites in Ireland | Your own dealer website on your DoneDeal or CarsIreland stock, with finance, trade-ins, test drives and your Google reviews. €149 a month before VAT. Try the demo. |
| Dashboard | Dealer dashboard for car dealers in Ireland | Leads and follow-ups, test drives, stock and days in stock, margins and prep costs, reviews, customers with NCT reminders and reports. €149 a month before VAT. |
| Pricing | Prices for car dealers | Website €149, Dashboard €149, or both for €249 a month before VAT, for one dealership. €500 setup with the website, none on a 2-year contract. |
| About | Who builds Checkwork for car dealers | Checkwork is run by one person in Ireland, building a website and a dashboard for independent used-car dealers. |
| Contact | Talk to us about your dealership | Tell Checkwork about your dealership and how you want a reply. We read every message. |
| Privacy | Privacy notice | (unchanged) |

Structured data (`src/lib/schema.ts`), only facts the site states:
- `ProfessionalService` (the organisation): description from the new `SITE.description` ("A website and a dashboard for car dealers in
  Ireland, on the stock you already list."), and `hasOfferCatalog` with three `Offer`s built from the new plans: name, monthly price,
  `valueAddedTaxIncluded: false`, and the setup in the offer’s description.
- `Service` on the website page (serviceType "Website design for car dealerships") and on the dashboard page (serviceType "Dealer
  management software"), each with `provider` the organisation.
- `FAQPage` from each page's questions (the existing `Faqs` component). No ratings or reviews (we have none), no address or phone until
  #2 has them.

Sitemap (`src/app/sitemap.ts`): remove `/car-dealer-ai`, add `/car-dealer-dashboard`. Robots unchanged. Every page keeps one H1, a
canonical and share tags (the E2E check).

## 7. What goes, what stays

**Removed**
- The page `/car-dealer-ai` and `src/content/dealer-ai.ts`, with its claims (newsletters, TikTok and social posting). Redirected to the
  dashboard’s AI writing section.
- `ROUTES.dealerAI`, its nav item and every link to it (about, the website page).
- The old plans Showroom, Dealer and Group (€249, €449, €749), branches, add-ons, AI usage prices and limits, the year-upfront deal,
  and the plan sizes, from `src/content/pricing.ts`, the home page, the FAQs and the structured data.
- The home page’s WhatsApp section, the website page’s WhatsApp section and its dashboard tour tab (all move to the dashboard page).
- Claims the products no longer make: a reg lookup on the website’s trade-in form; "price alerts" for buyers; the old `FEATURES` list
  on the website page.

**Stays**
- The contact form, Turnstile, rate limit, D1 storage, alert email.
- `/admin`, behind Access, not in the sitemap.
- `/privacy`.
- The redirects from `/services` and `/work`, and from the bare domain.
- The brand, fonts, tokens (plus the light set), the launch sheet, the motion.

**Code the build touches (for the phase 2 plan):** `src/lib/config.ts` (ROUTES, NAV, SITE), `next.config.ts` (redirect),
`src/app/sitemap.ts`, `src/lib/schema.ts`, `src/lib/metadata.ts` (OG alt), `src/content/*`, the pages above, a new
`src/app/car-dealer-dashboard/page.tsx`, `src/styles/globals.css` (light tokens), `e2e/public.spec.ts` (`PAGES` and the redirect test),
`scripts/lighthouse.mjs`, the README’s page list.

## 8. Owner decisions (2026-11-24)

1. Connections (DoneDeal and CarsIreland stock, One Auto lookups and history checks, WhatsApp, Google review replies) are presented as
   working features set up during onboarding, with no caveat.
2. Website-only stock comes from the dealer's DoneDeal or CarsIreland account, connected at setup.
3. Dashboard-only: enquiries from DoneDeal and CarsIreland come into the dashboard, as well as those from our websites.
4. The first month free and the 12-month price lock stay off the site.
5. No history check price: "paid per check".
6. The Social and ads add-on stays off the site.
7. Carzone is left out.
8. A light theme that follows the phone's setting, with dark as the other. Semantic tokens only, both themes checked.
9. The demo dashboard is shown on a call only, never a public link.
10. "Book a call" is the enquiry form with the call option. No calendar booking.
11. Logins for as many people as needed.
12. Website + Dashboard is the highlighted card, with no "Recommended" label.
