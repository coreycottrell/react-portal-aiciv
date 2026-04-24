# TGIM Bundle

This directory is the landing zone for the **TGIM v4.x** portal bundle
delivered by the **Keel** team (puretechnyc) as part of the Phase 1 TGIM
integration (Russell Korus / Parallax coordination).

## Status

**Empty scaffold.** The bundle itself is delivered via a separate PR from
Keel (`feat/tgim-bundle-v0.3.0` or similar). This PR only sets up the
server-side proxy and documents the expected contract.

## Expected Files

| File            | Purpose                                                                          |
|-----------------|----------------------------------------------------------------------------------|
| `tgim.js`       | Pre-built ES module exporting `TGIM_ROUTES` and `TGIM_NAV_ITEMS`                 |
| `tgim.css`      | Tailwind-compiled styles, scoped to `.tgim-scope` to avoid bleeding into portal  |
| `manifest.json` | Version + build metadata (`{ version, build, hash, built_at }`)                  |

## Integration Contract

`tgim.js` must export two named constants matching the existing
`WITNESS_ROUTES` / `WITNESS_NAV_ITEMS` shape in `src/extensions.ts`:

```ts
export interface TgimRoute {
  path: string                                                  // e.g. '/tgim/briefing'
  component: () => Promise<{ default: React.ComponentType }>    // lazy import
}

export interface TgimNavItem {
  to: string
  icon: string
  label: string
}

export const TGIM_ROUTES: TgimRoute[]
export const TGIM_NAV_ITEMS: TgimNavItem[]
```

All TGIM API calls from the bundle should hit **`/api/tgim/<path>`** (the
portal proxy), not the backend directly. The portal injects the service key
and user email server-side.

## Backend Proxy

The matching proxy lives in `portal_server.py`:

- `_tgim_upstream_url()` — rewrites `/api/tgim/<rest>` → `<TGIM_BACKEND_URL>/api/v1/<rest>`
- `_tgim_headers()` — injects `X-TGIM-Service-Key` and `X-TGIM-User`
- `api_tgim_proxy()` — catch-all handler registered at `Route("/api/tgim/{path:path}")`

Env vars loaded from `~/.env`:

- `TGIM_BACKEND_URL` — default `http://157.230.191.4:8089`
- `TGIM_SERVICE_KEY` — shared secret (never committed)
- `TGIM_DEFAULT_USER_EMAIL` — fallback when no session user available

## Auth Strategy: Option B

Agreed with Parallax (TGIM backend owner):

1. Portal authenticates to TGIM backend via shared service key
2. Portal passes the authenticated portal user's email as `X-TGIM-User`
3. Parallax allowlists the portal's outbound IP (`37.27.237.109`) as a
   second auth layer
4. TGIM backend resolves the `X-TGIM-User` email to an entity and enforces
   per-user authorization on its side

## Wiring Up (after Keel's bundle lands)

1. `src/App.tsx` — uncomment the `import { TGIM_ROUTES } from '../vendor/tgim/tgim'`
   line and render `{TGIM_ROUTES.map(...)}` alongside `{WITNESS_ROUTES.map(...)}`
2. `src/components/layout/Sidebar.tsx` — same pattern for `TGIM_NAV_ITEMS`
3. Add `vendor/tgim/tgim.css` to the root CSS load order (once, in `main.tsx`
   or `index.html`)
4. Smoke-test against the live backend with Ahsen's entity:
   - Expected: `GET /api/tgim/entity/me` returns
     `{ ok: true, data: { entity_id: "ent_ahsen", role: "super_user" } }`

## Contacts

- **Parallax** — `parallax@agentmail.to` — backend owner, service key issuer
- **Keel** — `keel@agentmail.to` — bundle builder (separate PR)
- **Witness Support** — provided the production outbound IP
- **Russell Korus** — final approval
