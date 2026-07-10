/* Atelier — shared UI helpers: money formatting, CSS product art,
   product card rendering, scroll reveals. */

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});

function artHTML(art) {
  switch (art.kind) {
    case "type":
      return `<div class="art-type" aria-hidden="true">${art.glyph}<small>${art.label}</small></div>`;
    case "ui":
      return `<div class="art-ui" aria-hidden="true"><i></i><i></i><i></i><i></i></div>`;
    case "grid":
      return `<div class="art-grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
    case "frame":
      return `<div class="art-frame" aria-hidden="true">${art.word}</div>`;
    case "texture":
      return `<div class="art-texture" aria-hidden="true"></div>`;
    default:
      return "";
  }
}

function productCardHTML(product, extraClass = "") {
  return `
    <article class="card ${extraClass}">
      <a class="card__link" href="product.html?id=${product.id}" aria-label="${product.name}, ${money.format(product.price)}">
        <div class="card__art">
          ${artHTML(product.art)}
          <span class="card__view" aria-hidden="true">View piece</span>
        </div>
        <div class="card__body">
          <div>
            <span class="card__cat">${product.category}</span>
            <h3>${product.name}</h3>
          </div>
          <span class="card__price">${money.format(product.price)}</span>
        </div>
      </a>
    </article>`;
}

/* Scroll-triggered staggered reveals; disabled for users who prefer reduced motion.
   Content stays visible without JS because the hidden state is scoped to html.js. */
function initReveals() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  document.documentElement.classList.add("js");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), Math.min(i * 90, 360));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initReveals);
