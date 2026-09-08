# How We Build An App And Actually Sell It

_Robusca | 2026-09-07 | Decision doc — needs one call from Agent Lord before any code_

---

## The blunt version

"Build an app and sell it" is the wrong shape for the question. Building the app is now the cheap part — a competent agent swarm ships a working product in weeks. **Distribution is the asset, and you already own some.** Almost every app that dies had working code and no route to a paying user.

So the sequence that actually works is inverted from how most people do it:

1. Build the app for **a set of users you can already reach by name**.
2. Get them using it until it is load-bearing in their day.
3. **Then** sell that proven thing to the next hundred businesses that look exactly like them.

You have a named list of 33 premium restaurants in `deployment/studex_os/WHOLESALE_RESTAURANT_GTM.md` and a plan to land 40 accounts in Year 1. That list *is* the distribution. Anything we build that doesn't use it starts from zero.

## The pick: a wholesale reorder app for the Studex Meat accounts

**What it is:** a private ordering app for the restaurants buying from Studex Meat. Chef opens it, sees their tier pricing, taps a saved order or edits last week's, picks a delivery slot, submits. Studex sees the order and the invoice status in one dashboard.

**Why this one and not something else:**

- **The users are already being acquired.** Every sample box and tasting in the 90-day plan ends with "how do I reorder?" Right now the answer is WhatsApp and a phone call. That's the wedge.
- **Reordering is a habit, so retention is structural.** A restaurant orders meat every single week. That's the highest-frequency B2B behaviour there is, which is exactly what a consumer app has to spend fortunes to manufacture.
- **It pays for itself without being sold.** It doesn't need a subscription to be worth building: it raises order frequency and average order value on a pipeline already targeting R165k MRR from five accounts. Every standing order it converts from "chef remembers to call" to "chef taps twice" is margin.
- **It generates the data nobody else in SA premium meat has** — what each venue buys, when, at what volume, trending which direction. That's the input for forecasting, for cold-chain routing, and eventually for pricing power.

### What I'd say no to, and why

**The Client App Factory** in `studex/cto-playbook.md` — Google Form in, auto-built app out. Clever, and technically very buildable now. But it's a services business: every client is a bespoke support obligation forever, revenue is one-off, there's no moat (the client can regenerate their own app next year with better tools), and it competes on price with every agency in Gauteng. It's a way to bill, not a way to compound. Park it.

**A consumer Studex Meat shopping app.** Shopify already does this and does it better. A native app adds an app-store gatekeeper, two build targets, and a 15–30% platform cut on your own margin, in exchange for roughly nothing a good mobile web store doesn't already do. The only reason to build consumer native is push notifications and repeat-purchase loyalty, and you can get most of that from WhatsApp, where your customers already live.

## How to build it

The CTO playbook picks React Native + Expo. **I'd push back for this specific product: ship a PWA first.**

| | Why it wins here |
|---|---|
| No app store | No review queue, no rejections, no 15–30% cut, ship fixes the same hour |
| Runs everywhere | Chefs and F&B managers work off tablets, back-office desktops, and phones — a PWA covers all three from one build |
| Installable | "Add to Home Screen" gives you an icon on the chef's phone, which is 90% of what native buys you |
| Sales-friendly | A rep can open it in a browser during the tasting. No "download this first" friction |

Go native later, if and only if you need something a browser genuinely can't do. For a reorder app, you won't.

