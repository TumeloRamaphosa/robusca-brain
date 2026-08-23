# War Room — deployment, and the `www.studex-group.com` question

Authoritative for hosting and domains. Read
[`../../ARCHITECTURE.md`](../../ARCHITECTURE.md) first for what the code is.

**Platform limits below were checked against Vercel and Cloudflare
documentation on 23 Aug 2026.** They change; re-check before acting.

---

## The estate as it actually exists

`studex-group.com` is **already live on Vercel**, with Cloudflare holding the DNS
zone. Verified by direct probe on 23 Aug 2026 — full detail and the canonical
Gitea boundary are in
[`ARCHITECTURE.md §8`](../../ARCHITECTURE.md#8-the-live-studex-groupcom-estate).

| Hostname | Serves | Build | Status |
|---|---|---|---|
| `www.` + apex | "The Ecosystem" hub | Next.js | **Live.** Cache ~14 days old — the least-maintained property. |
| `factory.` | Dark Factory v3 | Next.js | Live |
| `markets.` | 307 redirect → `globalmarkets.pplx.app` | shim | Live, but hosted off-estate on Perplexity |
| `superagents.` | Super Agents marketing site | Hand-authored static HTML, one 780 KB inlined file | Live |

**Nameservers are Cloudflare, but every record is grey-cloud (DNS-only)** and
resolves directly to Vercel IPs with no `cf-ray` on any response. So Cloudflare
is the DNS zone only; Vercel is the whole hosting layer. Nothing is currently
proxied, cached or protected by Cloudflare.

## The short answer for the War Room

**Do not put the War Room on `www.studex-group.com`.**

1. **It has no authentication.** Not "weak auth" — none. Any visitor could read
   three real business inboxes through `GET /api/agentmail/messages` and spend
   the account's paid OpenAI and Higgsfield credits through the two generate
   endpoints. Details in [`ARCHITECTURE.md §4`](../../ARCHITECTURE.md#4-security-read-before-exposing-this-on-a-public-domain).
2. **`www` is already taken by the group hub**, and overwriting a live front door
   with an internal dashboard whose revenue figures are hardcoded fakes would be
   a bad trade.

The recommended shape:

| Hostname | What lives there | Status |
|---|---|---|
| `www.studex-group.com` | The existing "Ecosystem" hub — **leave it**, but fix the gap below | Live |
| `warroom.studex-group.com` | The War Room dashboard, access-controlled | New subdomain needed |

### The quickest win on the estate has nothing to do with the War Room

**The `www` hub does not link Super Agents at all.** It offers only Dark Factory
and Global Markets, while `superagents.` — the newest and most commercially
developed property, with full pricing — is orphaned from the front door. Adding
that third card to the hub is a small change to one Next.js page and is almost
certainly the highest-value edit available on this domain right now.

That change belongs in whichever repo holds the hub, which **is not this one.**

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

## Option C — leave the public estate alone, subdomain the dashboard

Lowest risk, and it decouples the two timelines:

1. **Do not touch** `www`, `factory.` or `superagents.` — they are live and
   working. Fix only the missing Super Agents link on the hub, in the hub's own
   repo.
2. Add `warroom.studex-group.com` as a **new** Cloudflare DNS record and do
   Option A for it.
3. Decide separately whether `markets.` should stop being a redirect to
   `globalmarkets.pplx.app` and become a real deployment on the estate.

This is the recommended sequencing: it needs no coordination with whoever owns
the four existing Vercel projects.

---

## Cloudflare and Vercel together

Both accounts already exist under separate owners (a Cloudflare owner and a
Vercel owner — recorded in the owner's own notes, deliberately not duplicated
here). The division of labour, matching what is **already** in place:

| Concern | Platform | In place today? |
|---|---|---|
| Nameservers / DNS zone | **Cloudflare** | **Yes** |
| Hosting for all four public sites | **Vercel** | **Yes** |
| TLS at the edge, WAF, DDoS, caching | Cloudflare, requires **proxied** records | **No** — all records are grey-cloud |
| Login wall for internal tools | Cloudflare Access | No |
| The stateful dashboard | Container host (Fly.io / Railway / Render / Cloudflare Containers) | No |

### Important caveat on Cloudflare Access

**Cloudflare Access only protects traffic that is proxied through Cloudflare.**
Every `studex-group.com` record is currently DNS-only, so Access would do nothing
for the existing Vercel sites without first orange-clouding them — and proxying
Cloudflare in front of Vercel adds its own problems (double CDN, cache
invalidation confusion, and redirect loops unless SSL mode is **Full (strict)**;
never "Flexible").

Two consequences:

- **For the existing Vercel sites**, prefer Vercel's own protection (Deployment
  Protection / password protection / SSO) over Cloudflare Access. It sits
  natively in front of the deployment and needs no DNS change.
- **For `warroom.` on a container host**, Cloudflare Access is genuinely the
  right answer — you create that record fresh, so you can orange-cloud it from
  the start without disturbing anything already live.

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

## Answered by probing the live estate

- **Where does `www.studex-group.com` point?** A live Next.js "Ecosystem" hub on
  Vercel. There is an existing site to preserve.
- **Is the Super Agents site real?** Yes, at
  `superagents.studex-group.com` — not `superagents.studex.dev` as the
  `notebooklm/` docs claim. That domain reference is stale.
- **Vercel or Cloudflare?** Cloudflare holds the DNS zone; Vercel hosts
  everything. All records are DNS-only.

## Open questions only the owner can answer

These block consolidation, and nothing in this repo resolves them:

1. **Which repos or Vercel projects hold the four live sites?** None of their
   source is here. Consolidation cannot start without repo URLs or Vercel
   project names. This is the top blocker.
2. **How will agents reach the canonical Gitea site?** The owner confirmed that
   `localhost:3000/tumelo/superagents-site.git` on Mac1 is the single source of
   truth. Cursor Cloud cannot reach another machine's `localhost`; it needs a
   secure network route or read-only mirror.
3. **Which provider should host the first client VM?** The supplied Nest and
   Factory repositories do not provision VMs. Choose one provider before
   implementing an adapter.
4. **Who is "Cypher Trace"?** No mention anywhere. If this is a person or agent
   with account access, they may be the only route to the four repos.
5. **Should `markets.` stop being a redirect** to `globalmarkets.pplx.app` and
   become a real deployment on the estate?
6. **Should the War Room stay on Perplexity Computer** (its only host to date)
   until the auth work is done?

Read access to the Vercel and Cloudflare accounts would answer 1, 5 and much of
the domain mapping directly. Credentials can be added as Cloud Agent secrets in
the Cursor dashboard.
