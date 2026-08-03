/* MOMO Store — CV & portfolio builder engine.
   One data model (ecv-cv in localStorage) rendered through eight template
   renderers: four CV layouts and four portfolio themes modeled on the
   E_CV studio artwork (numbered "PORTFOLIO." pages, role spotlight cards,
   dark neon cards, cream editorial). Every user-entered string passes
   through esc() before it touches innerHTML. */

const CV_KEY = "ecv-cv";

const CV_TEMPLATES = [
  { id: "apex", name: "Apex", group: "CV" },
  { id: "studio", name: "Studio", group: "CV" },
  { id: "exec", name: "Executive", group: "CV" },
  { id: "term", name: "Terminal", group: "CV" },
  { id: "brand", name: "Brand", group: "Portfolio" },
  { id: "spotlight", name: "Spotlight", group: "Portfolio" },
  { id: "neon", name: "Neon", group: "Portfolio" },
  { id: "editorial", name: "Editorial", group: "Portfolio" }
];

const CV_COLORS = [
  { id: "indigo", hex: "#6C5CE7" },
  { id: "teal", hex: "#0EA5A0" },
  { id: "blue", hex: "#2563EB" },
  { id: "forest", hex: "#3E6B4A" },
  { id: "rose", hex: "#D6608A" },
  { id: "ember", hex: "#E07A2E" },
  { id: "crimson", hex: "#C2403B" },
  { id: "olive", hex: "#6B7C4A" },
  { id: "ink", hex: "#23232E" }
];

/* Organic photo-mask shapes; one is picked per user for their signature look. */
const CV_BLOBS = [
  "58% 42% 55% 45% / 55% 48% 42% 52%",
  "45% 55% 48% 52% / 60% 42% 58% 40%",
  "52% 48% 60% 40% / 45% 58% 42% 55%",
  "50% 50% 42% 58% / 52% 45% 55% 48%"
];

const CV_SAMPLE = {
  name: "Alex Morgan",
  title: "Product Designer",
  email: "alex.morgan@example.com",
  phone: "+1 555 010 2030",
  location: "Lisbon, PT",
  website: "alexmorgan.design",
  summary: "Product designer with 6 years shipping B2B tools. I turn ambiguous problems into interfaces people describe as obvious.",
  photo: "",
  skills: ["Figma", "Design systems", "Prototyping", "User research", "HTML/CSS"],
  experience: [
    { role: "Senior Product Designer", company: "Northbeam", dates: "2023 — Present", desc: "Own the analytics workspace used by 40k weekly users; redesign lifted activation 18%." },
    { role: "Product Designer", company: "Loopwire", dates: "2020 — 2023", desc: "Built the design system from zero; cut design-to-dev handoff time in half." }
  ],
  education: [
    { degree: "BA, Communication Design", school: "ESAD Lisbon", dates: "2016 — 2020" }
  ],
  template: "apex",
  accent: "#6C5CE7",
  blob: CV_BLOBS[0]
};

/* Preloaded role presets — modeled on the studio's role-card artwork.
   Loading one fills the form with editable starter content and applies
   the matching theme + accent. */
