/* E-CV Store — template catalog. Single source of truth for every page.
   Art is CSS-drawn (see base.css .art-*) so the store ships with zero image assets. */

const CATEGORIES = ["Electronics", "Home", "Fashion", "Beauty", "Sports", "Toys", "Resumes", "CVs", "Cover Letters", "Portfolios", "Bundles"];

const PRODUCTS = [
  {
    id: "apex-resume",
    name: "Apex ATS Resume",
    category: "Resumes",
    price: 19,
    art: { kind: "doc" },
    blurb: "A single-column resume engineered to sail through applicant tracking systems while still looking sharp to human eyes. Recruiters see structure; parsers see clean data.",
    details: [
      ["Pages", "1-page + 2-page versions"],
      ["Formats", "DOCX, Google Docs, Figma"],
      ["ATS score", "Parses 100% in top 5 ATS"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "minimal-resume",
    name: "Minimal One-Page Resume",
    category: "Resumes",
    price: 15,
    art: { kind: "doc" },
    blurb: "Ruthlessly focused one-pager for candidates with strong signal. Big name, tight sections, zero decoration to distract from the work.",
    details: [
      ["Pages", "1-page, 3 layout variants"],
      ["Formats", "DOCX, Google Docs, Figma"],
      ["ATS score", "Parses 100% in top 5 ATS"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "studio-resume",
    name: "Studio Creative Resume",
    category: "Resumes",
    price: 24,
    art: { kind: "doc2" },
    blurb: "A two-column resume for designers, marketers and creatives — a skills sidebar with accent color, without sacrificing readability or parsing.",
    details: [
      ["Pages", "1-page + portfolio insert"],
      ["Formats", "Figma, InDesign, DOCX"],
      ["Colorways", "6 accent palettes"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "academic-cv",
    name: "Academic CV Template",
    category: "CVs",
    price: 22,
    art: { kind: "doc" },
    blurb: "Structured for publications, grants, teaching and service — the long-form CV that committees expect, formatted so it stays readable at 8 pages.",
    details: [
      ["Pages", "Unlimited, auto-numbered"],
      ["Formats", "DOCX, LaTeX, Google Docs"],
      ["Sections", "14 pre-built academic blocks"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "executive-cv",
    name: "Executive CV Suite",
    category: "CVs",
    price: 29,
    art: { kind: "doc2" },
    blurb: "Board-ready. A commanding two-page CV plus a one-page leadership profile, built around outcomes and P&L, not task lists.",
    details: [
      ["Pages", "2-page CV + 1-page profile"],
      ["Formats", "DOCX, Google Docs, Figma"],
      ["Extras", "Achievement phrasing guide"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "engineer-cv",
    name: "Engineer's CV Template",
    category: "CVs",
    price: 21,
    art: { kind: "doc" },
    blurb: "Skills matrix, project impact blocks and a stack section that doesn't read like keyword soup. Made with hiring managers from FAANG-adjacent teams.",
    details: [
      ["Pages", "1–2 pages, modular blocks"],
      ["Formats", "DOCX, LaTeX, Markdown"],
      ["Extras", "GitHub/portfolio link row"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "cover-classic",
    name: "Classic Cover Letter Kit",
    category: "Cover Letters",
    price: 12,
    art: { kind: "frame", word: "Dear—" },
    blurb: "Four matched cover letter layouts with a paragraph-by-paragraph writing framework. Stops the blank-page stall in minutes.",
    details: [
      ["Layouts", "4, matched to resume sets"],
      ["Formats", "DOCX, Google Docs"],
      ["Extras", "Writing framework + examples"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "cover-modern",
    name: "Modern Cover Letter Kit",
    category: "Cover Letters",
    price: 12,
    art: { kind: "frame", word: "Hello" },
    blurb: "Accent-forward cover letters that pair with the Studio and Apex sets — with openers that don't start “I am writing to apply…”.",
    details: [
      ["Layouts", "4, matched to resume sets"],
      ["Formats", "DOCX, Google Docs, Figma"],
      ["Extras", "40 opening lines that work"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "folio-site",
    name: "Portfolio Website Template",
    category: "Portfolios",
    price: 34,
    art: { kind: "grid" },
    blurb: "A one-page personal site: hero, selected work, experience timeline and contact — deployable free on GitHub Pages in an afternoon.",
    details: [
      ["Stack", "HTML/CSS, no build step"],
      ["Sections", "6, easily reordered"],
      ["Hosting", "Works on any static host"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "case-deck",
    name: "Case Study Deck",
    category: "Portfolios",
    price: 27,
    art: { kind: "grid" },
    blurb: "A 24-slide storytelling deck for interviews: problem, process, decisions, outcomes. The structure senior panels expect.",
    details: [
      ["Slides", "24, fully editable"],
      ["Formats", "Figma, Keynote, Slides"],
      ["Extras", "Presenting-notes script"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "job-hunt-bundle",
    name: "Complete Job Hunt Bundle",
    category: "Bundles",
    price: 49,
    art: { kind: "stack" },
    blurb: "Apex resume + both cover letter kits + interview tracker spreadsheet. Everything one search needs, matched and ready.",
    details: [
      ["Includes", "3 templates + tracker"],
      ["Formats", "DOCX, Google Docs, Figma"],
      ["Value", "Saves $17 vs. separate"],
      ["License", "Personal use, lifetime updates"]
    ]
  },
  {
    id: "designer-bundle",
    name: "Designer Career Bundle",
    category: "Bundles",
    price: 59,
    art: { kind: "stack" },
    blurb: "Studio resume, modern cover letters, portfolio site and the case study deck — the full stack for design candidates.",
    details: [
      ["Includes", "4 templates"],
      ["Formats", "Figma-first + DOCX"],
      ["Value", "Saves $38 vs. separate"],
      ["License", "Personal use, lifetime updates"]
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

/* ---------- General marketplace catalog (demo products) ----------
   Placeholder art: big glyph on a category-tinted tile — swap for real
   photos when the store goes live. */
const GENERAL_PRODUCTS = [
  ["earbuds-pro", "Wireless Earbuds Pro — Noise Cancelling, 36h Battery", "Electronics", 17.99, "🎧", "#FFE9D9"],
  ["smart-watch", "Smart Watch Fit — Heart Rate, Sleep & 100 Sport Modes", "Electronics", 22.49, "⌚", "#E1F0FF"],
  ["mini-speaker", "Mini Bluetooth Speaker — Waterproof, Deep Bass", "Electronics", 12.99, "🔊", "#EAE4FF"],
  ["gan-charger", "65W GaN Fast Charger — 3 Ports, Foldable Plug", "Electronics", 15.99, "🔌", "#FFF3D6"],
  ["led-strip", "LED Strip Lights 10m — App Control, Music Sync", "Electronics", 9.99, "💡", "#FFE9F2"],
  ["webcam-hd", "1080p Webcam — Autofocus with Privacy Cover", "Electronics", 18.99, "🎥", "#E3F6EC"],
  ["pan-set", "Nonstick Pan Set 3pc — Induction Ready", "Home", 24.99, "🍳", "#FFEFDE"],
  ["cordless-vac", "Cordless Vacuum — 25kPa, LED Floor Head", "Home", 59.99, "🧹", "#E8F1F5"],
  ["milk-frother", "Electric Milk Frother — Barista Foam in 15s", "Home", 8.99, "☕", "#F3E9DC"],
  ["candle-set", "Scented Candle Set 4pc — Soy Wax, 120h Total", "Home", 11.49, "🕯️", "#FDEFE3"],
  ["storage-baskets", "Woven Storage Baskets 3pc — Foldable", "Home", 13.99, "🧺", "#F0EAD8"],
  ["chunky-sneakers", "Chunky Sneakers — Breathable Knit, Unisex", "Fashion", 26.99, "👟", "#EAF2FF"],
  ["classic-cap", "Classic Baseball Cap — Adjustable, Washed Cotton", "Fashion", 7.99, "🧢", "#E5F0E6"],
  ["retro-shades", "Retro Sunglasses — UV400 Polarized", "Fashion", 6.49, "🕶️", "#FDE9D2"],
  ["travel-backpack", "Waterproof Travel Backpack 35L — USB Port", "Fashion", 19.99, "🎒", "#E8ECF7"],
  ["knit-scarf", "Chunky Knit Scarf — Soft Touch, 6 Colors", "Fashion", 9.49, "🧣", "#F9E5E5"],
  ["lipstick-set", "Matte Lipstick Set 6pc — Long-Wear, Vegan", "Beauty", 10.99, "💄", "#FFE3EA"],
  ["vitc-serum", "Vitamin C Serum 30ml — Brightening + Hyaluronic", "Beauty", 13.49, "🧴", "#FFF0DE"],
  ["gel-nail-kit", "Gel Nail Kit — UV Lamp + 12 Colors", "Beauty", 16.99, "💅", "#F2E6FA"],
  ["led-mirror", "LED Makeup Mirror — 3 Light Modes, 10x Zoom", "Beauty", 21.99, "🪞", "#EAF4F6"],
  ["adj-dumbbell", "Adjustable Dumbbell 2–20kg — Quick Dial", "Sports", 34.99, "🏋️", "#E7ECEF"],
  ["yoga-mat", "Yoga Mat Pro 6mm — Non-Slip, Carry Strap", "Sports", 14.99, "🧘", "#E4F3EA"],
  ["bike-mount", "Bike Phone Mount — One-Hand Lock, 360°", "Sports", 8.49, "🚴", "#FFF0E0"],
  ["plush-bear", "Giant Plush Bear 80cm — Ultra Soft", "Toys", 12.99, "🧸", "#FBEADB"],
  ["puzzle-1000", "1000-Piece Puzzle — World Landmarks", "Toys", 11.99, "🧩", "#E9F0FB"],
  ["rc-stunt-car", "RC Stunt Car — 360° Flips, 2 Batteries", "Toys", 18.99, "🏎️", "#FFE7E0"]
].map(([id, name, category, price, glyph, tint]) => ({
  id, name, category, price,
  art: { kind: "emoji", glyph, tint },
  blurb: `${name}. Demo listing — replace with your real product photos and description before launch.`,
  details: [["Shipping", "Free over $29"], ["Returns", "30 days"], ["Delivery", "7–14 days"], ["Stock", "Demo item"]]
}));
PRODUCTS.push(...GENERAL_PRODUCTS);

/* Deterministic marketplace deal data (demo): the same product always shows
   the same rating, review count, sold count and discount. */
function hashId(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function dealInfo(p) {
  const h = hashId(p.id);
  const discount = [20, 30, 40, 50, 60][h % 5];
  const rating = (43 + (h % 7)) / 10;
  const reviews = 150 + ((h >>> 3) % 9000);
  const sold = 400 + ((h >>> 5) % 25000);
  const badges = ["Almost gone", "Best seller", "", "New"];
  return {
    discount,
    listPrice: p.price / (1 - discount / 100),
    rating,
    reviews,
    sold,
    flash: h % 3 === 0,
    badge: badges[h % 4]
  };
}

function fmtCount(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
}
