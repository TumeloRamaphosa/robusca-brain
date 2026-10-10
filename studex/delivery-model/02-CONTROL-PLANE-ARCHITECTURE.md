# The Control Plane
**Prepared by:** Robusca Romanov | **Date:** 2026-08-25
**Question asked:** *"If I make a group now and give you the group key, and then we connect the key… and then we have our agents manage theirs?"*

---

## The short answer

The shape you described is right. The substrate is wrong.

**Group per client — yes.** That is exactly how this should feel to a customer. A WhatsApp or
Slack group where their agents live, where they ask for things, where work appears.

**Give you the group key — invert it.** You do not receive a key from the client's tool
vendor. **You issue the key.** The client gets a Studex workspace ID and a Studex API key,
authenticating against infrastructure you own. That single inversion is the difference between
having a company and having a reseller arrangement with no contract.

**Our agents manage theirs — yes, but only in one direction.** A Studex supervisor may *give
work to* a client's agents. It must not *read from* their memory without an explicit grant.
Get that boundary wrong and the privacy claim you are selling becomes false.

The rule that governs all of it: **whoever issues the key owns the customer.** Hand a client a
third-party vendor's key and the vendor owns them; your churn becomes that vendor's upsell.

---

## What "a group" actually is

One client = one **tenant**. A tenant is five things, provisioned together and destroyed
together:

| Component | What it holds | Why it must be per-tenant |
|---|---|---|
| **Channel** | The WhatsApp/Slack/Discord group they talk in | It's the product surface — the only part they see |
| **Memory** | Their Business Ghost: goals, meetings, customers, projects, decisions | The differentiator. Shared memory is not memory, it's a leak |
| **Vault** | *Their* credentials — Shopify, Google, CRM, mail | Client A's token must be unreachable from client B's agent run |
| **Runtime** | Their agent workers, in their own sandbox | Comingled runtimes mean one prompt injection reaches every client |
| **Ledger** | Append-only log of every action, with cost | This is what makes the audit claim true rather than marketing |

If any one of those five is shared across clients, you cannot honestly sell private
per-company infrastructure. That is the whole test.

**For South African SMEs, default the channel to WhatsApp.** Slack and Discord suit tech
teams; a Johannesburg logistics operator lives in WhatsApp. You already hold WABA
`105198275846951` and phone number ID `117882611239791` per `STUDEX_OS.md` — currently
disconnected and needing SMS verification. Fixing that is on the critical path for this whole
product, not a side task.

---

## The key model

Three kinds of credential, and they must never be confused:

```
CLIENT  ──── Studex workspace key ────►  STUDEX CONTROL PLANE
        (sk_studex_live_…, scoped, revocable, rotatable, metered)
                                                  │
                                                  │  never exposed to the client
                                                  ▼
                                   ┌──────────────────────────────┐
                                   │ Per-tenant credential vault  │
                                   │ client's own Shopify/Google  │
                                   │ tokens — encrypted, scoped   │
                                   │ to that tenant's runs only   │
                                   └──────────────────────────────┘
                                                  │
                                                  ▼
                                   ┌──────────────────────────────┐
                                   │ Studex-owned vendor keys     │
                                   │ model providers, Runable,    │
                                   │ infra. Never client-visible. │
                                   └──────────────────────────────┘
```

Three hard rules:

1. **The client's key authenticates to Studex, and only Studex.** It is scoped to their tenant,
   revocable in one action, rotatable without downtime, and every call against it is metered.
2. **The client's own third-party tokens live in their tenant vault**, injected into their agent
   runs at execution time and never persisted into logs or prompt history. Their Shopify token
   is theirs; you are a custodian, and you should say so in the contract.
3. **Studex vendor keys are never handed to a client, and never one key across all tenants for
   anything a client can influence.** Per-tenant subkeys where the provider supports them, so
   one client's abuse cannot exhaust another client's capacity.

This also fixes the RunClaw failure mode. Under this model, a client signing up for Runable
directly cannot displace anything, because Runable was never the tenancy boundary — your
control plane is.

---

## How "our agents manage theirs" works safely

You want a Studex-side supervisor directing client-side workers. That is a good design and it
is how you deliver a managed service rather than a self-serve tool. But it creates a
cross-tenant control path, which is the most dangerous thing in the architecture.

```
        STUDEX SIDE                    │        CLIENT TENANT
                                       │
   Robusca (orchestrator)              │   ┌────────────────────────────┐
        │                              │   │  Business Ghost (memory)   │
        │  writes TASKS ───────────────┼──►│  Task queue                │
        │  (never reads memory)        │   │  Agent workers ── sandbox  │
        │                              │   │  Vault                     │
        ◄─── receives REPORTS ─────────┼───│  Ledger (append-only)      │
             (outcomes + metrics,      │   └────────────────────────────┘
              not raw client data)     │
```

