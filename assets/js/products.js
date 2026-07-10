/* E-CV Store — template catalog. Single source of truth for every page.
   Art is CSS-drawn (see base.css .art-*) so the store ships with zero image assets. */

const CATEGORIES = ["Resumes", "CVs", "Cover Letters", "Portfolios", "Bundles"];

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
