# StudEx — Architecture, Source of Truth

**Status:** authoritative. Written by reading and running the code, not by reading the other docs.
**Last verified:** 23 Aug 2026 — `npm run check` clean, `npm run build` clean, server booted and endpoints probed.

If any other file in this repo contradicts this one, this one wins. See
[Which document wins](#which-document-wins) for why, and
[`os/war-room/DEPLOY.md`](os/war-room/DEPLOY.md) for how to get onto
`www.studex-group.com`.

---

## 1. The single most important fact

**This repository contains exactly one runnable application:
[`os/war-room/`](os/war-room/).**

Everything else — and it is roughly 95% of the repo by file count — is
Markdown plans, brand images, or configuration stubs for platforms that are not
in this repo. That is the root cause of the confusion. Agents read
`deployment/studex_os/CLAUDE_MEGAPROMPT.md`, see a detailed 7,000-word spec for a
Next.js monorepo called "Charlie OS", and start behaving as though that codebase
exists here. It does not. No file of it has ever been written.

| Thing | Status in this repo |
|---|---|
| War Room dashboard (`os/war-room/`) | **Real code. Builds and runs.** |
| Approval page (`deployment/approval_page/index.html`) | Real, single static HTML file |
| AionUI extension stubs (`studex-empire/`, `studex-dench-channel/`) | Config JSON + two console-logging JS files. No working plugin. |
| Skills (`skills/*/SKILL.md`) | Markdown instructions for agents. No executable code. |
| Charlie OS | **Plan only.** Zero code. |
| Super Agents site (`superagents.studex.dev`) | **Plan only.** Zero code. |
| Studex Global Markets | **Plan only.** Lives in another repo (`static-global-markets`). |
| Meta-CLI / WhatsApp sender | **Plan only.** Zero code. |
| BAASH VM, Auto Meat VM, NestVM | **Plan only.** External infrastructure. |

---

## 2. What the War Room actually is

A single Node process that serves both a JSON API and a React single-page app on
one port. It is a **content approval and marketing dashboard** for StudEx Meat.

```
Browser
  │  GET /            → index.html + JS bundle   (Express static, prod)
  │  GET /api/*       → JSON                      (Express routes)
  ▼
os/war-room  ── one Node process, one port (default 5000) ──
  ├── client/   React 18 + Vite 7 + Tailwind 3 + shadcn/ui   (the SPA)
  ├── server/   Express 5                                     (API + static)
  ├── shared/   Drizzle schema, imported by BOTH sides
  └── data.db   SQLite file on local disk  ← see §6, this is the deploy blocker
```

### Stack, precisely

| Layer | Choice |
|---|---|
| Client | React 18, Vite 7, TypeScript 5.6, Tailwind 3, shadcn/ui (Radix), Recharts, Framer Motion |
| Routing | `wouter` with **hash** routing (`useHashLocation`) — URLs look like `/#/` |
| Data fetching | TanStack Query v5, `staleTime: Infinity`, no refetch on focus, no retry |
| Server | Express 5 on Node, `tsx` in dev, esbuild-bundled CJS in prod |
| Database | **SQLite via `better-sqlite3`**, accessed through Drizzle ORM |
| Build | `script/build.ts` — Vite for client, esbuild for server, into `dist/` |

### The four source directories

- **`client/`** — the SPA. `App.tsx` is the whole router: a fixed `TABS` array
  drives a tab bar, and the active tab conditionally renders one page component.
  There is only one real route (`/`); everything is tab state in `useState`.
  14 tabs, 13 backed by a real page, 1 (`approvals`) rendering a
  "Coming Soon" placeholder.
- **`server/`** — `index.ts` (bootstrap, JSON body capture, request logging,
  error handler, chooses Vite middleware vs static serving), `routes.ts` (all 15
  API endpoints), `storage.ts` (opens SQLite, creates tables, **seeds demo
  data**, exports a `storage` object of query helpers), `static.ts`,
  `vite.ts` (dev only).
- **`shared/`** — `schema.ts`. Four Drizzle tables plus derived Zod insert
  schemas and TypeScript types. Imported by client and server, which is why the
  client can `import type { ContentItem } from "@shared/schema"`.
- **`script/`** — `build.ts`. Note the `allowlist`: only listed packages get
  bundled into the server binary; everything else stays external and must be
  present in `node_modules` at runtime. **The production bundle is not
  self-contained.**

### Data model (`shared/schema.ts`)

| Table | Holds |
|---|---|
| `content_items` | The core entity: a social post — title, asset path, caption, hashtags, platform, `status` (draft/approved/rejected/posted), campaign, schedule date, FB/IG post IDs |
| `calendar_events` | Dated campaign entries for the calendar tab |
| `analytics_cache` | Generic key/value string cache. Helpers exist but **nothing calls them.** |
| `cached_messages` | Gmail/AgentMail messages pushed in by an external agent |

`storage.ts` creates these with raw `CREATE TABLE IF NOT EXISTS` on import, and
**seeds 7 content items and 12 calendar events if the tables are empty.** So a
fresh boot always shows populated demo data. Drizzle migrations
(`drizzle.config.ts`, `db:push`) exist in parallel with that raw SQL — two
schema mechanisms for the same tables, which is a trap.

---

## 3. The 15 API endpoints, honestly categorised

This is the part most likely to mislead. The UI looks live. Much of it is not.

**Backed by the real SQLite database (6):**
- `GET /api/content` — all content items
- `PATCH /api/content/:id/status` — approve / reject, with optional note
- `POST /api/content/:id/post` — see the warning below
- `GET /api/calendar` — all calendar events
- `GET /api/messages` — cached messages, optional `?source=`
- `POST /api/messages/sync` — bulk upsert of messages from an external agent

**Calling a real third-party API (3):**
- `POST /api/generate/caption` — OpenAI `gpt-4o`, streamed back as
  Server-Sent Events. Needs `OPENAI_API_KEY`.
- `POST /api/higgsfield/generate` — Higgsfield image, optionally then
  image-to-video. Needs `HIGGSFIELD_KEY_ID` + `HIGGSFIELD_KEY_SECRET`.
- `GET /api/agentmail/messages` — fans out over three inbox addresses
  **hardcoded in `routes.ts`**. Needs `AGENTMAIL_TOKEN`, else 503.

**Returning hardcoded numbers that look like live data (4):**
- `GET /api/analytics/shopify` — always `revenue: 43585, orders: 4`
- `GET /api/shopify/unfulfilled` — a fixed list of 7 invented orders
- `GET /api/shopify/today` — always the same three figures
- `GET /api/facebook/ads` — a fixed account, 1 campaign, 1 adset, 1 ad

**No-op stubs (2):**
- `PATCH /api/content/:id/caption` — returns `{ success: true }` and saves nothing
- `GET /api/gmail/messages` — returns `[]` unconditionally

### Two traps worth naming

**There is no Shopify integration and no Facebook Ads integration.** The
"Shopify" and "Ads" tabs render invented constants. The revenue figure of
R43,585 on the dashboard is a literal in `routes.ts`. Nobody should be making
decisions from those numbers.

**`POST /api/content/:id/post` does not post anything.** It calls
`storage.markPosted(id, null, null)`, which flips `status` to `"posted"` and
stamps `postedAt` in the local database, then replies
`"Queued for posting"`. Nothing is queued, no Meta API is called, and the FB/IG
post IDs are written as null. The item is now permanently marked posted while
never having been published.

### Adding new content requires a code change

`storage.ts` seeds `assetPath` values like `/assets/tomahawk-hero.jpg`, but Vite
hashes assets at build time. `ContentQueue.tsx` bridges this with a hardcoded
`assetMap` from those paths to statically-imported images, via
`getAsset(path)` which falls through to the raw string on a miss. So a content
row whose asset is not in `assetMap` renders a broken image. **Content is not
data-driven; adding a post means editing and redeploying the client.**

---

## 4. Security: read before exposing this on a public domain

**The application has no authentication of any kind.** `package.json` declares
`passport`, `passport-local`, `express-session` and `memorystore`, and
`@supabase/supabase-js` and `ws` besides — **none of them are imported by any
source file.** They are scaffold leftovers that make the app look like it has a
login when it has none. There is no session, no middleware, no API key check on
any route.

Publishing this at `www.studex-group.com` as it stands would mean any anonymous
visitor on the internet can:

| Endpoint | What a stranger could do |
|---|---|
| `GET /api/agentmail/messages` | **Read the subjects, senders and body snippets of three real business inboxes**, including the CTO inbox |
| `POST /api/higgsfield/generate` | **Spend the account's paid Higgsfield credits**, in a loop, at will |
| `POST /api/generate/caption` | **Spend the account's paid OpenAI credits** on arbitrary prompts |
| `PATCH /api/content/:id/status` | Approve or reject any content item |
| `POST /api/content/:id/post` | Mark any item permanently "posted" |
| `POST /api/messages/sync` | Write arbitrary forged rows into the message table |
| `GET /api/shopify/unfulfilled` | Read order values and customer initials (mock today, real if wired up) |

Note also that `POST /api/messages/sync` has no shared secret, so the
"Perplexity Computer pushes messages here" design is unauthenticated by
construction.

**Consequence for the domain question:** authentication is a prerequisite for
`www.studex-group.com`, not a follow-up. The cheapest credible options are
Cloudflare Access in front of the whole origin (zero application code, good for
an internal dashboard) or a real login in Express. Recommendation and detail in
[`DEPLOY.md`](os/war-room/DEPLOY.md).

---

## 5. Running it locally

```bash
cd os/war-room
npm ci
cp .env.example .env        # then fill in keys; all are optional for a first boot
npm run dev                 # tsx + Vite middleware, http://localhost:5000
```

Production mode:

```bash
npm run build               # Vite → dist/public, esbuild → dist/index.cjs
NODE_ENV=production PORT=5000 node dist/index.cjs
```

Both paths are verified working as of the date at the top of this file. A first
boot creates `data.db` in the working directory and seeds it.

`npm run check` runs `tsc` and should report **zero** errors. If it does not, fix
that before anything else — a repo that does not typecheck is the single biggest
source of agent confusion here.

---

## 6. Why this cannot go straight onto Vercel or Cloudflare

The user-facing goal is `www.studex-group.com` on Vercel with Cloudflare. The
app in its current shape is architecturally incompatible with both, for reasons
that are worth understanding rather than working around:

1. **`better-sqlite3` writes to a local file.** It is a native C++ Node addon
   and `storage.ts` opens `new Database("data.db")` on the local filesystem at
   import time. Vercel's serverless filesystem is ephemeral and not shared
   between invocations, so writes are lost and different requests see different
   state. Cloudflare Workers cannot load native Node addons at all.
2. **`storage.ts` does real work at import time** — creating tables and seeding
   rows. In a serverless model that runs on every cold start.
3. **`POST /api/higgsfield/generate` polls in-process for up to ~90s for the
   image and a further ~120s for the video** — roughly 210s worst case. This
   does fit inside Vercel's current 300s default function duration, so it is
   not a hard blocker there, but it means holding a billed function instance
   open for three and a half minutes per image. A webhook or job queue is the
   right shape for this work.
4. **The production server bundle is not self-contained** — `script/build.ts`
   marks everything outside its `allowlist` as external, so `node_modules` must
   ship alongside `dist/index.cjs`.
5. **`client/src/lib/queryClient.ts` contains a `__PORT_5000__` placeholder**
   that a previous host substituted at deploy time. It currently self-detects
   and falls back to same-origin, so it is harmless, but it is a leftover from
   a Replit-style scaffold and should be deleted.

The short version: **this is a stateful long-running container app, not a
serverless app.** Deploy it as a container, and use Cloudflare for DNS and
access control in front. Full options, trade-offs and step-by-step in
[`os/war-room/DEPLOY.md`](os/war-room/DEPLOY.md).

---

## 7. Which document wins

The repo currently contains at least four documents that each claim to define
"the" operating system, plus two different `AGENTS.md` files with unrelated
meanings. Agents pick one at random and act on it. Precedence, highest first:

1. **This file** — for anything about how the code is actually built.
2. **[`os/war-room/DEPLOY.md`](os/war-room/DEPLOY.md)** — for anything about hosting and domains.
3. **[`AGENTS.md`](AGENTS.md)** (repo root) — agent conduct, safety, memory rules.
4. **[`os/agents/AGENTS.md`](os/agents/AGENTS.md)** — historical War Room build spec. **Treat as an archive.** It targets a repo named `studex-content-hub/` that does not exist under that name.
5. Everything under `deployment/`, `notebooklm/`, and the `*MEGAPROMPT*` /
   `*MEGA_PROMPT*` files — **aspirational business and product planning.**
   Useful as intent. **Not a description of any code that exists.**

### Contradictions to stop repeating

These are live disagreements between existing docs. Resolved values:

| Question | Conflicting claims | Use this |
|---|---|---|
| Who is the orchestrator agent? | "Charlie" in `deployment/studex_os/*`; "Robusca" in `SOUL.md` / `IDENTITY.md` | **Robusca.** Charlie was renamed 15 Jun 2026; the `deployment/` docs were never updated. |
| What is Hermes? | "WhatsApp & Email" (`STUDEX_OS.md`), "CTO / DevOps" (`team/board-of-directors.md`), "CEO" (`studex-empire/contributes/agents.json`) | Unresolved — **needs an owner decision.** Do not assume. |
| Where does the War Room run? | Fly.io, Vercel, Orgo.ai, and Perplexity Computer are each asserted somewhere | **Undecided until `DEPLOY.md` is actioned.** It has only ever run on Perplexity Computer and locally. |
| What is the coordination layer? | Notion, ClickClack.chat, Discord, the War Room itself, AionUI ACP mesh | Unresolved — **needs an owner decision.** |
| What timezone is the owner in? | `Asia/Dubai` (`USER.md`) vs `Africa/Johannesburg` (everything operational) | **Africa/Johannesburg (SAST).** `USER.md` is stale; `MEMORY.md` records the correction. |
| What is the app called? | "War Room", "studex-content-hub" | **War Room**, at `os/war-room/`. |

### Broken references in existing docs

Do not chase these; they do not exist:
`protocols/NALEDI_IDENTITY.md`, `deployment/brand_assets/` (referenced by
`STUDEX_OS.md`), `studex-empire/contributes/assistants.json`, and the
`schemas/aion-extension-v1.json` both extensions declare.

---

## 8. The live `studex-group.com` estate

**This section is the important one for consolidation.** The domain is live and
carries four hostnames. **None of their source code is in this repository.**
Probed directly on 23 Aug 2026:

| Hostname | What it serves | Build system | Host |
|---|---|---|---|
| `studex-group.com` + `www.` | "The Ecosystem" hub page, ~11 KB. Links to Dark Factory and Global Markets. | **Next.js** | Vercel |
| `factory.studex-group.com` | "Dark Factory v3 — Agentic Build Factory", ~16 KB | **Next.js** | Vercel |
| `markets.studex-group.com` | HTTP 307 redirect only, 15-byte body | **Redirect shim** | Vercel → `globalmarkets.pplx.app` (which is behind Cloudflare) |
| `superagents.studex-group.com` | Super Agents marketing site, **780 KB single HTML file** — 1 `<script>`, 1 `<style>`, zero external JS, no framework directories | **Base44**, published as one inlined file | Vercel |

### DNS and the "Vercel and Cloudflare" question, resolved

- **Nameservers are Cloudflare** (`javon.ns.cloudflare.com`,
  `suzanne.ns.cloudflare.com`), so Cloudflare holds the zone.
- **Every record is DNS-only ("grey cloud").** They resolve straight to Vercel
  anycast IPs (`76.76.21.x`, `66.33.60.x`) and **no response carries a `cf-ray`
  header**, so no traffic is proxied through Cloudflare.

So: **Cloudflare is the DNS zone, Vercel is the entire hosting layer.** Cloudflare
is not providing WAF, caching or access control for any of it today. That has a
direct consequence for security options — see
[`DEPLOY.md`](os/war-room/DEPLOY.md).

### Why the estate feels "confused"

Four concrete, verifiable problems:

1. **Four hostnames, three different build systems, no shared repository.** Two
   Next.js apps, one Base44 single-file export, one redirect shim. No monorepo,
   no shared component library, no shared design tokens.
2. **The front door does not link the newest product.** The `www` hub links only
   Dark Factory and Global Markets. **Super Agents is orphaned** — nothing on
   `www` points to it.
3. **The hub is stale.** Its Vercel cache age was ~14 days at probe time, versus
   ~16 hours for Super Agents. The front page is the least-maintained property.
4. **Global Markets is not really on this estate.** `markets.` is a redirect to
   `globalmarkets.pplx.app`, a Perplexity-hosted app. The subdomain is a
   signpost, not a deployment.

### The Base44 constraint — read before planning consolidation

`superagents.` is built on **Base44**, an AI app-builder with a managed backend.
Its marketing page is a static single file on Vercel, but the actual product sits
in Base44 — the "Talk to Elara" call-to-action points at
`app.base44.com/superagent/<id>`.

Base44 export is **frontend-only**. You can export the React frontend, backend
function sources and a schema description, but **the database and the managed
auth/hosting stay on Base44**, and exported code keeps calling the Base44 SDK.
Practically: **the Super Agents product cannot be fully pulled into a shared
repo.** Any "put all the code together" plan has to either treat Base44 as an
external service behind an API boundary, or accept a real rebuild of that
backend. This is the single biggest constraint on consolidation, and it is a
commercial decision rather than a technical one.

## 8b. Still genuinely absent

- **"Buzz" agents (WhatsApp).** No file in this repo mentions Buzz, and none of
  the four live sites reference it. WhatsApp is variously attributed to Hermes,
  Robusca, Charlie and Auto-Meat, always over the **Meta Cloud API** (Twilio as
  backup), and **no WhatsApp code exists anywhere here** — only
  `skills/studex-meta-whatsapp/SKILL.md` and the
  `deployment/META_CLI_HANDOFF.md` plan. Most likely it lives inside Base44,
  which would explain the "they have their own operating system" description.
- **"Cypher Trace".** No mention in this repo or on any of the four sites. The
  CTO-ish role in these docs is assigned to Hermes.
- **Source for any of the four live sites.** This repo holds the War Room and
  documentation only. The `cursor/dark-factory-pr10-launch-prep-1355` branch
  suggests Dark Factory work has touched this repo, but the deployed Next.js app
  is not here.

Consolidating the estate therefore needs the **repo URLs or Vercel project
names** for those four sites — nothing in this repository can reach them. See
the open questions at the end of `DEPLOY.md`.
