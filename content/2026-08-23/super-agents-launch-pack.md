# Super Agents — truthful launch pack

**Prepared:** 23 Aug 2026  
**Purpose:** prepare truthful marketing pending proof that the managed service
can be delivered manually, while building toward Super Agents Nest VM without
selling prototype behavior as production.

Canonical implementation guidance:
[SUPER_AGENTS_CONSOLIDATION.md](../../SUPER_AGENTS_CONSOLIDATION.md).

The public website may only be changed in the Mac1 Gitea
`superagents-site/index.html`. This file is copy and campaign source material,
not an alternative website.

---

## 1. Positioning

### Category

**Managed AI operations for growing South African businesses.**

Super Agents should not be positioned as generic chatbot software. The offer is
a managed service: StudEx configures a named agent around the client's business,
operates the supporting systems and keeps humans in control of external actions.

### One-sentence proposition

> A managed AI operator configured around your business knowledge, with human
> approval before it takes external action.

### Short proposition

> Not another chatbot. A named AI operator, configured for your business and
> managed by StudEx.

### Customer promise

1. **Understands the business:** approved products, policies, FAQs and working
   documents are organised into the agent's knowledge pack.
2. **Works within a defined role:** customer care, sales follow-up,
   administration or another agreed workflow.
3. **Humans remain accountable:** external messages, payments, publishing and
   destructive actions require explicit approval.
4. **Starts managed:** StudEx handles configuration, review and support instead
   of handing the customer an empty software account.
5. **Can grow into Nest VM:** selected early-access customers can progress to a
   dedicated Linux workspace once the VM lifecycle passes readiness checks.

### Do not say

Until supporting systems and evidence exist, marketing must not claim:

- “POPIA compliant” or “your data stays in South Africa”;
- “always on”, guaranteed uptime or SLA;
- instant or 30-minute VM provisioning;
- a dedicated WhatsApp number or email address by default;
- autonomous outbound messages;
- eleven-language accuracy;
- that the agent learns automatically from every conversation;
- live Shopify, CRM, payments or Meta integrations;
- that a mock workspace, canned reply or static dashboard is live.

Use instead:

- “data handling and retention agreed during onboarding”;
- “managed operating hours and response expectations agreed in writing”;
- “integrations depend on API access, permissions and technical validation”;
- “illustrative workspace — no customer data displayed”;
- “WhatsApp and email are scoped separately where available”.

---

## 2. Product ladder

The existing site mixes eight agent-specific prices with three plan prices.
That creates uncertainty about what the client is buying. The eight agents
should become **role templates**. Two plans define the managed service that can
be sold after manual delivery is proven. Nest VM is a planned delivery option,
not a third sellable plan.

### Plan 1 — Managed Pilot

**R3,500/month · application required**

For a business proving one focused AI workflow with StudEx operating the
service.

Includes:

- one named Super Agent;
- one role selected from the Agent Collection;
- Northstar identity and operating-boundary session;
- one approved business knowledge pack;
- customer-care and onboarding support through Elara/Base44;
- one agreed workflow;
- human review before external actions;
- operating review and improvement notes.

Not included by default:

- dedicated VM;
- WhatsApp or voice automation;
- paid third-party services;
- custom API development;
- unsupervised publishing, payments or customer messaging.

Primary CTA: **Apply for a Managed Pilot**

### Plan 2 — Managed Operations

**R7,500/month · scope confirmed during onboarding**

For a business ready to run an agent as an ongoing managed operator.

Includes everything in Managed Pilot, plus:

- expanded knowledge pack;
- up to two clearly defined workflows;
- one integration after API, permission and security validation;
- structured approval records;
- operating summaries and exception escalation;
- priority customer-care support.

All third-party fees, implementation complexity and data-processing terms are
confirmed before activation.

Primary CTA: **Discuss Managed Operations**

### Planned delivery option — Nest VM

**Not for sale yet · early-access interest only**

Intended for selected customers who need a dedicated Linux workspace and
browser/computer capability.

Planned deliverables:

- one tenant on one isolated VM;
- persistent private workspace;
- one Super Agent runtime;
- private browser/computer-use service;
- tenant-scoped credentials;
- registration, heartbeat and health evidence;
- audited rebuild and destroy;
- human approval gates.

No operating Nest VM pilot is evidenced in the supplied code. Early-access
applications collect interest only; they do not create an order, quote or
activation promise. A customer must not be offered a paid Nest VM until
registration, heartbeat, agent health and computer health all pass.

Primary CTA: **Register Interest in Nest VM**

### Agent Collection

Keep the existing eight roles as starting templates:

1. Retail and e-commerce
2. Clinics and healthcare administration
3. Property lead qualification
4. Restaurants and hospitality
5. Legal and professional administration
6. B2B sales support
7. Multilingual enterprise support
8. Trades and field-service administration

Replace the separate monthly price on each gallery card with:

```text
Available with Managed Pilot or Managed Operations
```

Healthcare, legal, finance and other regulated workflows require separate risk,
privacy and professional review. Agents must never provide clinical, legal or
financial decisions.

---

## 3. Exact homepage copy brief