**The asymmetry is the security model:**

- **Outbound (Studex → tenant): tasks only.** The supervisor enqueues instructions. It does not
  query their memory, read their documents, or inspect their vault.
- **Inbound (tenant → Studex): reports only.** Outcomes, status, cost, metrics. Not raw client
  content.
- **Anything more requires an explicit, logged, time-boxed grant** from the client — a support
  escalation they approve, that expires, that appears in their ledger. When they ask "can your
  staff read our data", the honest answer becomes: "only if you grant it, only for as long as
  you grant it, and you'll see it in your log."

Build that boundary on day one. Retrofitting it after three clients' data has mingled is not
really possible, and it is the exact question a serious buyer asks in month four.

---

## Minimum viable control plane

Seven components. This is a real but bounded build — and most of the hard parts are
off-the-shelf.

| # | Component | What it does | Build or buy |
|---|---|---|---|
| 1 | **Tenant registry** | client → workspace → entitlements → plan → status | Build. Postgres, small |
| 2 | **Auth + key service** | issue/scope/rotate/revoke workspace keys | Build thin, on a standard library |
| 3 | **Memory service** | per-tenant Business Ghost, schema-per-tenant | Postgres + pgvector. Schema-per-tenant, not a `tenant_id` column |
| 4 | **Credential vault** | per-tenant encrypted secrets, injected at runtime | Buy. Never roll your own crypto |
| 5 | **Agent runtime** | the workers | **Self-hosted OpenHands Agent Server** — REST API, MIT core. One deployment per tenant at pilot scale |
| 6 | **Channel gateway** | WhatsApp/Slack/Discord in, routed by tenant | Build thin adapter per channel |
| 7 | **Ledger + metering** | append-only action log, cost per tenant, feeds invoices | Build. This is the audit claim |

Two notes that matter more than they look:

**Schema-per-tenant, not row-level.** A `WHERE tenant_id = ?` that someone forgets once is a
cross-client data leak, and on a memory product that is existential rather than embarrassing.
Schema separation makes the mistake structurally harder.

**OpenHands does the heavy lifting.** You are not writing an agent loop, a sandbox manager, or
a tool-calling framework. Agent Server is a REST API for running agents; the automation service
handles scheduling and webhooks; LiteLLM routes to whichever models you choose. Your build is
the tenancy, the memory, the ledger and the channel — the parts that are actually yours.

**Sequence:** registry and keys → memory → one channel (WhatsApp) → runtime for one tenant →
ledger → metering. Get one client working end-to-end before provisioning the second. The
temptation to build for fifty before proving one is the standard way this fails.

---

## Provisioning flow

What happens between signature and a working group. Steps 2–7 should end up as one command.

```
1. Founder call (10 min)          → human. Qualify, capture goals, set expectations
2. Create tenant                  → registry row, plan, entitlements
3. Provision memory               → empty Business Ghost, schema created
4. Create channel                 → WhatsApp group / Slack workspace, bot joined
5. Issue workspace key            → scoped, logged, handed over securely
6. Onboard the Brain              → ingest their documents, site, mail, CRM history
7. Connect their tools            → client authorises; tokens land in their vault
8. Spawn agents                   → runtime up, supervisor attached, first tasks queued
9. First deliverable within 48h   → the moment the subscription justifies itself
```

**Step 9 is the retention decision, and it happens in the first week.** Whatever the client
sees in the first 48 hours sets their expectation for month six. Make it something they can
show someone else — a tender-ready capability statement, a working site, a competitor
teardown. Not a dashboard tour.

**Step 6 is where the product becomes real.** Ingesting their actual history is what turns a
generic assistant into their Ghost, and it is the moment the demo from the launch strategy —
*"ask it something only your company would know"* — starts working for them.

---

## Why this cannot be skipped

The launch strategy in [PR #17](../launch-2026-08/README.md) sells Studex on persistent
memory, decision traces, permissions, isolation and outcome-based pricing — and proposes
publishing a ten-question audit that we score ourselves against in public.

Run three clients through one shared vendor account and here is how that audit scores:

| Audit question | Shared-account delivery | With control plane |
|---|---|---|
| 1. Show me the decision trace | ❌ no per-tenant log | ✅ ledger |
| 5. Can a non-engineer change governance policy? | ❌ no policy layer | ✅ entitlements |
| 8. Where does our data live, who else's is there? | ❌ **same account as your competitors** | ✅ their schema, their runtime |
| 10. Show me a customer number you didn't choose | ❌ no metering | ✅ metered per tenant |

Publishing an exam you fail, having told the market that failing it disqualifies a vendor, is
worse than never publishing it. So the control plane is not infrastructure spend competing
with marketing spend — **it is the thing that makes the marketing true.** That is the argument
for building it, and it is the honest reason the shortcut has to be refused.