const CV_PRESETS = [
  {
    id: "software", label: "Software Engineer", template: "spotlight", accent: "#2563EB",
    data: {
      title: "Software Engineer",
      summary: "Backend-leaning engineer who ships reliable systems and readable code. I care about latency budgets, clean interfaces and boring deploys.",
      skills: ["TypeScript", "Node.js", "React", "PostgreSQL", "AWS", "CI/CD"],
      experience: [
        { role: "Software Engineer II", company: "Freightline", dates: "2023 — Present", desc: "Own the pricing service (30M req/day); cut p99 latency 42% by reworking the cache layer." },
        { role: "Software Engineer", company: "Bitworks", dates: "2021 — 2023", desc: "Shipped the customer API v2 and its SDKs; adopted by 400+ integrations in the first year." }
      ],
      education: [{ degree: "BSc, Computer Science", school: "State University", dates: "2017 — 2021" }]
    }
  },
  {
    id: "graphic", label: "Graphic Designer", template: "spotlight", accent: "#3E6B4A",
    data: {
      title: "Graphic Designer",
      summary: "Brand-focused designer making identities, packaging and campaigns that feel inevitable in hindsight. Print-literate, deadline-friendly.",
      skills: ["Photoshop", "Illustrator", "InDesign", "Branding", "Typography", "Packaging"],
      experience: [
        { role: "Senior Graphic Designer", company: "Meadow Studio", dates: "2022 — Present", desc: "Lead identity work for 14 launched brands; two shortlisted for national design awards." },
        { role: "Graphic Designer", company: "Print & Co", dates: "2019 — 2022", desc: "Owned packaging systems for grocery clients across 60+ SKUs." }
      ],
      education: [{ degree: "BA, Graphic Design", school: "College of Arts", dates: "2015 — 2019" }]
    }
  },
  {
    id: "content", label: "Content Creator", template: "spotlight", accent: "#D6608A",
    data: {
      title: "Content Creator",
      summary: "I plan, shoot and edit short-form content that stops the scroll — 300k followers grown across platforms for myself and client brands.",
      skills: ["Video editing", "Storyboarding", "Premiere Pro", "Analytics", "Copywriting", "Photography"],
      experience: [
        { role: "Content Creator & Strategist", company: "Independent", dates: "2022 — Present", desc: "Produce 20+ videos/month; best campaign reached 4.2M views and sold out the product run." },
        { role: "Social Media Manager", company: "Loft Agency", dates: "2020 — 2022", desc: "Ran content for 8 brand accounts; tripled average engagement in a year." }
      ],
      education: [{ degree: "BA, Media & Communication", school: "City University", dates: "2016 — 2020" }]
    }
  },
  {
    id: "marketer", label: "Digital Marketer", template: "neon", accent: "#E07A2E",
    data: {
      title: "Digital Marketer",
      summary: "Performance marketer who treats budgets like my own. Paid social, search and lifecycle — measured, reported, improved.",
      skills: ["Paid social", "Google Ads", "SEO", "Email automation", "GA4", "A/B testing"],
      experience: [
        { role: "Digital Marketing Lead", company: "Cartful", dates: "2022 — Present", desc: "Scaled paid acquisition from $40k to $250k/mo at a 250% ROAS; built the attribution stack." },
        { role: "Growth Marketer", company: "Sprintbase", dates: "2020 — 2022", desc: "Owned lifecycle email; win-back flows recovered 150k+ in yearly revenue." }
      ],
      education: [{ degree: "BBA, Marketing", school: "Business School", dates: "2016 — 2020" }]
    }
  },
  {
    id: "webdev", label: "Web Developer", template: "neon", accent: "#0EA5A0",
    data: {
      title: "Web Developer",
      summary: "Full-stack web developer building fast, accessible sites and apps. Lighthouse scores are a love language.",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "PHP", "Accessibility"],
      experience: [
        { role: "Web Developer", company: "Studio Norte", dates: "2022 — Present", desc: "Delivered 25+ client sites; median Lighthouse performance 97, zero missed launches." },
        { role: "Frontend Developer", company: "Pixelbay", dates: "2020 — 2022", desc: "Rebuilt the storefront theme platform used by 1,200 merchants." }
      ],
      education: [{ degree: "BSc, Software Engineering", school: "Technical Institute", dates: "2016 — 2020" }]
    }
  },
  {
    id: "uxui", label: "UX/UI Designer", template: "spotlight", accent: "#6C5CE7",
    data: {
      title: "UX/UI Designer",
      summary: "I design flows people finish. Research-driven UX and crisp UI for mobile and web products, from first sketch to shipped screens.",
      skills: ["Figma", "User research", "Wireframing", "Prototyping", "Design systems", "Usability testing"],
      experience: [
        { role: "UX/UI Designer", company: "Handoff", dates: "2022 — Present", desc: "Redesigned onboarding; completion up 31% and support tickets down by half." },
        { role: "Product Designer", company: "Appfolk", dates: "2020 — 2022", desc: "Shipped the mobile app 0→1; 4.8★ across 12k store reviews." }
      ],
      education: [{ degree: "BDes, Interaction Design", school: "Design Academy", dates: "2016 — 2020" }]
    }
  }
];

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