This is a change brief for the canonical Gitea `index.html`; it is not a patch
against the stale GitHub file.

### Metadata

```html
<title>StudEx Super Agents | Managed AI Operations</title>
<meta
  name="description"
  content="Managed AI operators configured around your business, with human approval and a path to a private Nest VM."
>
```

Set the canonical and Open Graph URL to:

```text
https://superagents.studex-group.com/
```

The live page currently carries a stale Open Graph domain and should be
corrected.

### Navigation

Use:

```text
How It Works · Agent Collection · Plans · Nest VM · Apply
```

Remove navigation labels that imply the illustrative workspace is a live
customer application.

### Hero

Eyebrow:

```text
STUDEX GROUP · MANAGED AI OPERATIONS
```

Headline:

```text
A Managed AI Operator,
Configured for Your Business.
```

Body:

```text
Give your business a named AI operator with approved knowledge, a clearly
defined role and human control over external actions. Start with a managed
pilot. Selected clients can progress to a private Nest VM.
```

Primary CTA:

```text
Apply for a Managed Pilot
```

Secondary CTA:

```text
Explore the Agent Collection
```

Trust line:

```text
Managed onboarding · Defined permissions · Human approval · South African support
```

Do not use “never stops working”, “gets smarter every conversation” or “your
data stays yours” as unqualified factual claims.

### Illustrative workspace disclosure

Place above the operating-room demonstration:

```text
Product demonstration

This workspace illustrates the intended operating model. It contains no live
customer data, does not provision a VM and does not represent current system
activity.
```

### “Not software” section

Heading:

```text
Software Gives You Tools.
StudEx Helps Operate the Work.
```

Body:

```text
We configure the agent, organise approved business knowledge, define its
permissions and review the operating results with you. You begin with one useful
workflow instead of an empty dashboard.
```

### Agent cards

Each card should contain:

- role and ideal customer;
- three realistic workflows;
- one “requires human approval” example;
- plan availability;
- `Apply with this role` CTA.

Example Retail card:

```text
Retail Agent

For online and physical retailers that need consistent customer-care support.

• Answer approved product and policy questions
• Prepare order-status responses for review
• Identify unanswered enquiries and follow-up opportunities

Human approval: refunds, discounts, outbound campaigns and account changes.

Available with Managed Pilot or Managed Operations.
```

### Nest VM section

Heading:

```text
Planned Nest VM
```

Body:

```text
The next stage of Super Agents gives one client one private Linux workspace
containing their agent, persistent files and browser/computer capability.

Nest VM is a planned controlled pilot. Early-access applications collect
interest only. General availability begins only after provisioning, recovery,
isolation and health checks are proven.
```

CTA:

```text
Register Interest
```

### Integrations section

Replace broad logo promises with:

```text
Integrations are scoped during onboarding.

Availability depends on the system's API, your account permissions, data
requirements and security review. No integration is considered active until it
has been tested with your account and accepted by you.
```

### Pricing

Display the two managed-service plans from section 2. Place Nest VM in a
separate “planned early access” panel with no price or availability promise.
Remove individual prices from the eight role cards.

Include:

```text
Third-party platform, model, messaging and infrastructure costs are quoted
separately where applicable.
```

### Final CTA

Headline:

```text
Start with One Useful Workflow.
```

Body:

```text
Tell Elara where work is getting stuck. StudEx will confirm whether a Managed
Pilot or Managed Operations fits. You can also register interest in the planned
Nest VM pilot.
```

CTA:

```text
Talk to Elara
```

### Footer

Required before promotion:

- working Privacy Notice link;
- working Terms of Service link;
- business contact details;
- company/legal identity;
- clear statement that Elara is an AI customer-care assistant;
- data-retention and human-contact route.

Do not publish placeholder `#` legal links.

---

## 4. Lead flow

### Conversion path

```text
Organic post / referral
    → superagents.studex-group.com
    → Talk to Elara / Apply
    → qualification
    → human scope review
    → written pilot proposal
    → onboarding
```

The old GitHub flow that stored lead PII in `localStorage` and placed it in
payment URL parameters must never return.

### Qualification questions

Elara should collect only what is required:

1. Name and business
2. Contact route
3. Industry
4. Repetitive workflow causing the most pain
5. Who performs it today
6. Systems involved
7. Whether the agent would access customer or sensitive data
8. Whether external messages/actions are required
9. Preferred path: Pilot, Operations or Nest VM interest list
10. Permission for StudEx to contact the lead

Do not collect passwords, API keys, customer files or account credentials in
the qualification conversation.

### Qualification outcome

Elara produces a structured summary for human review:

```text
Business:
Industry:
Problem:
Candidate workflow:
Systems:
Sensitive data:
External actions:
Recommended product:
Risks/questions:
Contact consent:
```

No automated payment or product activation occurs from this summary.

---

## 5. Organic launch campaign

**The following posts are staged copy, not approved for publication.** Do not
publish them or purchase ads until every “required before organic promotion”
gate in section 6 passes, including proof that one Managed Pilot can be
delivered manually.

### Post 1 — launch

