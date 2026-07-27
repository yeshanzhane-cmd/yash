# Nizwa Taxi — Mobile (Expo)

A single Expo app covering both the **passenger** and **driver** flows, themed
on the Nizwa Taxi Brand Identity System v1.0. This is a demo/prototype build:
all data is mocked in `src/mock/data.ts` — there is no backend, and no
network calls are made. It is meant to be run in Expo Go on a real iOS or
Android device (or a simulator/emulator), not shipped to an app store as-is.

## Run it

```bash
npm install
npm run start     # then scan the QR code with Expo Go (iOS or Android)
npm run ios       # macOS + Xcode simulator only
npm run android   # Android emulator
npm run web       # not officially supported by this template; mobile-first
```

## What's here

- `app/index.tsx` — brand splash + Passenger/Driver role select
- `app/(passenger)/` — Home, Quote, Matching, Tracking, Receipt, Trip history
- `app/(driver)/` — Home (online toggle), Offer (15s countdown), Navigate,
  Earnings (gross/commission/net, negative-wallet cash model)
- `src/theme/tokens.ts` — every color/font/space value from the brand system;
  components must pull from here, never hardcode a hex or font family
- `src/i18n/` — all user-facing strings in English and Arabic, with a live
  language toggle and RTL-aware layouts (no `I18nManager.forceRTL`, since
  that requires a native reload — layouts mirror via `isRTL` flags instead)
- `src/lib/money.ts` — integer-baisa money handling (1 OMR = 1000 baisa),
  mirroring the `packages/money` invariant from the production build prompt
- `src/mock/data.ts` — every ride, driver, fare and trip-history record the
  screens render

## What's intentionally not here

Per the build prompt's own phasing (it explicitly says not to build the full
system in one pass), this app has no: real backend, database, auth, payments,
push notifications, or live maps/GPS integration. `MapsProvider` and
`PaymentProvider`-shaped seams aren't wired to anything real yet — the map
screens use a stylised `MapCanvas` placeholder instead of a paid maps SDK.
