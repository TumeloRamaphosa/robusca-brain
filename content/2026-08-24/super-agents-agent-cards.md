# Super Agents — Agent Collection card copy

**Prepared:** 24 Aug 2026
**Status:** DRAFT AWAITING AGENT LORD APPROVAL

Completes section 3 ("Agent cards") of the Super Agents launch pack, which
specified the card structure and worked only the Retail example. The remaining
seven role cards are below in the same structure.

Launch pack: `content/2026-08-23/super-agents-launch-pack.md`
([PR #18](https://github.com/TumeloRamaphosa/robusca-brain/pull/18)).
Canonical implementation guidance: `SUPER_AGENTS_CONSOLIDATION.md`.

Site edits happen **only** in the Mac1 Gitea `superagents-site/index.html`.
This file is copy source, not an alternative website. The public GitHub
`superagents-site` copy is stale and must never be deployed.

---

## Card structure

Every card carries five elements, per the launch pack:

1. role and ideal customer;
2. three realistic workflows;
3. one "requires human approval" example;
4. plan availability;
5. `Apply with this role` CTA.

Each card replaces its individual monthly price with the shared availability
line. No card may promise a live integration, a dedicated number, autonomous
outbound messaging or a compliance posture.

---

## Constraints applied to this copy

- Regulated roles (clinics, legal, and any finance-adjacent workflow) are
  scoped to **administration only**. No card implies clinical, legal or
  financial advice or decisions.
- No card names a third-party system as connected. Systems appear only as
  "systems agreed during onboarding".
- The multilingual card does **not** state a language count. The launch pack
  bans "eleven-language accuracy"; languages are confirmed per client.
- No card claims always-on operation, guaranteed response times or automatic
  learning from conversations.

---

## 1. Retail Agent

*(From the launch pack, reproduced for a single continuous source.)*

```text
Retail Agent

For online and physical retailers that need consistent customer-care support.

• Answer approved product and policy questions
• Prepare order-status responses for review
• Identify unanswered enquiries and follow-up opportunities

Human approval: refunds, discounts, outbound campaigns and account changes.

Available with Managed Pilot or Managed Operations.
```

---

## 2. Clinic Administration Agent

```text
Clinic Administration Agent

For practices and clinics whose front desk is absorbing repetitive
administrative questions.

• Answer approved questions on hours, location, preparation and process
• Prepare appointment and rescheduling requests for staff confirmation
• Assemble a daily list of enquiries needing a human callback

Human approval: every patient-facing message, appointment change and record
access.

This role covers administration only. It does not triage symptoms, interpret
results or give clinical guidance. Healthcare workflows require separate risk,
privacy and professional review before onboarding.

Available with Managed Pilot or Managed Operations.
```

---

## 3. Property Enquiry Agent

```text
Property Enquiry Agent

For agencies and developments receiving more listing enquiries than agents can
personally answer.

• Answer approved questions on listings, availability and viewing process
• Capture enquiry detail against the qualification criteria you define
• Prepare a ranked daily handover of enquiries for agent follow-up

Human approval: viewing confirmations, pricing discussions, offer handling and
any direct contact with a prospect.

The agent qualifies and organises. An agent closes.

Available with Managed Pilot or Managed Operations.
```

---

## 4. Hospitality Agent

```text
Hospitality Agent

For restaurants, lodges and venues answering the same questions across several
channels every day.

• Answer approved questions on menu, dietary provision, hours and location
• Prepare booking and enquiry responses for front-of-house confirmation
• Summarise recurring guest questions and feedback themes weekly

Human approval: reservation confirmations, capacity commitments, event quotes
and responses to public reviews.

Available with Managed Pilot or Managed Operations.
```

---

## 5. Professional Administration Agent

```text
Professional Administration Agent

For legal, accounting and consulting practices where fee-earning time is going
into administration.

• Answer approved questions on process, documentation and appointment logistics
• Prepare intake summaries from new enquiries for practitioner review
• Track which matters are waiting on a document or a client response

Human approval: all client correspondence, document release, deadline
commitments and fee discussions.

This role covers administration only. It does not provide legal, tax or
financial advice, and does not act on a matter. Regulated practice workflows
require separate professional and privacy review before onboarding.

Available with Managed Pilot or Managed Operations.
```

---

## 6. B2B Sales Support Agent

```text
B2B Sales Support Agent

For sales teams losing pipeline to follow-up that never happens.

• Draft follow-up messages from your approved positioning for rep review
• Maintain a prioritised list of conversations that have gone quiet
• Assemble pre-call briefing notes from the account information you supply

Human approval: every outbound message, pricing statement, commercial
commitment and proposal.

The agent prepares the work. A person sends it. Nothing goes out
unsupervised, and this role does not perform cold outreach at scale.

Available with Managed Pilot or Managed Operations.
```

---

## 7. Multilingual Support Agent

```text
Multilingual Support Agent

For organisations supporting customers across more than one South African
language.

• Answer approved support questions in the languages agreed for your account
• Prepare translated drafts of standard responses for review
• Escalate anything outside the approved knowledge pack to a human

Human approval: any response that leaves the approved knowledge pack, and all
customer-facing translation on sensitive matters.

Supported languages are confirmed during onboarding and tested against your own
content before activation. Quality is agreed per language rather than claimed
across all of them.

Available with Managed Pilot or Managed Operations.
```

---

## 8. Field Service Agent

```text
Field Service Agent

For trades and service businesses where jobs are coordinated between a phone
and a notebook.

• Answer approved questions on service areas, call-out process and lead times
• Capture job requests into the structure your scheduler needs
• Prepare a daily list of unscheduled and unconfirmed jobs

Human approval: scheduling commitments, quotes, technician dispatch and any
message to a customer.

Available with Managed Pilot or Managed Operations.
```

---

## Gallery caption

Replaces the eight per-agent prices on the collection grid:

```text
Every role is a starting template. Each agent is configured around your own
approved knowledge and operating boundaries, and every external action stays
behind a human approval step.

Available with Managed Pilot or Managed Operations.
```

---

## Still outstanding for the site launch

Not content I can responsibly draft — each needs facts only the owner holds:

1. **Privacy Notice** — requires the registered legal entity, agreed retention
   periods, processor list and the data-subject contact route. The existing
   `studex/legal-and-website-audit.md` covers *studexmeat.com* and cannot be
   reused for a different entity and product.
2. **Terms of Service** — requires the entity, service commitments and the
   third-party cost pass-through position.
3. **Business contact details and company identity** for the footer.
4. **Elara's AI disclosure line** as it will actually appear in the Base44 app.

The launch pack's own gate list forbids publishing placeholder `#` legal links,
so these four block organic promotion regardless of how good the copy is.