/* Deterministic per-user signature look: the same email always produces the
   same template + accent + photo shape, and different emails almost always
   differ — every customer starts unique. */
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function signatureMix(email) {
  const h = hashStr(String(email || "guest").toLowerCase());
  return {
    template: CV_TEMPLATES[h % CV_TEMPLATES.length].id,
    accent: CV_COLORS[(h >> 3) % CV_COLORS.length].hex,
    blob: CV_BLOBS[(h >> 7) % CV_BLOBS.length]
  };
}

function cvLoad() {
  try {
    const saved = JSON.parse(localStorage.getItem(CV_KEY));
    if (saved && typeof saved === "object" && "name" in saved) {
      if (!saved.blob) saved.blob = CV_BLOBS[0];
      return saved;
    }
  } catch { /* fall through to sample */ }
  const cv = JSON.parse(JSON.stringify(CV_SAMPLE));
  try {
    const user = JSON.parse(localStorage.getItem("ecv-user"));
    if (user && user.email) {
      Object.assign(cv, signatureMix(user.email));
      if (user.name) cv.name = user.name;
      cv.email = user.email;
    }
  } catch { /* keep sample defaults */ }
  return cv;
}

function cvSave(cv) {
  try { localStorage.setItem(CV_KEY, JSON.stringify(cv)); } catch { /* private mode */ }
}

/* ---------- Shared fragments ---------- */

function contactHTML(cv, asList) {
  const bits = [cv.email, cv.phone, cv.location, cv.website].filter(Boolean).map(esc);
  if (!bits.length) return "";
  return asList
    ? `<ul class="cv-contact">${bits.map((b) => `<li>${b}</li>`).join("")}</ul>`
    : `<div class="cv-contact">${bits.map((b) => `<span>${b}</span>`).join("")}</div>`;
}

function itemsHTML(list, kind) {
  return list
    .filter((it) => (kind === "exp" ? it.role || it.company : it.degree || it.school))
    .map((it) => {
      const head = kind === "exp" ? it.role : it.degree;
      const org = kind === "exp" ? it.company : it.school;
      return `
        <div class="cv-item">
          <div class="cv-row"><h3>${esc(head)}</h3><span class="cv-dates">${esc(it.dates)}</span></div>
          ${org ? `<p class="cv-org">${esc(org)}</p>` : ""}
          ${kind === "exp" && it.desc ? `<p class="cv-desc">${esc(it.desc)}</p>` : ""}
        </div>`;
    }).join("");
}

