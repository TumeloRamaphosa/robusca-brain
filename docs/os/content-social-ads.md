# Content, Email, Social & Ads — Execution Surfaces

This is the **execution layer**: every surface that produces or sends something. Every one of
them ends at an **approval gate**. Nothing leaves the machine without Agent Lord's explicit
approval — see [security-and-approvals.md](security-and-approvals.md).

## 1. The content pipeline

```
Brief intake
   • product, offer, audience, channel, visual direction
        │
        ▼
Asset generation
   • Freepik (images / design assets)
   • Higgsfield (video / motion media)
   • AestheticsMeet (brand-aesthetic styling / consistency)
        │
        ▼
Review queue (War Room)
   • previews, captions, platform-specific copy
   • brand + product + Halaal compliance checks
        │
        ▼
╔═══════════════════════════════╗
║  APPROVAL GATE — Agent Lord   ║   ← nothing proceeds without explicit approval
╚═══════════════════════════════╝
        │
        ▼
Distribution
   • FeedHive (social scheduling)
   • Email (newsletters / campaigns)
   • WhatsApp (customer messaging)
   • Meta Ads (paid creatives)
        │
        ▼
Feedback loop
   • analytics + sales data return to War Room for future briefs
```

## 2. Tools & surfaces

| Tool | Role in the OS | Approval needed before… |
|------|----------------|-------------------------|
| **Freepik** | Image / design asset generation | n/a (generation only) — but assets pass brand/Halaal QA |
| **Higgsfield** | Video / motion media generation | n/a (generation only) — assets pass QA |
| **AestheticsMeet** | Brand-aesthetic styling & visual consistency | n/a (styling only) |
| **FeedHive** | Social post scheduling across platforms | scheduling/publishing any post |
| **Email** | Newsletters / campaigns / replies | sending any email |
| **Meta (Facebook/Instagram) Ads** | Paid campaigns & boosts | launching/editing any paid campaign |
| **WhatsApp** | Customer messaging | sending any customer message |
| **Google email triage** | Inbox sorting & draft prep | sending any reply (drafts are fine) |

## 3. Email setup

- **Inbound triage (Google):** classify, label, and summarize inbox; prepare **drafts**
  only. Drafting and labeling are safe; **sending is an approval action.**
- **Outbound campaigns:** assembled in the content pipeline, staged in the review queue,
  sent only after approval.
- Credentials (Gmail / mail provider) are referenced by handle/env var, never stored here.

## 4. Facebook / Meta — ads, social & permissions audit

Before any paid or published Meta activity:

1. **Permissions audit** — confirm which Pages, ad accounts, and pixels the OS has access to,
   and at what role (admin vs. analyst). Document the inventory (not the tokens).
2. **Read-only first** — start with campaign/insights read access; verify reporting matches
   Ads Manager.
3. **Approval-gated writes** — creating/editing campaigns, changing budgets, or launching
   boosts are all approval actions.
4. **Audit workflow** — every ad change is logged with who/what/why and surfaced to Agent
   Lord via Reload `studex-system-alerts` or the War Room.

## 5. WhatsApp setup

- Used for **customer notifications and replies** (orders, fulfilment, support).
- Inbound messages can be read and triaged automatically.
- **Every outbound customer message is an approval action** unless it is a pre-approved
  templated transactional message (e.g. order-confirmation) that Agent Lord has explicitly
  signed off as a standing template.
- Provider credentials referenced by handle/env var only.

## 6. FeedHive (scheduling)

- FeedHive is the **scheduling/distribution surface** for approved social content.
- The pipeline produces platform-specific copy + assets; FeedHive holds the calendar.
- A post is only pushed into FeedHive's publish queue **after** the approval gate.

## 7. Media generation — Freepik & Higgsfield

- **Freepik** → still images and design assets.
- **Higgsfield** → video / motion.
- Both feed the review queue. Generated media must pass **brand, product, and Halaal quality
  checks** before it can be scheduled or published.
- **AestheticsMeet** enforces visual consistency / brand aesthetic across generated assets
  (Black & Gold, luxury, intentional, global).

## 8. Compliance checks (every asset)

- Brand alignment (Black & Gold, premium typography, luxury feel).
- Product accuracy (correct product, claims, pricing).
- Halaal certification represented correctly.
- Privacy: customer names as initials only; monetary values prefixed `R`.

_Last updated: 2026-06-14._
