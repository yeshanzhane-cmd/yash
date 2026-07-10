/* Atelier — product catalog. Single source of truth for every page.
   Art is CSS-drawn (see base.css .art-*) so the store ships with zero image assets. */

const CATEGORIES = ["Typefaces", "UI Kits", "Icon Sets", "Mockups", "Textures"];

const PRODUCTS = [
  {
    id: "marlow-serif",
    name: "Marlow Serif Family",
    category: "Typefaces",
    price: 89,
    art: { kind: "type", glyph: "Aa", label: "Marlow Serif — 6 weights" },
    blurb: "A high-contrast editorial serif with an optical-size axis, drawn for mastheads, brand work and long-form reading alike.",
    details: [
      ["Weights", "6 (Light–Black) + italics"],
      ["Formats", "OTF, WOFF2, variable"],
      ["Glyphs", "690 per style, Latin Extended"],
      ["License", "Desktop + web, per seat"]
    ]
  },
  {
    id: "cadence-sans",
    name: "Cadence Grotesk",
    category: "Typefaces",
    price: 69,
    art: { kind: "type", glyph: "Gg", label: "Cadence Grotesk — 5 weights" },
    blurb: "A quietly confident grotesk with even rhythm and generous apertures — a workhorse for interfaces and identity systems.",
    details: [
      ["Weights", "5 (Thin–Bold)"],
      ["Formats", "OTF, WOFF2, variable"],
      ["Glyphs", "540 per style"],
      ["License", "Desktop + web, per seat"]
    ]
  },
  {
    id: "quill-script",
    name: "Quill Display Script",
    category: "Typefaces",
    price: 54,
    art: { kind: "type", glyph: "Qy", label: "Quill Script — display" },
    blurb: "An expressive display script with 240 contextual alternates, made for packaging, posters and moments of flourish.",
    details: [
      ["Styles", "Regular + Swash"],
      ["Formats", "OTF, WOFF2"],
      ["Alternates", "240 contextual"],
      ["License", "Desktop + web, per seat"]
    ]
  },
  {
    id: "ledger-ui",
    name: "Ledger Dashboard Kit",
    category: "UI Kits",
    price: 64,
    art: { kind: "ui" },
    blurb: "A finance-grade dashboard kit: 320 components, 48 chart states and a token system named the way designers actually name things.",
    details: [
      ["Components", "320, auto-layout"],
      ["Screens", "42 desktop + 28 mobile"],
      ["File", "Figma, tokens included"],
      ["Updates", "Lifetime"]
    ]
  },
  {
    id: "commerce-ui",
    name: "Storefront Commerce Kit",
    category: "UI Kits",
    price: 79,
    art: { kind: "ui" },
    blurb: "Everything an e-commerce build needs: product cards, carts, checkout flows and empty states, all themeable in minutes.",
    details: [
      ["Components", "280, auto-layout"],
      ["Screens", "56 across 4 breakpoints"],
      ["File", "Figma, tokens included"],
      ["Updates", "Lifetime"]
    ]
  },
  {
    id: "folio-kit",
    name: "Folio Portfolio Kit",
    category: "UI Kits",
    price: 49,
    art: { kind: "ui" },
    blurb: "A portfolio system for designers who'd rather ship the work than fight the layout — case study, index and about templates.",
    details: [
      ["Templates", "12 page layouts"],
      ["File", "Figma + Framer remix"],
      ["Fonts", "Free pairings suggested"],
      ["Updates", "Lifetime"]
    ]
  },
  {
    id: "meridian-icons",
    name: "Meridian Icons — 420",
    category: "Icon Sets",
    price: 39,
    art: { kind: "grid" },
    blurb: "420 icons on a strict 24px grid with a warm, hand-finished corner radius. Consistent stroke, no orphaned metaphors.",
    details: [
      ["Count", "420 icons, 3 weights"],
      ["Grid", "24px, 2px stroke"],
      ["Formats", "SVG, Figma, icon font"],
      ["Updates", "Quarterly additions"]
    ]
  },
  {
    id: "atlas-icons",
    name: "Atlas Duotone Icons",
    category: "Icon Sets",
    price: 45,
    art: { kind: "grid" },
    blurb: "A duotone set of 360 icons with editable accent layers — one variable swap re-colors the entire family.",
    details: [
      ["Count", "360 icons, duotone"],
      ["Grid", "24px"],
      ["Formats", "SVG, Figma"],
      ["Updates", "Quarterly additions"]
    ]
  },
  {
    id: "gallery-frames",
    name: "Gallery Frame Mockups",
    category: "Mockups",
    price: 29,
    art: { kind: "frame", word: "poster" },
    blurb: "Sixteen museum-lit frame and poster mockups with true perspective and separated shadow layers.",
    details: [
      ["Scenes", "16, 6K resolution"],
      ["Format", "PSD, smart objects"],
      ["Lighting", "3 moods per scene"],
      ["License", "Commercial"]
    ]
  },
  {
    id: "stationery-suite",
    name: "Stationery Mockup Suite",
    category: "Mockups",
    price: 34,
    art: { kind: "frame", word: "letter" },
    blurb: "Letterheads, business cards and envelopes photographed on real paper stocks — the identity presentation classic, done properly.",
    details: [
      ["Scenes", "22, 6K resolution"],
      ["Format", "PSD, smart objects"],
      ["Stocks", "4 paper textures"],
      ["License", "Commercial"]
    ]
  },
  {
    id: "grain-paper",
    name: "Grain & Paper Textures",
    category: "Textures",
    price: 24,
    art: { kind: "texture" },
    blurb: "Forty scanned paper grains, risograph noise fields and subtle fibers for print-true digital work.",
    details: [
      ["Count", "40 textures, 8K scans"],
      ["Formats", "PNG, TIFF, seamless"],
      ["Source", "Scanned stocks"],
      ["License", "Commercial"]
    ]
  },
  {
    id: "halftone-pack",
    name: "Halftone & Ink Pack",
    category: "Textures",
    price: 19,
    art: { kind: "texture" },
    blurb: "Thirty-two halftone screens, ink bleeds and misprint edges for work that wants a press-room past.",
    details: [
      ["Count", "32 textures, 8K"],
      ["Formats", "PNG, vector EPS"],
      ["Source", "Hand-pulled prints"],
      ["License", "Commercial"]
    ]
  }
];

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

function getRelated(product, limit = 3) {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const fillers = PRODUCTS.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  return sameCategory.concat(fillers).slice(0, limit);
}
