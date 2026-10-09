# Super Agents — consolidation and agent handoff

**Status:** authoritative product map based on the repositories and live sites
inspected on 23 Aug 2026.

This document does not replace the Super Agents website source. The canonical
website remains the Gitea repository:

```text
http://localhost:3000/tumelo/superagents-site.git
```

That address is local to Mac1 and is not reachable from Cursor Cloud. **Agents
must not edit or deploy the stale GitHub copy.**

Truthful product, homepage and campaign copy is maintained in
[`content/2026-08-23/super-agents-launch-pack.md`](content/2026-08-23/super-agents-launch-pack.md).

---

## 1. One product, several technical layers

The owner's product definition is coherent:

> **Super Agents** is the product. **Nest VM** is the newer delivery model:
> every client gets a private machine containing their Super Agent, memory,
> tools and computer. Base44 remains a customer-care and onboarding layer.

The layers should stay separate in code even though customers experience one
product:

```text
Super Agents
├── Marketing             Gitea index.html → Vercel
├── Customer care         Elara on Base44
├── Control plane         NEW: tenants, lifecycle, approvals, audit
├── Provisioner           NEW: one provider adapter, one VM per client
├── Client VM runtime     NEW: agent harness + browser/computer + memory
├── Operations            War Room, after auth and real data exist
└── Developer factory     agentic-lab-v3, internal and separate
```

“Put the code together” should therefore mean **one product architecture and
one set of contracts**, not copying every prototype into a monorepo.

---

## 2. Repository disposition

### Canonical website — Gitea `superagents-site`

**Keep. This is the only canonical public website source.**

- One hand-authored `index.html`, deployed to
  `superagents.studex-group.com` on Vercel.
- The live file is 780,219 bytes and contains one inline stylesheet and one
  inline script. It is a static marketing page, not a Base44 export.
- “Talk to Elara” links to a **separate Base44 application**. Base44 is the
  customer-care product behind the CTA; it did not generate the website.
- The live revision explicitly labels the operating room as illustrative,
  removed an unsafe checkout/local-storage flow, and says its lead service is
  unavailable. Preserve those safety improvements.

The public GitHub `superagents-site` repository is **stale**:

- GitHub file: 770,723 bytes; old title “Eight Masterworks of Intelligence”.
- Live file: 780,219 bytes; title “Governed AI operations”.
- The GitHub version stores lead PII indefinitely in `localStorage`, includes
  it in payment-provider URL parameters, and has no privacy notice. Never
  redeploy it over the safer Gitea version.

### `agents-studex`

**Quarantine and archive. Reuse reviewed visuals only.**

- A Next.js 14 marketing prototype with hardcoded fleet, VM, terminal, revenue
  and agent displays.
- No auth, API, database, billing, VM provisioning, agent runtime or War Room.
- Most CTAs are `#`; `/login` is a 404.
- Six supposed Orgo desktop links are hardcoded and currently return 404.
- Public `main` contains `scripts/capture-creds.js`, which logs into third-party
  accounts with environment-stored passwords, scrapes authenticated Notion API
  tokens, and writes captured data into a hidden credential directory.

**Required security action:** delete `scripts/capture-creds.js`, remove the
direct Playwright dependency, and rotate affected credentials if the script
was ever run. Cursor Cloud prepared local commit `1d7e83e`, but GitHub rejected
the push because the bot lacks write access.

The pinned Next.js version also has reported critical/high advisories. Do not
deploy this repository.

Potential donors after review: pixel fleet, isometric computers, black/gold
tokens and static dashboard visuals. Do not carry over its Git history,
operational identifiers, compliance claims or fake metrics.

### `studex-agents-nest`

**Archive as a visual prototype. It is not Nest VM code.**

- Three files: README plus two monolithic static HTML dashboards.
- “Agent replies”, “live updates”, prices and meeting logs are timers and
  hardcoded strings.
- “Access VM” only shows an alert. “Send Outreach” only shows a success
  message. Discord setup claims it wrote `.env`, which browser JavaScript
  cannot do.
- No backend, model, VM API, agent process, persistence, authentication,
  WhatsApp, email or Discord integration.
- User input is inserted through `innerHTML`, creating a DOM self-XSS path.
- Public pages expose named alleged clients and unsupported commercial claims.

Keep only reviewed visual ideas. Never give this repository to agents as a
runtime reference.

### `agentic-lab-v3`

**Keep as an internal Developer Factory CLI. Do not turn it into the client
runtime.**

Real capabilities:

- local diagnostics;
- intake JSON and project-directory scaffolding;
- Docker build/run/remove commands;
- GitHub repository creation;
- wrappers around separately installed CashClaw and Mesh-LLM CLIs.

Not implemented:

- web UI or the live `factory.studex-group.com` Next.js source;
- VM provisioning;
- agent orchestration;
- Linear API calls;
- customer auth, billing or durable lifecycle state;
- browser/computer tools.

The generated container runs `sleep infinity`; it does not start an agent.
Docker here is a development sandbox, not client isolation. The stop command
force-removes containers without an approval gate, and generated containers
run as root with writable host mounts and unrestricted networking. Keep this
internal.

### `studex-agent-ecosystem`

The supplied GitHub URL returns 404 to both the authenticated CLI and public
web access. The closest public replacement is `agents-studex`, but that mapping
must not be assumed without owner confirmation.

