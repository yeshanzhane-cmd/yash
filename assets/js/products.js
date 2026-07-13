/* MOMO Store — digital product catalog. Single source of truth for every page.
   Every listing here is a digital download (no physical goods). Art is
   CSS-drawn (see base.css .art-* / .art-photo) so the store ships with
   zero image assets — swap for real thumbnails when real files are
   attached to each listing. */

const CATEGORIES = [
  "Graphics & Illustrations",
  "UI & Web Templates",
  "Fonts & Typography",
  "Ebooks & Guides",
  "T-Shirt & Print Designs",
  "Design Tools & Presets",
  "Mockups",
  "Icon Packs",
  "Resumes & CVs",
  "Cover Letters",
  "Portfolios",
  "Bundles"
];

/* Each row: [id, name, category, price, glyph, tint, blurb, details[]] */
const CATALOG_ROWS = [
  // ---------- Graphics & Illustrations ----------
  ["boho-floral-clipart", "Boho Floral Clipart Bundle — 60 PNG Illustrations, Transparent Background",
    "Graphics & Illustrations", 14.99, "🌿", "#EAF3E4",
    "60 hand-drawn boho floral illustrations in high-resolution PNG with transparent backgrounds — wreaths, bouquets and single stems ready to drop into branding, stationery and social templates.",
    [["Format", "PNG (transparent), AI source"], ["Resolution", "300 DPI, up to 4000px"], ["License", "Commercial use, unlimited projects"], ["File size", "210 MB"]]],
  ["gradient-shapes-pack", "Abstract Gradient Shapes Pack — 40 Vector Blobs & Fluid Backgrounds",
    "Graphics & Illustrations", 12.49, "🎨", "#EAE4FF",
    "40 fluid gradient shapes and abstract blobs as editable vectors — recolor in one click for hero sections, posters and pitch decks that need a modern, organic backdrop.",
    [["Format", "AI, EPS, SVG, PNG"], ["Editable", "Fully vector, recolorable"], ["License", "Commercial use, unlimited projects"], ["File size", "85 MB"]]],
  ["watercolor-textures", "Watercolor Texture Pack — 30 Hi-Res Paint Splashes & Backgrounds",
    "Graphics & Illustrations", 11.99, "🖌️", "#FDEFE3",
    "30 scanned watercolor textures and paint splashes at print resolution, perfect for wedding stationery, packaging and organic brand identities.",
    [["Format", "JPG, PNG (transparent)"], ["Resolution", "300 DPI, up to 5000px"], ["License", "Commercial use, unlimited projects"], ["File size", "640 MB"]]],
  ["line-art-portraits", "Minimal Line Art Portrait Set — 25 Editable Face & Body Illustrations",
    "Graphics & Illustrations", 16.99, "✏️", "#FFF3D6",
    "25 single-line portrait illustrations in a continuous minimalist style — ideal for beauty, wellness and lifestyle brands that want a hand-drawn editorial feel.",
    [["Format", "AI, SVG, PNG"], ["Editable", "Stroke weight + color"], ["License", "Commercial use, unlimited projects"], ["File size", "60 MB"]]],
  ["retro-badges-pack", "Retro Badge & Emblem Pack — 50 Vintage Vector Logos and Stamps",
    "Graphics & Illustrations", 13.49, "🎖️", "#FFE9F2",
    "50 fully editable vintage badges, stamps and emblems built on scalable vector paths — a fast starting point for logos, labels and merch that wants a lived-in retro feel.",
    [["Format", "AI, EPS, SVG, PNG"], ["Editable", "Text, color, shape"], ["License", "Commercial use, unlimited projects"], ["File size", "95 MB"]]],

  // ---------- UI & Web Templates ----------
  ["saas-landing-kit", "SaaS Landing Page UI Kit — 40 Figma Screens, Auto Layout, Dark & Light",
    "UI & Web Templates", 29.99, "🖥️", "#E1F0FF",
    "A complete SaaS marketing site in Figma: 40 auto-layout screens across pricing, features, blog and onboarding, with a token-based design system in both dark and light themes.",
    [["Format", "Figma (.fig)"], ["Screens", "40, auto-layout"], ["License", "Commercial, unlimited projects"], ["Updates", "Lifetime free updates"]]],
  ["ecommerce-app-ui", "Mobile Shopping App UI Kit — 60 iOS/Android Screens + Components",
    "UI & Web Templates", 27.49, "🛍️", "#F2E6FA",
    "60 polished e-commerce app screens covering browse, cart, checkout and order tracking, built from a shared component library so redesigns take minutes, not days.",
    [["Format", "Figma (.fig), Sketch"], ["Screens", "60, componentized"], ["License", "Commercial, unlimited projects"], ["Updates", "Lifetime free updates"]]],
  ["dashboard-ui-kit", "Analytics Dashboard UI Kit — 35 Data-Dense Admin Screens, Chart Library",
    "UI & Web Templates", 24.99, "📊", "#E3F6EC",
    "35 admin and analytics screens with a matching chart component library — tables, filters, KPI tiles and empty states designed for information-dense B2B products.",
    [["Format", "Figma (.fig)"], ["Screens", "35 + 20 chart variants"], ["License", "Commercial, unlimited projects"], ["Updates", "Lifetime free updates"]]],
  ["notion-startup-os", "Notion Startup OS Template — All-in-One Workspace for Founders",
    "UI & Web Templates", 18.99, "🗂️", "#FFF0E0",
    "A ready-to-duplicate Notion workspace for early-stage teams: roadmap, CRM, OKRs, meeting notes and a hiring tracker, all linked with relational databases.",
    [["Format", "Notion template link"], ["Databases", "9, fully linked"], ["License", "Personal + team use"], ["Setup", "Duplicate & customize in minutes"]]],
  ["email-template-pack", "Responsive Email Template Pack — 20 HTML Newsletters for Any ESP",
    "UI & Web Templates", 15.49, "✉️", "#E8ECF7",
    "20 table-based responsive email templates tested across major inboxes and ESPs — promo, newsletter and transactional layouts you can paste straight into Mailchimp or Klaviyo.",
    [["Format", "HTML + Figma source"], ["Tested in", "Gmail, Outlook, Apple Mail"], ["License", "Commercial, unlimited sends"], ["Updates", "Lifetime free updates"]]],

  // ---------- Fonts & Typography ----------
  ["neue-grotesk-family", "Neue Grotesk Font Family — 9 Weights, Variable, Latin Extended",
    "Fonts & Typography", 19.99, "🅰️", "#E1F0FF",
    "A neutral, workhorse grotesk built for interfaces and editorial alike — nine static weights plus a single variable file, with a full Latin Extended character set.",
    [["Weights", "9 static + variable"], ["Formats", "OTF, TTF, WOFF2"], ["License", "Desktop + web, per seat"], ["Glyphs", "640 per style"]]],
  ["script-wedding-font", "Amoretta Script — Elegant Calligraphy Font for Invitations & Branding",
    "Fonts & Typography", 9.99, "✒️", "#FFE3EA",
    "A flowing hand-lettered script with 80 alternate ligatures, built for wedding stationery, packaging and logotypes that need a personal, handwritten touch.",
    [["Styles", "Regular + swash alternates"], ["Formats", "OTF, TTF, WOFF"], ["License", "Commercial use, per seat"], ["Alternates", "80 contextual ligatures"]]],
  ["display-slab-serif", "Ironclad Slab — Bold Display Serif for Headlines and Branding",
    "Fonts & Typography", 12.99, "🔠", "#FFF3D6",
    "A heavyweight slab serif designed for headlines, sports branding and packaging where confidence matters more than subtlety — four weights, Latin Extended.",
    [["Weights", "4 (Regular–Black)"], ["Formats", "OTF, TTF, WOFF2"], ["License", "Desktop + web, per seat"], ["Glyphs", "480 per style"]]],
  ["handwritten-notes-font", "Notebook Handwritten Font Duo — Casual Script + Print Pairing",
    "Fonts & Typography", 8.49, "📝", "#F3E9DC",
    "A two-font pairing that mimics genuine handwriting — a casual script for notes and captions, paired with a clean hand-print style for labels and worksheets.",
    [["Fonts included", "2 (script + print)"], ["Formats", "OTF, TTF"], ["License", "Commercial use, per seat"], ["Glyphs", "310 per style"]]],

  // ---------- Ebooks & Guides ----------
  ["freelance-pricing-ebook", "The Freelancer's Pricing Playbook — 90-Page Guide to Charging What You're Worth",
    "Ebooks & Guides", 14.99, "📘", "#E8F1F5",
    "A 90-page practical guide to pricing creative and consulting work — value-based pricing frameworks, proposal templates and real rate-negotiation scripts freelancers can use today.",
    [["Format", "PDF + EPUB"], ["Length", "90 pages"], ["Includes", "12 email/proposal templates"], ["License", "Personal use, lifetime updates"]]],
  ["social-media-growth-guide", "Social Media Growth Playbook — Content Systems for Consistent Growth",
    "Ebooks & Guides", 16.49, "📈", "#E1F0FF",
    "A step-by-step content system for growing an audience without burning out — batching, hook formulas and a 30-day content calendar template included.",
    [["Format", "PDF + EPUB"], ["Length", "110 pages"], ["Includes", "30-day content calendar"], ["License", "Personal use, lifetime updates"]]],
  ["notion-productivity-guide", "Deep Work Notion System — The Complete Productivity Setup Guide",
    "Ebooks & Guides", 12.99, "🧠", "#EAE4FF",
    "A guided walkthrough for building a distraction-proof Notion workflow — task triage, weekly reviews and a focus-block system, with the companion template included free.",
    [["Format", "PDF"], ["Length", "64 pages"], ["Includes", "Linked Notion template"], ["License", "Personal use, lifetime updates"]]],
  ["etsy-seller-handbook", "Etsy Seller's Handbook — Listing SEO, Pricing and Launch Checklist",
    "Ebooks & Guides", 13.99, "🛒", "#FFF0DE",
    "A practical handbook for new Etsy sellers covering keyword research, listing photography basics, pricing math and a 14-day launch checklist that actually gets followed.",
    [["Format", "PDF + EPUB"], ["Length", "78 pages"], ["Includes", "Launch checklist + SEO worksheet"], ["License", "Personal use, lifetime updates"]]],
  ["personal-finance-workbook", "Zero-Based Budget Workbook — 52-Week Personal Finance Planner",
    "Ebooks & Guides", 9.99, "💰", "#E4F3EA",
    "A fillable 52-week budgeting workbook using the zero-based method — monthly planning pages, debt payoff trackers and a savings goal tracker in one printable PDF.",
    [["Format", "Fillable PDF"], ["Length", "60 pages"], ["Includes", "52-week tracker"], ["License", "Personal use, lifetime updates"]]],

  // ---------- T-Shirt & Print Designs ----------
  ["retro-sunset-tee", "Retro Sunset Streetwear T-Shirt Design — Print-Ready PNG & SVG",
    "T-Shirt & Print Designs", 6.99, "👕", "#FFE7E0",
    "A retro sunset graphic with distressed halftone texture, print-ready at 300 DPI for DTG, screen printing or POD platforms like Printful and Teespring.",
    [["Format", "PNG (transparent), SVG"], ["Resolution", "300 DPI, 4500×5400px"], ["License", "Commercial, unlimited print runs"], ["Print-ready for", "DTG, screen print, POD"]]],
  ["motivational-typography-tee", "Bold Typography Quote T-Shirt Design — 'Stay Wild' Print-Ready Graphic",
    "T-Shirt & Print Designs", 5.99, "🔤", "#EAF2FF",
    "A bold, hand-lettered typography design ready straight out of the file for print-on-demand or screen printing — no additional vectorizing needed.",
    [["Format", "PNG (transparent), SVG, AI"], ["Resolution", "300 DPI, 4500×5400px"], ["License", "Commercial, unlimited print runs"], ["Print-ready for", "DTG, screen print, POD"]]],
  ["cat-lover-tee-bundle", "Cat Lover T-Shirt Design Bundle — 15 Print-Ready Cute Cat Graphics",
    "T-Shirt & Print Designs", 17.99, "🐱", "#F9E5E5",
    "15 print-ready cat illustrations in a cute, market-tested style for the pet niche — bundled at print resolution for fast upload to any POD storefront.",
    [["Format", "PNG (transparent), SVG"], ["Count", "15 designs"], ["License", "Commercial, unlimited print runs"], ["Print-ready for", "DTG, screen print, POD"]]],
  ["mountain-adventure-tee", "Mountain Adventure Line Art T-Shirt Design — Minimalist Outdoor Graphic",
    "T-Shirt & Print Designs", 6.49, "⛰️", "#E7ECEF",
    "A single-line mountain range illustration with a minimalist outdoor aesthetic — clean enough for one-color screen printing, detailed enough to stand alone.",
    [["Format", "PNG (transparent), SVG"], ["Resolution", "300 DPI, 4500×5400px"], ["License", "Commercial, unlimited print runs"], ["Print-ready for", "DTG, screen print, POD"]]],
  ["halloween-tee-bundle", "Halloween T-Shirt Design Bundle — 20 Spooky Print-Ready Graphics",
    "T-Shirt & Print Designs", 19.99, "🎃", "#FFE7E0",
    "20 seasonal Halloween graphics — pumpkins, ghosts and horror-lettering quotes — bundled and print-ready ahead of the seasonal POD rush.",
    [["Format", "PNG (transparent), SVG"], ["Count", "20 designs"], ["License", "Commercial, unlimited print runs"], ["Print-ready for", "DTG, screen print, POD"]]],

  // ---------- Design Tools & Presets ----------
  ["moody-lightroom-presets", "Moody Film Lightroom Presets — 25 Desktop & Mobile .XMP Presets",
    "Design Tools & Presets", 11.99, "🎞️", "#E3F6EC",
    "25 one-click Lightroom presets tuned for a moody, filmic color grade — works identically on desktop and mobile, with individually adjustable sliders after applying.",
    [["Compatible with", "Lightroom Desktop + Mobile"], ["Format", ".XMP, .DNG"], ["Count", "25 presets"], ["License", "Personal + commercial use"]]],
  ["procreate-brush-set", "Procreate Brush Set — 40 Texture, Ink & Watercolor Brushes",
    "Design Tools & Presets", 9.49, "🖊️", "#F2E6FA",
    "40 hand-tuned Procreate brushes spanning ink, watercolor and paper-texture effects, built for iPad illustration work that needs real analog feel.",
    [["Compatible with", "Procreate 5.2+"], ["Format", ".brushset"], ["Count", "40 brushes"], ["License", "Personal + commercial use"]]],
  ["photoshop-action-pack", "Photoshop Action Pack — 30 One-Click Portrait Retouching Actions",
    "Design Tools & Presets", 13.49, "🖼️", "#EAF4F6",
    "30 non-destructive Photoshop actions for portrait retouching — skin smoothing, eye pop and color grading, each with an editable layer stack, not a flattened effect.",
    [["Compatible with", "Photoshop CC 2019+"], ["Format", ".atn"], ["Count", "30 actions"], ["License", "Personal + commercial use"]]],
  ["capcut-transition-pack", "CapCut Transition & Effects Pack — 50 Templates for Short-Form Video",
    "Design Tools & Presets", 8.99, "🎬", "#FFF0DE",
    "50 drag-and-drop transitions and effects built for CapCut, tuned for the pacing of Reels, TikTok and Shorts editing.",
    [["Compatible with", "CapCut (mobile + desktop)"], ["Format", ".capcut template link"], ["Count", "50 templates"], ["License", "Personal + commercial use"]]],
  ["figma-icon-plugin-kit", "Figma Auto-Layout Component Starter Kit — Buttons, Forms & Cards",
    "Design Tools & Presets", 15.99, "🧩", "#E1F0FF",
    "A ready-made Figma component library of buttons, form fields and cards, fully variant-driven and auto-layout, so new projects start from a working system instead of a blank page.",
    [["Compatible with", "Figma"], ["Format", ".fig"], ["Components", "120+, variant-based"], ["License", "Commercial, unlimited projects"]]],

  // ---------- Mockups ----------
  ["tshirt-mockup-bundle", "T-Shirt Mockup Bundle — 25 Studio-Lit PSD Scenes, Front & Back",
    "Mockups", 16.99, "🧢", "#F0EAD8",
    "25 studio-lit apparel mockups with smart-object layers for instant design swaps — front, back and folded angles across multiple garment colors.",
    [["Format", "PSD, smart objects"], ["Resolution", "4000×3000px"], ["License", "Commercial use, unlimited projects"], ["File size", "1.2 GB"]]],
  ["phone-app-mockup-kit", "iPhone App Mockup Kit — 20 Hand-Held & Flat-Lay Device Scenes",
    "Mockups", 14.49, "📱", "#E8ECF7",
    "20 photorealistic device mockups — hand-held, desk flat-lay and floating angles — for presenting app UI and website screens with real depth and lighting.",
    [["Format", "PSD, smart objects"], ["Resolution", "5000×3750px"], ["License", "Commercial use, unlimited projects"], ["File size", "980 MB"]]],
  ["packaging-box-mockup", "Product Packaging Box Mockup Set — 15 E-Commerce Ready Scenes",
    "Mockups", 15.49, "📦", "#FDEFE3",
    "15 clean packaging mockups for boxes, mailers and shipping labels — built for product photography that needs to look store-shelf ready without a photoshoot.",
    [["Format", "PSD, smart objects"], ["Resolution", "4500×3000px"], ["License", "Commercial use, unlimited projects"], ["File size", "890 MB"]]],
  ["book-cover-mockup-set", "Book Cover Mockup Set — 18 Hardcover, Paperback & E-Reader Scenes",
    "Mockups", 12.99, "📚", "#EAF3E4",
    "18 realistic book mockups across hardcover, paperback and e-reader formats — the fast way to show a finished cover design before print.",
    [["Format", "PSD, smart objects"], ["Resolution", "4000×3000px"], ["License", "Commercial use, unlimited projects"], ["File size", "720 MB"]]],

  // ---------- Icon Packs ----------
  ["line-icons-mega-pack", "Line Icon Mega Pack — 800 Outline Icons for Web & App UI",
    "Icon Packs", 18.99, "✳️", "#E5F0E6",
    "800 consistent outline icons on a strict 24px grid, covering UI, e-commerce, finance and social — one stroke weight, zero style-matching headaches.",
    [["Count", "800 icons"], ["Grid", "24px, 2px stroke"], ["Formats", "SVG, PNG, Figma, icon font"], ["License", "Commercial use, unlimited projects"]]],
  ["duotone-business-icons", "Duotone Business Icon Set — 300 Icons with Editable Accent Layer",
    "Icon Packs", 13.99, "🟣", "#EAE4FF",
    "300 duotone icons across office, finance and communication categories — swap the accent color variable once and the whole set recolors.",
    [["Count", "300 icons"], ["Style", "Duotone, editable accent"], ["Formats", "SVG, Figma"], ["License", "Commercial use, unlimited projects"]]],
  ["hand-drawn-doodle-icons", "Hand-Drawn Doodle Icon Set — 150 Playful Sketch-Style Icons",
    "Icon Packs", 10.99, "✏️", "#FFF3D6",
    "150 hand-sketched doodle icons with an imperfect, playful line quality — built for brands and social content that want to feel human, not corporate.",
    [["Count", "150 icons"], ["Style", "Hand-drawn, single color"], ["Formats", "SVG, PNG"], ["License", "Commercial use, unlimited projects"]]],
  ["3d-gradient-icon-set", "3D Gradient Icon Set — 200 Isometric Icons for Landing Pages",
    "Icon Packs", 16.49, "🔷", "#E1F0FF",
    "200 isometric 3D-style icons with soft gradient shading — a fast way to give a SaaS landing page real depth without commissioning custom 3D art.",
    [["Count", "200 icons"], ["Style", "Isometric, gradient"], ["Formats", "SVG, PNG (transparent)"], ["License", "Commercial use, unlimited projects"]]]
];

