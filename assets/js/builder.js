/* E-CV Store — CV builder engine.
   One data model (ecv-cv in localStorage) rendered through four template
   renderers. Every user-entered string passes through esc() before it
   touches innerHTML. */

const CV_KEY = "ecv-cv";

const CV_TEMPLATES = [
  { id: "apex", name: "Apex" },
  { id: "studio", name: "Studio" },
  { id: "exec", name: "Executive" },
  { id: "term", name: "Terminal" }
];

const CV_COLORS = [
  { id: "teal", hex: "#0EA5A0" },
  { id: "violet", hex: "#7C5CD6" },
  { id: "crimson", hex: "#C2403B" },
  { id: "amber", hex: "#C07C1D" },
  { id: "ink", hex: "#23232E" }
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
  accent: "#0EA5A0"
};

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function cvLoad() {
  try {
    const saved = JSON.parse(localStorage.getItem(CV_KEY));
    if (saved && typeof saved === "object" && "name" in saved) return saved;
  } catch { /* fall through to sample */ }
  return JSON.parse(JSON.stringify(CV_SAMPLE));
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

function sec(title, inner) {
  return inner ? `<section class="cv-sec"><h2>${title}</h2>${inner}</section>` : "";
}

/* ---------- Template renderers ---------- */

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
  const initial = esc((cv.name || "?").trim().charAt(0).toUpperCase());
  const photo = cv.photo
    ? `<img class="cv-photo" src="${cv.photo}" alt="">`
    : `<div class="cv-photo cv-photo--ph" aria-hidden="true">${initial}</div>`;
  return `
    <aside class="cv-side">
      ${photo}
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

const CV_RENDERERS = { apex: renderApex, studio: renderStudio, exec: renderExec, term: renderTerm };

function renderCV(cv, mount) {
  const tpl = CV_RENDERERS[cv.template] ? cv.template : "apex";
  mount.className = `cv-page cv--${tpl}`;
  mount.style.setProperty("--cv-accent", cv.accent);
  const hasContent = cv.name || cv.title || cv.summary;
  mount.innerHTML = hasContent
    ? CV_RENDERERS[tpl](cv)
    : `<div class="cv-empty-note">Start typing on the left — your CV appears here instantly.</div>`;
}