**Stack** (keeping what the playbook already committed to, so we're not relitigating settled decisions):

- **Next.js on Vercel** — already the house standard, already deployed there
- **Supabase** — Postgres, auth, real-time, storage; already in the stack and already chosen as the production data layer
- **Shopify Admin API** as the product/inventory source of truth, so we're not maintaining a second catalogue
- **WhatsApp Business API** for order confirmations and delivery notices — already integrated per `skills/studex-meta-whatsapp/SKILL.md`, and it's where these relationships actually happen
- **n8n** for the order → invoice → delivery-schedule automation

**Scope for v1 — resist everything else:**

1. Login per venue, showing *that venue's* tier pricing (Silver/Gold/Platinum)
2. Product list with real availability
3. "Reorder last order" as the single most prominent button on the screen
4. Delivery slot selection respecting their tier's schedule (weekly / twice-weekly / on-demand)
5. Order history and invoice status
6. Admin view: incoming orders, pack list, delivery run

That's it. No loyalty points, no chat, no analytics dashboards for the customer, no multi-supplier marketplace. Each of those is how this slips from weeks to quarters.

## The thing most people get wrong: how the money moves

Your wholesale model runs on **credit, not card checkout** — 7-day EFT on Silver, 14-day on Gold, 30-day accounts on Platinum, per the GTM doc. That means:

- The app must **place an order against an account and issue an invoice**. It must not demand a card at checkout. Ask a chef for a card to reorder their weekly ribeye and they'll go back to WhatsApp permanently.
- Payment tracking matters more than payment collection. The valuable screen is "who owes what, how overdue" — because credit risk is the actual danger in wholesale food, not conversion rate.
- Card rails (Yoco, Paystack, Peach) come in later, and only as a *convenience* for Silver-tier and one-off orders.

This single distinction is the difference between an app chefs use and an app chefs resent.

## Then, how we sell it

**Phase 1 — sell it to nobody. Zero CAC.**
Roll it out free to the accounts the 90-day plan is already landing. The rep sets it up on the chef's phone at the tasting. Success is not signups; it's the share of orders that arrive through the app instead of WhatsApp. Get that past ~70% across 8–10 accounts and you have a product. Below that, you have a demo.

**Phase 2 — this is the actual sellable asset.**
A working wholesale ordering system for premium SA food suppliers, proven on real accounts. The buyers are the businesses in the competitor table of the GTM doc — Frankie Fenner, Rossouw, Angus Meat Supply, the regional biltong and seafood suppliers, specialty produce wholesalers. Every one of them runs orders through WhatsApp and a spreadsheet.

You sell it as **white-label, per supplier, per month**, with a setup fee for catalogue onboarding. Ballpark for SA B2B SaaS at this size: R3,500–R12,000/month depending on account count, plus R15,000–R40,000 setup. Twenty suppliers at R7,000 is R1.68m ARR off a build you needed anyway. Those numbers are estimates to argue with, not a quote — real pricing comes from what the first three prospects flinch at.

The pitch writes itself and it's the strongest one in B2B software: *"We built this to run our own wholesale book. Here's our order volume through it. Now you can have it."* That is a fundamentally different sale from "we built an app, want to buy it."

**A note on ads:** for phase 1, paid ads are worthless — you're selling to 40 named venues, and the cheapest channel is a rep with a cooler box. For phase 2, ads are weak too: this is a sub-500-buyer market in SA, so LinkedIn outreach, industry events (FEDHASA, Africa Food Show), and referrals from the first suppliers will beat any ad spend. Save the ad budget for consumer Studex Meat, where it belongs.

## What to do first

1. **Agent Lord decides:** build the wholesale reorder app, or something else. Nothing starts until this is called.
2. If yes — a one-page spec of the six v1 features above, no more, so scope can't creep.
3. New repo (this belongs in `studex-platform`, not the brain repo), Supabase project, Vercel deploy from day one.
4. Pick **one** friendly account from the first tastings as design partner. Build against their actual weekly order.
5. Ship a clickable version and put it in front of that chef before writing the admin side. Their reaction reorders the whole roadmap.

## The honest risk

The failure mode here isn't technical — it's building this before the accounts exist. A reorder app with two accounts is a spreadsheet with extra steps. If the 90-day wholesale plan hasn't landed at least three or four recurring accounts, **the app is premature and the effort should go into landing accounts instead.**

So the real first question isn't "how do we build an app." It's: **where are we against the 5-account target?** Tell me that and I'll either start the build or tell you to hold.
