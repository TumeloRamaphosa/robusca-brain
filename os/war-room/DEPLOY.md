# War Room — deployment, and the `www.studex-group.com` question

Authoritative for hosting and domains. Read
[`../../ARCHITECTURE.md`](../../ARCHITECTURE.md) first for what the code is.

**Platform limits below were checked against Vercel and Cloudflare
documentation on 23 Aug 2026.** They change; re-check before acting.

---

## The short answer

**Do not put the War Room on `www.studex-group.com`.**

Two independent reasons:

1. **It has no authentication.** Not "weak auth" — none. Any visitor could read
   three real business inboxes through `GET /api/agentmail/messages` and spend
   the account's paid OpenAI and Higgsfield credits through the two generate
   endpoints. Details in [`ARCHITECTURE.md §4`](../../ARCHITECTURE.md#4-security-read-before-exposing-this-on-a-public-domain).
2. **It is the wrong thing to put at a company apex domain.** The War Room is an
   internal marketing-ops dashboard whose Shopify and Facebook Ads numbers are
   currently hardcoded fake values. `www.studex-group.com` is a public front
   door for a group holding company. These are different products.

The recommended shape:

| Hostname | What lives there | Exists today? |
|---|---|---|
| `www.studex-group.com` | Public marketing site for the group | **No code exists.** Needs to be built or pointed at an existing site. |
| `warroom.studex-group.com` | The War Room dashboard, behind Cloudflare Access | Code exists, needs auth + a stateful host |

That split lets you ship the domain without blocking on the dashboard, and
without exposing the dashboard.

---

## Why it will not "just work" on Vercel

The blocker is the database, and it is a real architectural mismatch rather than
a configuration problem.

`server/storage.ts` line 6:

```ts
const sqlite = new Database("data.db");
```

Three consequences:

1. **`better-sqlite3` is a native C++ addon** compiled through `node-gyp`. It
   needs a real Node process.
2. **It writes to a local file.** Vercel's function filesystem is ephemeral and
   is not shared between instances. Writes vanish on recycle, and two concurrent
   requests can land on two instances with two different databases. Approving a
   content item would appear to work and then silently revert.
3. **Table creation and demo-data seeding run at module import time**, so they
   would re-run on every cold start.

There is no `vercel.json` in this repo, and adding one would not fix any of the
above.

## Why it will not work on Cloudflare Workers at all

Workers run in V8 isolates, not Node processes. **Native addons cannot be loaded
into an isolate** — this is a hard architectural limit that the `nodejs_compat`
flag does not and cannot address. `better-sqlite3` is exactly the case that
never works. Workers also cap memory at 128 MB per isolate on every plan.

Cloudflare's own SQLite options are Durable Objects (`ctx.storage.sql`) or D1,
both of which mean rewriting the data layer against a different API.

**Cloudflare Containers** (paid plans) *can* run this image, since it is a real
Linux container with native binaries — see "Option A" below.

---

## Option A — container host + Cloudflare in front (recommended)

Least code change, and it keeps the app's actual architecture: one long-running
stateful process.

**What changes in the code:** nothing required. Optionally set the SQLite path
from an env var so it can point at a mounted volume.

**Steps**

1. **Containerise.** No Dockerfile exists yet; this one matches the real build:

   ```dockerfile
   FROM node:22-slim AS build
   WORKDIR /app
   RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:22-slim
   WORKDIR /app
   ENV NODE_ENV=production
   # better-sqlite3 is a native addon, so node_modules must be rebuilt/copied,
   # not just the bundle — script/build.ts leaves most deps external.
   COPY --from=build /app/node_modules ./node_modules
   COPY --from=build /app/dist ./dist
   COPY --from=build /app/package.json ./
   EXPOSE 5000
   CMD ["node", "dist/index.cjs"]
   ```

2. **Attach a persistent volume** and mount it where `data.db` is written.
   Without this, every redeploy resets to seeded demo data. This is the step
   people forget.

3. **Deploy** to any container host — Fly.io (the existing docs already assume
   Fly for always-on services, region `jnb` for Johannesburg latency), Railway,
   Render, or Cloudflare Containers.

4. **DNS in Cloudflare.** Add a proxied (orange-cloud) `CNAME` for
   `warroom` pointing at the host. Proxying gives TLS, caching and WAF.

5. **Put Cloudflare Access in front.** This is the important step. Zero
   application code: create an Access application for
   `warroom.studex-group.com`, add a policy allowing only your team's email
   addresses, and Cloudflare enforces login at the edge before any request
   reaches Express. For an internal dashboard this is strictly better than
   writing your own login.

6. **Set the environment variables** from [`.env.example`](.env.example) as
   host-level secrets. Never commit them.

---

## Option B — make it genuinely Vercel-native

Choose this only if serverless is a hard requirement. It is a real refactor of
the data layer, not a config change.

1. **Replace SQLite with a network database.** Drizzle already abstracts most of
   this, so the query bodies in `storage.ts` largely survive; the driver and
   schema dialect change. Note `@supabase/supabase-js` is *already* a dependency
   (currently unused), so Supabase Postgres is the path of least resistance.
   Neon and Vercel Postgres are equivalent choices.
2. **Rewrite `shared/schema.ts`** from `drizzle-orm/sqlite-core` to
   `drizzle-orm/pg-core` (`sqliteTable` → `pgTable`, `integer` autoincrement →
   `serial`, boolean-mode integers → real `boolean`).
3. **Move table creation out of import time.** Delete the raw `sqlite.exec(...)`
   DDL and the seed block; use `drizzle-kit` migrations as the single mechanism.
   Import-time side effects are the thing that makes this app serverless-hostile.
4. **Make the storage helpers async.** Every one is currently synchronous
   (`.all()`, `.get()`, `.run()`), which no network driver supports. This ripples
   into `routes.ts`.
5. **Wrap Express as a single catch-all function** and serve `dist/public` as
   static output, with a `vercel.json` rewriting `/api/*` to it.
6. **Set `maxDuration` for the Higgsfield route.** Its ~210s worst case fits
   under Vercel's 300s default, but leaving a function open that long is
   expensive; moving to a webhook or queue is the better fix.
7. **Delete the `__PORT_5000__` placeholder** in
   [`client/src/lib/queryClient.ts`](client/src/lib/queryClient.ts) — a leftover
   from a Replit-style host's string substitution. It currently self-detects and
   falls back to same-origin, so it is harmless but confusing.

Even after all of that, **auth is still required** before the hostname is
public.

---

## Option C — ship the domain now, decouple the dashboard

Probably the right first move, because it unblocks
`www.studex-group.com` today without touching the dashboard:

1. Build (or point at) a **static marketing site** for
   `www.studex-group.com` and deploy that to Vercel. Static sites are what
   Vercel is genuinely best at, and the existing docs already assign "Vercel =
   marketing / web apps".
2. Keep DNS on Cloudflare, proxied.
3. Do Option A for `warroom.studex-group.com` separately, on its own timeline.

No such marketing site exists in this repo. `deployment/approval_page/index.html`
is a single unrelated static page, and the brand assets referenced by
`STUDEX_OS.md` under `deployment/brand_assets/` are **missing from the working
tree** — they would need to be recovered before a brand site can be built.

---

## Cloudflare and Vercel together

Both accounts already exist under separate owners (a Cloudflare owner and a
Vercel owner — recorded in the owner's own notes, deliberately not duplicated
here). The division of labour that works:

| Concern | Platform |
|---|---|
| Domain registration / nameservers / DNS records | **Cloudflare** |
| TLS at the edge, WAF, DDoS, caching | **Cloudflare** (proxied records) |
| Login wall for internal tools | **Cloudflare Access** |
| Static marketing site hosting | **Vercel** |
| The stateful dashboard | **Container host** (Fly.io / Railway / Render / Cloudflare Containers) |

One caution when combining them: if you point a **Cloudflare-proxied** record at
a **Vercel** project, use Vercel's recommended record and be careful with SSL
mode — Cloudflare's "Flexible" SSL in front of Vercel causes redirect loops.
Use "Full (strict)".

---

## Before any public deployment — checklist

- [ ] Authentication exists (Cloudflare Access, or real app-level auth)
- [ ] `AGENTMAIL_TOKEN` route is not reachable anonymously
- [ ] The two generate endpoints are not reachable anonymously (credit spend)
- [ ] `POST /api/messages/sync` requires a shared secret
- [ ] Persistent volume mounted for `data.db`, or migrated off SQLite
- [ ] Demo seed data removed or clearly labelled — the dashboard currently shows
      invented revenue (R43,585) and 7 invented orders as though they were real
- [ ] The four hardcoded-mock endpoints either wired to real APIs or visibly
      marked as mock in the UI
- [ ] `POST /api/content/:id/post` either implemented or disabled — it currently
      marks items permanently "posted" without publishing anything
- [ ] `npm run check` clean, `npm run build` clean
- [ ] Secrets set as host env vars, never committed

---

## Open questions only the owner can answer

These block further consolidation work, and no amount of reading this repo
resolves them:

1. **Where does `www.studex-group.com` point today**, and is there an existing
   site to preserve? Nothing in this repo references that domain at all.
2. **Which repos hold the "Buzz" WhatsApp agents and "Cypher Trace"?** Neither
   name appears anywhere in this repository. If they are separate deployments,
   consolidation needs their repo URLs.
3. **Is the superagents site (`superagents.studex.dev`) a real deployment?** It
   is described in `notebooklm/notebook-03-super-agents.md` but has no code here.
4. **Which Vercel projects and Cloudflare zones already exist?** Read access to
   both accounts would let this be answered directly instead of inferred.
5. **Should the War Room stay on Perplexity Computer** (its only host to date)
   until the auth work is done?
