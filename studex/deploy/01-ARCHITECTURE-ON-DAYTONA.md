# Architecture on Daytona
**Prepared by:** Robusca Romanov | **Date:** 2026-08-26

---

## Daytona changes the design, for the better

Daytona is a much better fit than what I assumed in the earlier
[control plane design](../delivery-model/02-CONTROL-PLANE-ARCHITECTURE.md), and it corrects one
thing I got wrong there.

**What I said:** run one OpenHands deployment per tenant, because Agent Canvas is single-tenant.
Crude but isolated.

**What Daytona makes possible:** don't run persistent per-tenant runtimes at all. Spin up an
isolated sandbox per *task*, let it pause when idle, and keep the tenant's state in a persistent
volume plus the control-plane database. Same isolation, roughly a tenth of the cost.

That single change takes per-tenant compute from about **R1,950/month to about R190/month**.
Numbers below.

**What Daytona gives us:**

| Capability | Why it matters here |
|---|---|
| **Sub-90ms sandbox creation** | Ephemeral-per-task becomes practical. No warm pool needed |
| **Container and/or microVM isolation** per sandbox — dedicated namespaces, network segmentation preventing lateral movement, resource quotas, configurable network allow-lists | This is the per-tenant isolation claim, and it's someone else's job to keep true |
| **Daytona Secrets** — plaintext credentials stay *outside* the sandbox and are substituted at network egress | Solves the credential vault requirement directly. A client's Shopify token never lands in a sandbox filesystem |
| **Volumes** — shared data across sandboxes without breaking isolation | Per-tenant persistent working files |
| **Snapshots** — save, restore, resume; declarative image builder via SDK | One snapshot per tenant profile. Boot pre-configured, no setup cost per run |
| **Stateful, runs indefinitely** | For the few things that must be long-running |
| **Per-second billing**, default 15-minute auto-pause | Bursty agent work costs what it uses |
| SDKs in Python, TypeScript, Go, Java, Ruby + REST + CLI | Provisioning is a function call |
| SSH, VS Code in browser, web terminal | Support and debugging without breaking the model |
| SOC 2 / ISO 27001 aligned, HIPAA and GDPR, annual third-party pen testing | Answers the security question with a document |
| BYOC — sandboxes on customer-managed compute, Daytona as control plane only | The enterprise-tier answer when someone demands it |
| **Startup programme: up to $50k in credits** | Apply this week. Could fund the entire pilot |

---

## The shape

Two planes. The distinction matters: **always-on things go on Fly.io, bursty things go on
Daytona.** Running the control plane on per-second sandbox pricing would be paying premium rates
for something that never pauses.

This also matches the existing rule in `STUDEX_OS.md` — Fly.io for always-on agents, Vercel for
dashboards.

```
┌──────────────────────────────────────────────────────────────┐
│  CONTROL PLANE            always on · Fly.io · we own this   │
│                                                              │
│  tenant registry · key service · scheduler                   │
│  memory: Postgres + pgvector (schema per tenant)             │
│  ledger: append-only, per tenant                             │
│  channel gateway: WhatsApp / Slack / Discord                 │
└───────────────────────────┬──────────────────────────────────┘
                            │  Daytona SDK
                            ▼
┌──────────────────────────────────────────────────────────────┐
│  EXECUTION PLANE                    bursty · Daytona         │
│                                                              │
│   XYZ Group          Client B            Client C            │
│   ├ snapshot         ├ snapshot          ├ snapshot          │
│   ├ volume           ├ volume            ├ volume            │
│   ├ secrets          ├ secrets           ├ secrets           │
│   └ sandbox ⟳        └ sandbox ⟳         └ sandbox ⟳         │
│     ephemeral          ephemeral           ephemeral         │
└──────────────────────────────────────────────────────────────┘
                            │
                     ┌──────┴──────┐
                     ▼             ▼
              Client's WhatsApp   Studex portal
```

**Per tenant, four Daytona objects:**

1. **Snapshot** — their agent image, pre-built with tools and skills. Boots in under 90ms
2. **Volume** — persistent working files, documents, outputs
3. **Secrets** — their third-party tokens, held outside the sandbox
4. **Sandboxes** — created per task, auto-paused, deleted when done

The tenant's *memory* — the Business Ghost — deliberately does **not** live in the sandbox. It
lives in the control plane's Postgres, in its own schema. A sandbox queries it over the API with
a tenant-scoped token. Two reasons: memory must survive sandbox deletion, and a compromised
sandbox must not be able to read the whole Ghost.

---

## The isolation boundary, stated honestly

| Layer | Isolation | How it's enforced |
|---|---|---|
| Memory | Schema per tenant in Postgres | Separate schema, not a `tenant_id` column |
| Files | Volume per tenant | Daytona volume, not shared |
| Credentials | Secrets per tenant | Daytona Secrets, substituted at egress, never in the sandbox |
| Execution | Sandbox per task | Container/microVM, dedicated namespace, no lateral movement |
| Network | Allow-list per tenant | Daytona network rules — a tenant's agent reaches only what it should |
| Audit | Ledger per tenant | Append-only, in the control plane |

That table is the answer to audit question 8 — *"where does our data live and who else's is
there?"* — and now it is true rather than aspirational. It is worth keeping the table itself as a
sales asset; it is exactly what a buyer's security reviewer asks for.

