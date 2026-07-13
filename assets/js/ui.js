/* E-CV Store — shared UI: money formatting, CSS template art, product cards,
   scroll reveals, 3D card tilt, hero pointer parallax, quick-view popup. */

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function artHTML(art) {
  switch (art.kind) {
    case "doc":
      return `<div class="art-doc" aria-hidden="true"><b class="hd"></b><i class="ac"></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
    case "doc2":
      return `<div class="art-doc2" aria-hidden="true"><b class="hd"></b><span class="col"><i class="ac"></i><i></i><i></i><i></i></span><span class="col"><i></i><i></i><i></i><i></i><i></i></span></div>`;
    case "stack":
      return `<div class="art-stack" aria-hidden="true"><b></b><b></b><b></b></div>`;
    case "frame":
      return `<div class="art-frame" aria-hidden="true">${art.word}</div>`;
    case "grid":
      return `<div class="art-grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
    case "emoji":
      return `<div class="art-photo" style="--tint:${art.tint}" aria-hidden="true">${art.glyph}</div>`;
    default:
      return "";
  }
}

function starsHTML(rating) {
  const pct = Math.round((rating / 5) * 100);
  return `<span class="stars" aria-label="Rated ${rating} out of 5"><i style="width:${pct}%">★★★★★</i>★★★★★</span>`;
}

/* Marketplace product card: deal price, rating, sold count, urgency badge
   and a one-tap add-to-cart button (handled by the delegated listener). */
function productCardHTML(product, extraClass = "") {
  const d = dealInfo(product);
  const badgeCls = d.badge === "Almost gone" ? "hot" : d.badge === "New" ? "new" : "top";
  return `
    <article class="mcard ${extraClass}" data-id="${product.id}">
      ${d.badge ? `<span class="mcard__badge mcard__badge--${badgeCls}">${d.badge}</span>` : ""}
      <a class="mcard__link" href="product.html?id=${product.id}" aria-label="${product.name}, ${money.format(product.price)}">
        <div class="mcard__img card__art">${artHTML(product.art)}</div>
        <h3 class="mcard__title">${product.name}</h3>
        <div class="mcard__meta">${starsHTML(d.rating)}<b>${d.rating.toFixed(1)}</b><span>(${fmtCount(d.reviews)})</span></div>
        <div class="mcard__sold">${fmtCount(d.sold)}+ sold</div>
        <div class="mcard__price">
          <b>${money.format(product.price)}</b>
          <s>${money.format(d.listPrice)}</s>
          <i>-${d.discount}%</i>
        </div>
      </a>
      <button class="mcard__add" type="button" data-add="${product.id}" aria-label="Add ${product.name} to cart">+</button>
    </article>`;
}

/* One-tap add-to-cart for marketplace cards, delegated so injected grids work. */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  Cart.add(btn.dataset.add, 1);
  btn.classList.add("added");
  btn.textContent = "✓";
  setTimeout(() => { btn.classList.remove("added"); btn.textContent = "+"; }, 900);
});

/* ---------- Scroll reveals ---------- */
/* Content stays visible without JS because the hidden state is scoped to html.js. */
function initReveals() {
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

/* ---------- 3D card tilt ---------- */
/* Delegated pointer handlers so cards injected after load (shop grid,
   related items) tilt without re-binding. Skipped for touch/reduced motion. */
function initTilt() {
  if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;

  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".card.tilt");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--ry", (px * 8).toFixed(2) + "deg");
    card.style.setProperty("--rx", (py * -8).toFixed(2) + "deg");
    card.style.setProperty("--lift", "-4px");
  });

  document.addEventListener("pointerout", (e) => {
    const card = e.target.closest(".card.tilt");
    if (!card || card.contains(e.relatedTarget)) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--lift", "0px");
  });
}

/* ---------- Hero pointer parallax ---------- */
/* Floating documents in .stage shift with the pointer via --px/--py. */
function initStageParallax() {
  const stage = document.querySelector(".stage");
  if (!stage || reduceMotion || !window.matchMedia("(hover: hover)").matches) return;

  stage.addEventListener("pointermove", (e) => {
    const rect = stage.getBoundingClientRect();
    const px = (e.clientY - rect.top) / rect.height - 0.5;
    const py = (e.clientX - rect.left) / rect.width - 0.5;
    stage.querySelectorAll(".float-doc").forEach((doc) => {
      doc.style.setProperty("--px", px.toFixed(3));
      doc.style.setProperty("--py", py.toFixed(3));
    });
  });
  stage.addEventListener("pointerleave", () => {
    stage.querySelectorAll(".float-doc").forEach((doc) => {
      doc.style.setProperty("--px", "0");
      doc.style.setProperty("--py", "0");
    });
  });
}

/* ---------- Quick-view popup (3D entrance) ---------- */
function initQuickView() {
  let dialog = null;

  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.className = "qv-dialog";
    dialog.setAttribute("aria-label", "Quick view");
    dialog.addEventListener("click", (e) => {
      // Click on the backdrop (the dialog element itself) closes it.
      if (e.target === dialog) dialog.close();
    });
    document.body.appendChild(dialog);
    return dialog;
  }

  function open(product) {
    const dlg = ensureDialog();
    dlg.innerHTML = `
      <button class="qv-close" type="button" aria-label="Close quick view">✕</button>
      <div class="qv-grid">
        <div class="qv-art">${artHTML(product.art)}</div>
        <div class="qv-info">
          <span class="card__cat">${product.category}</span>
          <h2>${product.name}</h2>
          <p class="qv-price">${money.format(product.price)}</p>
          <p>${product.blurb}</p>
          <div class="qv-actions">
            <button class="btn btn--accent" type="button" data-qv-add="${product.id}">Add to cart</button>
            <a class="btn btn--ghost" href="product.html?id=${product.id}">Full details</a>
          </div>
          <p class="form-msg" role="status" aria-live="polite"></p>
        </div>
      </div>`;
    dlg.querySelector(".qv-close").addEventListener("click", () => dlg.close());
    dlg.querySelector("[data-qv-add]").addEventListener("click", (e) => {
      Cart.add(e.target.dataset.qvAdd, 1);
      const msg = dlg.querySelector(".form-msg");
      msg.textContent = "Added to your cart.";
      msg.className = "form-msg success";
    });
    if (typeof dlg.showModal === "function") {
      dlg.showModal();
    } else {
      // <dialog> unsupported — fall back to the full product page.
      location.href = "product.html?id=" + product.id;
    }
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-quickview]");
    if (!btn) return;
    const product = getProduct(btn.dataset.quickview);
    if (product) open(product);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initReveals();
  initTilt();
  initStageParallax();
  initQuickView();
});