---

## 3. The product that should be built

### Control plane

A small authenticated service that owns:

- organisation and user records;
- one tenant per client;
- agent identity/configuration;
- VM lifecycle state;
- provisioning jobs and retries;
- health and heartbeats;
- approval/audit events;
- secret references, never secret values;
- plan and billing status.

The control plane is the source of truth for **state**. The Gitea website is the
source of truth for **marketing content**. Base44 is customer care. None should
pretend to own the others.

### VM provider adapter

Start with one provider only. The interface should be small:

```text
create(tenant, bootstrapToken)
status(machineId)
rebuild(machineId)
destroy(machineId)
```

Do not expose SSH, Docker or provider credentials to customers. Bootstrap uses
a single-use, short-lived registration token and an outbound connection back
to the control plane. A machine becomes `ready` only after heartbeat, agent and
computer-use health checks pass.

### Client VM

One isolated VM per client containing:

- one unattended agent harness;
- a browser/computer-use daemon and viewable Linux desktop;
- persistent tenant workspace and memory;
- tenant-scoped integrations;
- system service supervision;
- outbound-only registration/heartbeat;
- upgrade and recovery hooks.

No shared writable host paths, no shared browser profile, and no shared
customer credentials.

### Agent package

Every Super Agent should be portable data, not a bespoke server:

```text
agent.yaml          identity, runtime, model, limits
SOUL.md             voice, values, behaviour
KNOWLEDGE/          approved business documents
TOOLS.yaml          allowlisted capabilities and scopes
POLICY.yaml         approval gates and prohibited actions
CHANNELS.yaml       email/WhatsApp/workspace routing
SCHEDULES.yaml      approved recurring work
```

This is what lets the same Super Agent move between a provider, a local VM or a
future Buzz workspace without rewriting its identity.

---

## 4. Buzz and OpenMausBot: use upstreams, do not clone both

Both upstream projects are Apache-2.0 as of 23 Aug 2026.

### Buzz

Buzz is primarily a multi-human/multi-agent collaboration workspace built on
Nostr. Its remote-agent protocol delegates deployment through provider
binaries and then uses relay presence/messages as the control path.

Useful later for:

- shared client channels;
- durable agent identity;
- human/agent collaboration;
- an open remote-agent provider contract.

It is not itself the per-client computer runtime.

### OpenMausBot

OpenMausBot already supplies:

- a chat roster of real CLI-backed agents;
- per-agent personality and history;
- cloud or local Linux computers;
- Cua-based browser/computer use;
- approval cards;
- Composio app connections;
- an agent harness and event bus.

This is the closer starting point for the Nest VM MVP.

### MVP decision

**Use OpenMausBot as an evaluated upstream runtime inside one client VM. Do not
fork Buzz in the first release.** Keep the integration behind a runtime
interface so Buzz can be added later when clients need shared collaboration
spaces.

Maintain Apache notices and keep StudEx-specific changes narrow. Building a
new chat app, harness and computer driver before validating one paying client
would duplicate the riskiest parts of both upstreams.

---

## 5. Smallest credible Nest VM release

The first release should prove one lifecycle, not every marketing claim:

1. An admin creates one tenant.
2. The control plane provisions one Ubuntu VM through one provider.
3. Cloud-init registers the VM using a single-use token.
4. The runtime starts one Super Agent and one private computer-use service.
5. The admin can open the desktop, send a task and see a heartbeat.
6. Files survive restart.
7. Rebuild and destroy are audited.
8. Base44 handles customer-care questions and onboarding escalation.

Explicitly defer:

- self-service billing;
- WhatsApp automation;
- 11-language guarantees;
- multiple VM providers;
- shared Buzz workspaces;
- autonomous outbound campaigns;
- unsupported POPIA/SLA claims.

Those become real only after the lifecycle above is reliable.

---

## 6. Rules for every agent working on Super Agents

1. **Website edits happen only in Gitea `superagents-site/index.html`.** Never
   fork or copy the file. The GitHub copy is stale and unsafe.
2. **Never claim a mock is live.** Static arrays, timers and canned replies must
   be labelled demo data.
3. **Never use `agents-studex` or `studex-agents-nest` as runtime code.**
4. **Keep Base44 external.** It is customer care, not the VM control plane.
5. **Keep `agentic-lab-v3` internal.** It is the developer factory, not a
   tenant-isolation boundary.
6. **No credential capture or browser scraping for API keys.** Use OAuth,
   provider-issued scoped tokens and a secret manager.
7. **One tenant per VM.** Containers inside the VM are implementation details,
   not cross-tenant isolation.
8. **No `ready` status without evidence:** registration, heartbeat, agent
   health and computer health must all pass.
9. After changing the canonical site, write `{agent-name}-report.md` in the
   owner's designated report location.

---

## 7. Current blockers

1. Gitea is reachable only as `localhost:3000` on Mac1, not from Cursor Cloud.
   A secure network path or GitHub read-only mirror is needed for agents to work
   on the canonical site.
2. The Cloud Agent bot lacks write access to `agents-studex`, so the urgent
   credential-capture removal could not be pushed.
3. The source repositories/Vercel project mappings for `www`, `factory` and the
   redirect shim remain unknown.
4. The first VM provider has not been selected.
5. The repository that will hold the new control plane/runtime has not been
   designated.