---

## Cost per tenant

Daytona list pricing: **$0.0504/vCPU/hour, $0.0162/GiB memory/hour, $0.000108/GiB
storage/hour.** Per-second billing, 15-minute default auto-pause. $200 free compute and 5 GiB
free storage to start.

At R16/USD, for a 2 vCPU / 4 GiB sandbox with 20 GiB of volume:

| Pattern | Sandbox hours/month | Compute + memory | Storage | **Total** |
|---|---|---|---|---|
| **Persistent (wrong)** | 730 | $120.88 | $1.58 | **$122 ≈ R1,955** |
| **Bursty, 2h/day** | 60 | $9.94 | $1.58 | **$11.52 ≈ R184** |
| **Bursty, 4h/day** | 120 | $19.87 | $1.58 | **$21.45 ≈ R343** |
| **Heavy, 8h/day** | 240 | $39.74 | $1.58 | **$41.32 ≈ R661** |

Against R5,000 revenue, the bursty pattern is **3.7% of revenue**. The persistent pattern is
39%. This is the whole architectural argument in one table.

**What this requires of the design:**
- Sandboxes are created per task and torn down, never left running "in case"
- Anything that must watch continuously — the monitoring loops — runs as a *scheduled* job in the
  control plane that spawns a sandbox, does the check, reports, and exits
- Keep the auto-pause default. Do not raise it
- Alert on any sandbox alive longer than a set ceiling. A stuck sandbox is a silent invoice

Add the control plane: one small Fly.io machine plus Postgres, maybe $25–40/month total,
**shared across all tenants.** At three tenants that is roughly R150/tenant; at fifty it rounds
to nothing.

**Revised infrastructure cost per tenant: roughly R350–550/month** including compute, storage,
control-plane share, channel and storage. That is meaningfully better than the R1,200 estimate in
[the unit economics](../ecosystem-2026-08/02-PRICING-MODEL.md) — which pushes Company Builder
margin from ~31% back toward 45%.

---

## Four things to get right before committing

### 1. There is no African region

Daytona regions are India (Asia-South), EU Central (Frankfurt), EU West (London), US East
(Washington DC), US West (Oregon). **No Africa.**

Consequences, in order of importance:

- **Latency:** South Africa to Frankfurt or London is roughly 150–190ms. For agent work — which
  is asynchronous and measured in seconds — this is irrelevant. For an interactive desktop
  (Computer Use) it will feel sluggish. Fine for what we are doing; know it before promising
  real-time anything.
- **The Rwanda data-residency claim needs correcting.** Last session I recommended offering "the
  data stays in Rwanda." **On Daytona Cloud that is not achievable.** Three honest options:
  (a) use EU Central and offer GDPR-aligned European residency, which is what EU coffee buyers
  actually care about for EUDR; (b) keep the Ghost and ledger — the actual client data — in a
  control plane hosted wherever residency requires, and use Daytona only for ephemeral
  *execution*, which is a genuinely defensible split; (c) BYOC later, on Rwandan infrastructure,
  once volume justifies it.
- **Option (b) is the answer for now,** and it is a good one: *"Your records live in [region].
  Execution happens in ephemeral sandboxes that are destroyed after each task and store nothing."*
  That is true, it is stronger than most competitors can say, and it survives scrutiny.

Do not claim Rwandan residency until it is architecturally real.

### 2. AGPL 3.0 if self-hosting

Daytona's open-source platform is AGPL 3.0. If you modify it and make it available over a
network, you must release your modifications under the same licence.

- **Calling Daytona's hosted API from our own separate application: no copyleft issue.** Our code
  is not a derivative work of theirs.
- **Self-hosting unmodified: fine.**
- **Self-hosting with modifications, exposed over a network: the copyleft obligation attaches**,
  and that is a real problem for a commercial platform.

Recommendation: **use the managed cloud and treat Daytona as a vendor API.** Cleanest licence
position, no ops burden, and the $200 free credit plus a possible $50k startup grant makes it
cheap to start. Revisit self-hosting only if unit economics or residency force it, and get the
licence position in writing first.

### 3. The open-source repo may be frozen

The GitHub repository carries a note indicating the codebase moved to a private repo, and that
the public one "remains public and free to use without support or warranty."

If accurate, the self-host path is community-supported at best and possibly not maintained. That
strengthens the case for the managed cloud, and it is worth confirming directly with Daytona
before any self-hosting plan — particularly since self-hosting is the fallback for residency.

### 4. Platform dependency, again

Same discipline as Runable. Daytona raised a $24M Series A in early 2026 and is well-regarded —
LangChain, SambaNova, Mintlify, n8n and Clay are cited users — but it is still a vendor.

**The mitigation is architectural, and it is cheap if done now:** keep the sandbox interface
behind our own thin adapter. One module, one interface — `create`, `exec`, `snapshot`, `destroy`.
If Daytona changes commercially, we swap the adapter rather than rewriting the platform. Sandbox
providers are becoming a competitive category, which is exactly when you want to be portable.

Critically: **the things that make Studex defensible — memory, ledger, tenancy, channel — are
ours and stay ours.** Daytona is rented execution. That is the right thing to rent.