const PRODUCTS = CATALOG_ROWS.map(([id, name, category, price, glyph, tint, blurb, details]) => ({
  id, name, category, price,
  art: { kind: "emoji", glyph, tint },
  blurb,
  details
}));

// ---------- Resume, CV & career templates (existing MOMO CV Builder line) ----------
PRODUCTS.push(
  {
    id: "apex-resume",
    name: "Apex ATS Resume Template — Single-Column, Recruiter-Tested",
    category: "Resumes & CVs",
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
    name: "Minimal One-Page Resume Template — Clean & ATS-Friendly",
    category: "Resumes & CVs",
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
    name: "Studio Creative Resume Template — Two-Column with Accent Sidebar",
    category: "Resumes & CVs",
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
    name: "Academic CV Template — Publications & Grants Format",
    category: "Resumes & CVs",
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
    name: "Executive CV Suite — Leadership Profile + Two-Page CV Template",
    category: "Resumes & CVs",
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
    name: "Software Engineer CV Template — Skills Matrix & Project Impact",
    category: "Resumes & CVs",
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
    name: "Classic Cover Letter Template Kit — 4 Matched Layouts",
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
    name: "Modern Cover Letter Template Kit — Accent-Forward Design",
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
    name: "Personal Portfolio Website Template — No-Build HTML/CSS",
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
    name: "UX Case Study Deck Template — 24-Slide Interview Presentation",
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
    name: "Complete Job Hunt Bundle — Resume + Cover Letters + Tracker",
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
    name: "Designer Career Bundle — Resume, Cover Letter, Portfolio & Case Deck",
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
);

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

/* Deterministic marketplace deal data (demo): the same product always shows
   the same rating, review count, download count and discount. */
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
  const downloads = 400 + ((h >>> 5) % 25000);
  const badges = ["Almost gone", "Best seller", "", "New"];
  return {
    discount,
    listPrice: p.price / (1 - discount / 100),
    rating,
    reviews,
    downloads,
    flash: h % 3 === 0,
    badge: badges[h % 4]
  };
}

function fmtCount(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
}
