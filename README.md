# Nizwa Taxi — Mobile App & Admin Dashboard (Demo)

A functional, brand-accurate demo of the Nizwa Taxi ride-hailing platform,
built from the Brand Identity System v1.0 and the MVP build prompt in
`CLAUDE.md`'s project context.

This is a **prototype**, not the production system described in the build
prompt's 8-phase plan — that document itself says not to attempt the full
NestJS/Postgres/Redis/PostGIS backend in one pass. What's here is meant to
be tapped through and demoed today, on a real phone, with no setup beyond
`npm install`.

## What's included

| Path | What it is |
|---|---|
| `apps/mobile/` | One Expo (React Native) app, iOS + Android, covering both the **passenger** flow (home, quote, matching, live tracking, receipt, trip history) and the **driver** flow (online toggle, 15s ride offer, navigate, earnings) |
| `apps/admin/index.html` | A single self-contained HTML admin dashboard — ops overview, driver verification queue, document expiry board, ride list with status-history timeline and manual intervention, versioned pricing rules with a diff view, zone open/close, finance summary, support tickets |

Both surfaces share the same design tokens (colors, type, spacing) lifted
directly from the Brand Identity System, and both run entirely on mock data
— there is no backend, no database, and no network calls other than loading
Google Fonts.

## Run the mobile app

```bash
cd apps/mobile
npm install
npm run start
```

Scan the QR code with **Expo Go** on an iOS or Android device, or press `i`
/ `a` for a simulator/emulator if you have Xcode or Android Studio set up.
See `apps/mobile/README.md` for what's implemented and what's deliberately
left out.

## Open the admin dashboard

`apps/admin/index.html` is a static file — open it directly in a browser,
or serve the folder with anything (`npx serve apps/admin`). No build step.

## Design system

Both surfaces are built strictly from the brand identity file's palette and
type system (Fort Green, Falaj Green, Nizwa Sand, Date Copper, Souq Clay,
Basalt, Limewash, Taxi Amber; Archivo / Noto Kufi Arabic / IBM Plex Sans
Arabic / IBM Plex Mono) — no invented colors, no rounded corners outside the
app-icon tile, no gradients or effects on the mark.

## Not in scope for this demo

Per the build prompt's own explicit "out of scope for MVP" list, plus the
practical limits of a prototype: no real backend, auth, payments gateway,
push notifications, live GPS/maps SDK, surge pricing, ride pooling, or
in-app chat. See `apps/mobile/README.md` for the full list of what's stubbed
versus what's real.