function skillsHTML(cv) {
  const skills = cv.skills.filter(Boolean);
  return skills.length ? `<ul class="cv-skills">${skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : "";
}

/* Decorative proficiency bars (widths derived from the skill name so they
   are stable), used by the Spotlight and Neon portfolio themes. */
function skillBarsHTML(cv) {
  const skills = cv.skills.filter(Boolean);
  if (!skills.length) return "";
  return `<ul class="cv-bars">${skills.map((s) => {
    const w = 72 + (hashStr(s) % 26);
    return `<li><span>${esc(s)}</span><i style="--w:${w}%"></i></li>`;
  }).join("")}</ul>`;
}

function photoBlobHTML(cv, cls) {
  const initial = esc((cv.name || "?").trim().charAt(0).toUpperCase());
  return cv.photo
    ? `<img class="${cls}" src="${cv.photo}" alt="">`
    : `<div class="${cls} ${cls}--ph" aria-hidden="true">${initial}</div>`;
}

function sec(title, inner) {
  return inner ? `<section class="cv-sec"><h2>${title}</h2>${inner}</section>` : "";
}

/* ---------- CV template renderers ---------- */

function renderApex(cv) {
  return `
    <header class="cv-head">
      <h1>${esc(cv.name)}</h1>
      <p class="cv-title">${esc(cv.title)}</p>
      ${contactHTML(cv, false)}
    </header>
    ${sec("Profile", cv.summary ? `<p>${esc(cv.summary)}</p>` : "")}
    ${sec("Experience", itemsHTML(cv.experience, "exp"))}
    ${sec("Education", itemsHTML(cv.education, "edu"))}
    ${sec("Skills", skillsHTML(cv))}`;
}

function renderStudio(cv) {
  return `
    <aside class="cv-side">
      ${photoBlobHTML(cv, "cv-photo")}
      <h1>${esc(cv.name)}</h1>
      <p class="cv-title">${esc(cv.title)}</p>
      ${sec("Contact", contactHTML(cv, true))}
      ${sec("Skills", skillsHTML(cv))}
    </aside>
    <div class="cv-main">
      ${sec("Profile", cv.summary ? `<p>${esc(cv.summary)}</p>` : "")}
      ${sec("Experience", itemsHTML(cv.experience, "exp"))}
      ${sec("Education", itemsHTML(cv.education, "edu"))}
    </div>`;
}

function renderExec(cv) {
  return `
    <header class="cv-head">
      <h1>${esc(cv.name)}</h1>
      <p class="cv-title">${esc(cv.title)}</p>
      ${contactHTML(cv, false)}
    </header>
    ${sec("Profile", cv.summary ? `<p class="cv-summary">${esc(cv.summary)}</p>` : "")}
    ${sec("Experience", itemsHTML(cv.experience, "exp"))}
    ${sec("Education", itemsHTML(cv.education, "edu"))}
    ${sec("Expertise", skillsHTML(cv))}`;
}

function renderTerm(cv) {
  return `
    <header class="cv-head">
      <h1>${esc(cv.name)}</h1>
      <p class="cv-title">${esc(cv.title)}</p>
      ${contactHTML(cv, false)}
    </header>
    ${sec("profile", cv.summary ? `<p>${esc(cv.summary)}</p>` : "")}
    ${sec("experience", itemsHTML(cv.experience, "exp"))}
    ${sec("education", itemsHTML(cv.education, "edu"))}
    ${sec("stack", skillsHTML(cv))}`;
}

/* ---------- Portfolio theme renderers (from the studio artwork) ---------- */

/* Brand — the numbered "PORTFOLIO." branding page: header strip with page
   marker, giant display title, HELLO intro, blob photo, services grid. */
function renderBrand(cv) {
  const skills = cv.skills.filter(Boolean);
  return `
    <header class="pf-top">
      <span class="pf-mark">${esc((cv.name || "E_CV").split(/\s+/).map(w => w[0]).join("").toUpperCase())}<i>_</i></span>
      <span class="pf-pageno"><b>01</b>/08</span>
    </header>
    <h1 class="pf-display">Portfolio<span>.</span></h1>
    <p class="pf-strip">${esc(cv.title)}</p>
    <div class="pf-cols">
      <div>
        <p class="pf-hello">“ Hello<span>.</span></p>
        <p class="pf-im">I'm ${esc(cv.name)}</p>
        ${cv.summary ? `<p class="pf-sum">${esc(cv.summary)}</p>` : ""}
        <p class="pf-script">Build your identity. Own your future.</p>
        ${contactHTML(cv, false)}
      </div>
      ${photoBlobHTML(cv, "pf-photo")}
    </div>
    ${skills.length ? `
    <section class="cv-sec pf-services">
      <h2>What I do</h2>
      <ul>${skills.map((s) => `<li><i></i>${esc(s)}</li>`).join("")}</ul>
    </section>` : ""}
    ${sec("Selected experience", itemsHTML(cv.experience, "exp"))}`;
}

/* Spotlight — the light role card: huge quote-mark title, tinted ground,
   blob photo right, skill bars, compact sections. */
function renderSpotlight(cv) {
  return `
    <header class="pf-top">
      <span class="pf-quote">”</span>
      <span class="pf-pageno"><b>01</b></span>
    </header>
    <div class="pf-cols">
      <div>
        <h1 class="pf-role">${esc(cv.title || cv.name)}<span>.</span></h1>
        ${sec("About me", cv.summary ? `<p>${esc(cv.summary)}</p>` : "")}
        ${sec("Education", itemsHTML(cv.education, "edu"))}
        ${sec("Skills", skillBarsHTML(cv))}
      </div>
      ${photoBlobHTML(cv, "pf-photo")}
    </div>
    ${sec("Experience", itemsHTML(cv.experience, "exp"))}
    <footer class="pf-foot">${esc(cv.name)}${cv.email ? ` — ${esc(cv.email)}` : ""}</footer>`;
}

/* Neon — the dark role card: near-black ground, glowing accent, chips. */
function renderNeon(cv) {
  return `
    <header class="pf-top">
      <span class="pf-quote">”</span>
      <span class="pf-pageno"><b>01</b></span>
    </header>
    <div class="pf-cols">
      <div>
        <h1 class="pf-role">${esc(cv.title || cv.name)}<span>.</span></h1>
        ${sec("About me", cv.summary ? `<p>${esc(cv.summary)}</p>` : "")}
        ${sec("Experience", itemsHTML(cv.experience, "exp"))}
        ${sec("Education", itemsHTML(cv.education, "edu"))}
      </div>
      ${photoBlobHTML(cv, "pf-photo")}
    </div>
    ${sec("Skills", skillsHTML(cv))}
    <footer class="pf-foot">${esc(cv.name)}${cv.email ? ` — ${esc(cv.email)}` : ""}</footer>`;
}

/* Editorial — the cream serif portfolio: PORTFOLIO. in serif, script hello,
   organic photo, letter-spaced labels. */
function renderEditorial(cv) {
  return `
    <header class="pf-top">
      <span class="pf-mark">${esc(cv.title || "Portfolio")}</span>
      <span class="pf-pageno"><b>01</b>/08</span>
    </header>
    <h1 class="pf-display">Portfolio<span>.</span></h1>
    <div class="pf-cols">
      <div>
        <p class="pf-script">Hello.</p>
        <p class="pf-im">I'm ${esc(cv.name)}</p>
        <p class="pf-strip">${esc(cv.title)}</p>
        ${cv.summary ? `<p class="pf-sum">${esc(cv.summary)}</p>` : ""}
        ${contactHTML(cv, true)}
      </div>
      ${photoBlobHTML(cv, "pf-photo")}
    </div>
    ${sec("Qualifications", itemsHTML(cv.education, "edu"))}
    ${sec("Experience", itemsHTML(cv.experience, "exp"))}
    ${sec("Skills", skillsHTML(cv))}`;
}

const CV_RENDERERS = {
  apex: renderApex, studio: renderStudio, exec: renderExec, term: renderTerm,
  brand: renderBrand, spotlight: renderSpotlight, neon: renderNeon, editorial: renderEditorial
};

function renderCV(cv, mount) {
  const tpl = CV_RENDERERS[cv.template] ? cv.template : "apex";
  mount.className = `cv-page cv--${tpl}`;
  mount.style.setProperty("--cv-accent", cv.accent);
  mount.style.setProperty("--cv-blob", cv.blob || CV_BLOBS[0]);
  const hasContent = cv.name || cv.title || cv.summary;
  mount.innerHTML = hasContent
    ? CV_RENDERERS[tpl](cv)
    : `<div class="cv-empty-note">Start typing on the left — your CV appears here instantly.</div>`;
}
