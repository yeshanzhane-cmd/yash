# Atelier — Curated Design Asset Store

A no-build, static e-commerce storefront selling digital products for designers
(typefaces, UI kits, icon sets, mockups, textures). Open `index.html` in a
browser — no install, no build step, no dependencies.

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Landing page — hero, featured collection, manifesto, categories, testimonials, drop-list signup |
| `shop.html` | Full catalog with category filters (`?cat=Typefaces` etc.) |
| `product.html` | Product detail, driven by `?id=<product-id>`, with quantity picker and related items |
| `cart.html` | Cart with quantity steppers, removal and order summary |
| `checkout.html` | Demo checkout with client-side validation and order confirmation |

## Structure

```
index.html / shop.html / product.html / cart.html / checkout.html
assets/
  css/
    base.css      # design tokens, primitives, nav, cards, forms, footer
    landing.css   # landing-page sections
    store.css     # shop, product, cart, checkout
  js/
    products.js   # product catalog — single source of truth
    cart.js       # cart state (localStorage) + badge updates
    ui.js         # money formatting, CSS product art, cards, scroll reveals
```

## How it works

- **Products** live in `assets/js/products.js`. Add an object to `PRODUCTS`
  and it appears in the shop, product pages and related grids automatically.
- **Cart** persists in `localStorage` (`atelier-cart`) as `{ productId: qty }`
  and syncs the nav badge across tabs.
- **Checkout is a demo.** No payment is processed and no card data leaves the
  page. To take real orders, replace the submit handler in `checkout.html`
  with a payment provider integration (e.g. Stripe Checkout) and a small
  backend for order fulfillment.
- **Design system**: Fraunces + Plus Jakarta Sans, warm paper/ink/terracotta
  palette, 8px spacing grid. All product art is CSS-drawn — the site ships
  with zero image assets.

## Deploying

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages.
Point the host at the repository root.
