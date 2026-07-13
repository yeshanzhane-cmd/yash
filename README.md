# MOMO Store — Resume & CV Template Shop

A no-build, static e-commerce storefront selling career templates — ATS-friendly
resumes, CVs, cover letter kits, portfolio templates and bundles. Dark,
futuristic UI with 3D tilt cards, glowing accents, a 3D quick-view popup and
scroll-driven reveals. Open `index.html` in a browser — no install, no build
step, no dependencies.

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Landing page — 3D floating-resume hero, featured templates, manifesto, steps, categories, testimonials, email capture |
| `shop.html` | Full catalog with category filters (`?cat=Resumes` etc.) |
| `product.html` | Template detail, driven by `?id=<product-id>`, with quantity picker and related items |
| `cart.html` | Cart with quantity steppers, removal and order summary |
| `checkout.html` | Demo checkout with client-side validation and order confirmation (orders saved for the account page) |
| `about.html` | Story page — method, stats, promise |
| `support.html` | Help center — FAQ accordion, licensing, refunds, contact form |
| `account.html` | Demo sign-in/sign-up (localStorage) with order history |
| `404.html` | Not-found page (wire up via your static host's 404 setting) |
| `login.html` | Cinematic sign-in — switch on the desk lamp to reveal the panel |
| `builder.html` | CV builder — enter details once, render across 4 template designs + 5 accent colors, export PDF |

## Structure

```
index.html / shop.html / product.html / cart.html / checkout.html
about.html / support.html / account.html / 404.html / login.html / builder.html
assets/
  css/
    base.css      # dark design tokens, primitives, nav, 3D cards, quick-view dialog, forms, footer
    landing.css   # landing sections: hero stage, marquee, steps, categories
    store.css     # shop, product, cart, checkout
    pages.css     # about, support/FAQ, account, 404
    login.css     # lamp-scene sign-in
    builder.css   # builder workspace + the four CV template designs + print/PDF
  js/
    products.js   # template catalog — single source of truth
    cart.js       # cart state (localStorage) + badge updates
    ui.js         # money formatting, CSS template art, tilt, parallax, quick-view, reveals
    builder.js    # CV data model (ecv-cv), four template renderers, escaping
```

## How it works

- **Templates** live in `assets/js/products.js`. Add an object to `PRODUCTS`
  and it appears in the shop, product pages, quick view and related grids.
- **Cart** persists in `localStorage` (`ecv-cart`) as `{ productId: qty }`
  and syncs the nav badge across tabs. Completed checkouts append to
  `ecv-orders`, which the account page renders as order history; the demo
  account itself lives in `ecv-user`.
- **3D & motion**: pointer-driven card tilt and hero parallax, glowing CTA
  buttons, `<dialog>`-based quick-view popup with a 3D entrance, and
  IntersectionObserver scroll reveals. All motion respects
  `prefers-reduced-motion`, tilt/parallax only run on hover-capable devices,
  and content stays visible if JavaScript fails.
- **CV Builder**: one data model rendered through eight designs — four CV
  layouts (Apex single-column ATS, Studio dark sidebar, Executive letterhead,
  Terminal mono) and four portfolio themes modeled on the studio's original
  artwork (Brand numbered "PORTFOLIO." page, Spotlight light role card, Neon
  dark role card, Editorial cream serif). Six role presets (Software
  Engineer, Graphic Designer, Content Creator, Digital Marketer, Web
  Developer, UX/UI Designer) preload editable starter content with a matching
  theme. Each account gets a deterministic "signature look" (template +
  accent + photo shape derived from the email) so every user starts unique.
  Accent flows through `--cv-accent`; "Download PDF" uses an A4 print
  stylesheet. Requires sign-in (login.html) and autosaves per browser.
- **Checkout is a demo.** No payment is processed and no card data leaves the
  page. To take real orders, replace the submit handler in `checkout.html`
  with a payment provider integration (e.g. Stripe Checkout).
- **Design system**: Syne + Geist on a futuristic white hex-tile ground —
  an inline SVG honeycomb with glowing cyan-blue seams (crisp at any size,
  zero image files) under white glass panels. Accents: cyan `#0FA8CE` and
  blue `#4D7CFE` with neon glows. The lamp-scene login intentionally stays
  dark. All product/template art is CSS-drawn.

## Deploying

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages.
Point the host at the repository root.