```text
Most businesses do not need another AI tool.

They need one useful workflow taken off the team's desk — with a human still in
control.

StudEx Super Agents are managed AI operators configured around your approved
business knowledge and a clearly defined role.

Start with customer care, sales follow-up or administration. Every external
action remains behind human approval.

Applications for the Managed Pilot are open.

https://superagents.studex-group.com/
```

Suggested visual:

```text
ONE BUSINESS · ONE ROLE · ONE MANAGED AI OPERATOR
```

### Post 2 — not a chatbot

```text
A chatbot waits for questions.

A managed operator has:
• a defined job
• approved business knowledge
• clear permissions
• an escalation path
• a human accountable for the result

That is the difference behind StudEx Super Agents.

Begin with one workflow. Prove it. Expand only when it works.
```

Suggested visual:

```text
NOT ANOTHER CHATBOT.
A DEFINED ROLE WITH HUMAN CONTROL.
```

### Post 3 — product ladder

```text
Two managed ways to begin with Super Agents:

1. Managed Pilot — one role and one useful workflow
2. Managed Operations — ongoing operation with approved integrations

Not every business needs a private VM on day one.
The right first step is the smallest workflow that creates a measurable result.

Nest VM is a planned early-access option. You can register interest, but it is
not currently for sale.

Talk to Elara:
https://superagents.studex-group.com/
```

### Post 4 — Nest VM vision, accurately framed

```text
The next stage of Super Agents is Nest VM:

One client.
One isolated machine.
One persistent workspace.
One agent with a browser and computer.

It is a planned controlled pilot — not currently for sale and not a promise of
instant activation. Provisioning, recovery, isolation and health checks must be
proven before paid availability.

Businesses can register interest through the Super Agents site.
```

Suggested visual:

```text
ONE CLIENT · ONE VM · ONE SUPER AGENT
PLANNED · REGISTER INTEREST
```

### Post 5 — agent collection

```text
Your Super Agent begins with a role, not a blank prompt.

Retail · Clinics · Property · Hospitality · Professional Services · B2B Sales
· Enterprise Support · Field Services

Each role is configured around the client's own approved knowledge and
operating boundaries.

Which repetitive workflow would you remove from your team's desk first?
```

### Post 6 — founding-client invitation

```text
We are looking for founding Super Agents clients with one clear, repetitive
workflow and a willingness to build it properly.

Good pilot:
• repeated often
• currently manual
• easy for a human to review
• valuable when handled consistently

Bad pilot:
• autonomous payments
• unsupervised legal or medical decisions
• access to every system from day one

If you have the right workflow, apply:
https://superagents.studex-group.com/
```

### Short direct-message invitation

```text
Hi [Name] — StudEx is opening a small number of Managed Super Agents pilots.

The aim is simple: choose one repetitive workflow, configure a named AI
operator around the business's approved knowledge, and keep a human approval
step before external actions.

If there is a customer-care, sales-follow-up or admin process consuming your
team's time, I can send the short qualification link.
```

Do not send this message automatically or at scale. It is for human-approved,
relevant outreach.

---

## 6. Launch gates

### Required before organic promotion

- [ ] `www.studex-group.com` links to Super Agents
- [ ] Hero and pricing use the two-plan model plus a separate planned Nest VM panel
- [ ] Base44/Elara CTA opens successfully
- [ ] Elara identifies itself as AI
- [ ] Human follow-up owner is assigned
- [ ] Full lead journey tested from CTA through Elara to the human follow-up owner
- [ ] Privacy Notice and Terms are real pages
- [ ] No lead PII is placed in URLs or browser storage
- [ ] All workspace demonstrations are labelled illustrative
- [ ] Unsupported compliance, uptime, language and integration claims removed
- [ ] One Managed Pilot can actually be delivered manually

### Required before paid advertising

- [ ] Full lead journey tested from click to human response
- [ ] Non-PII conversion events recorded
- [ ] Lead source captured without contact details in analytics
- [ ] Qualification-to-proposal process defined
- [ ] Ad claims match the canonical website
- [ ] Budget and channel explicitly approved by the owner

### Required before selling Nest VM as available

- [ ] One provider adapter implemented
- [ ] Tenant creates exactly one isolated VM
- [ ] Single-use registration token
- [ ] Heartbeat and status reconciliation
- [ ] Agent health check
- [ ] Browser/computer health check
- [ ] Persistent workspace survives restart
- [ ] Tenant-scoped secrets
- [ ] Rebuild and destroy audited
- [ ] Recovery test completed

Until every Nest VM gate passes, the only permitted CTA is:

```text
Register Interest
```

---

## 7. Measurement

Track the funnel without transmitting contact details:

```text
site_view
agent_role_viewed
managed_pilot_clicked
managed_operations_clicked
nest_vm_early_access_clicked
elara_opened
qualification_completed
human_scope_approved
proposal_sent
pilot_started
```

Revenue, client status and pipeline must come from real records. Never populate
public or internal dashboards with literals that look like live results.

Initial success measures:

- qualified applications;
- percentage with one clearly defined workflow;
- human-approved proposals;
- activated Managed Pilots;
- workflow outcomes accepted by the client;
- escalations and approval exceptions.

