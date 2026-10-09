# Dark Factory PR #10 — Launch Prep Handoff

**Target PR:** [SrudEx-Agents-Nest-Cloud-VM#10](https://github.com/TumeloRamaphosa/SrudEx-Agents-Nest-Cloud-VM/pull/10)  
**Base branch:** `devin/1783524324-merge-monorepo`  
**Nest path:** `/Users/project2571/nest-integration/war-room-monorepo`  
**Local commit (unpushed):** `77305719f05f102e5301639c2869b76e0bbb9429` on `cursor/site-launch-prep-1355`

## Why this handoff exists

Cursor Cloud completed the remaining launch-prep work, but `cursor[bot]` cannot push to `TumeloRamaphosa/SrudEx-Agents-Nest-Cloud-VM` (403). Apply this patch on Nest / with write access, then push onto PR #10.

## Already done on PR #10 (pre-existing)

- Admin-auth guard (`DARK_FACTORY_ADMIN_TOKEN`)
- KV production hard-fail
- Pricing alignment (`SERVICE_CATALOG` ↔ engine `services.json`)

## This package adds

1. **Required `USD_TO_ZAR` in live/production** — no silent `18.5` fallback when `PAYFAST_ENV=live` or `NODE_ENV`/`VERCEL_ENV` is production
2. **Route-level Vitest coverage** for `requireAdmin`, KV production hard-fail, and PayFast ITN signature verification
3. **Verified locally in `apps/site`:**
   - `npm test` → 6 passed
   - `npm run build` → pass
   - `npx tsc --noEmit` → pass

## Apply on Nest (preferred)

```bash
cd /Users/project2571/nest-integration/war-room-monorepo
git fetch origin
git checkout devin/1783524324-merge-monorepo
git pull origin devin/1783524324-merge-monorepo

# From this handoff (or copy the patch onto the Nest box)
git apply /path/to/0001-Add-PayFast-env-guards-and-route-tests.patch
# or: git am /path/to/0001-Add-PayFast-env-guards-and-route-tests.patch

cd apps/site
npm install
npm test
npm run build
npx tsc --noEmit

git add -A
git commit -m "Add PayFast env guards and route tests"
git push origin HEAD:devin/1783524324-merge-monorepo
# or push a follow-up branch and open/update PR against main as needed
```

## Files in this handoff

| Path | Purpose |
|------|---------|
| `0001-Add-PayFast-env-guards-and-route-tests.patch` | Full commit patch (includes lockfile) |
| `apps/site/src/lib/payfast.ts` | Env-required USD→ZAR rate |
| `apps/site/src/app/api/routes.test.ts` | Route-level tests |
| `apps/site/vitest.config.ts` | Vitest config |
| `apps/site/package.json` | Adds `test` script + vitest |
| `apps/site/.env.local.example` | Documents PayFast + `USD_TO_ZAR` |

## Production env reminder

Set `USD_TO_ZAR` (positive number) whenever PayFast is live or the site runs in production. Sandbox/local may still default to `18.5`.
