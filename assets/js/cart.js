/* MOMO Store — cart state, persisted in localStorage as { productId: qty }.
   Emits "cart:change" on document so any page section can react. */

const Cart = {
  KEY: "ecv-cart",

  read() {
    try {
      const raw = localStorage.getItem(this.KEY);
      const data = raw ? JSON.parse(raw) : {};
      return data && typeof data === "object" ? data : {};
    } catch {
      // Storage unavailable (private mode) or corrupted — treat as empty cart.
      return {};
    }
  },

  write(items) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(items));
    } catch {
      // Ignore quota/private-mode failures; the in-page UI still updated.
    }
    document.dispatchEvent(new CustomEvent("cart:change"));
  },

  add(id, qty = 1) {
    const items = this.read();
    items[id] = Math.min((items[id] || 0) + qty, 99);
    this.write(items);
  },

  setQty(id, qty) {
    const items = this.read();
    if (qty <= 0) {
      delete items[id];
    } else {
      items[id] = Math.min(qty, 99);
    }
    this.write(items);
  },

  remove(id) {
    this.setQty(id, 0);
  },

  clear() {
    this.write({});
  },

  count() {
    return Object.values(this.read()).reduce((sum, qty) => sum + qty, 0);
  },

  /* Line items joined with the catalog; silently drops ids that no longer exist. */
  lines() {
    const items = this.read();
    return Object.entries(items)
      .map(([id, qty]) => {
        const product = typeof getProduct === "function" ? getProduct(id) : null;
        return product ? { product, qty, total: product.price * qty } : null;
      })
      .filter(Boolean);
  },

  subtotal() {
    return this.lines().reduce((sum, line) => sum + line.total, 0);
  }
};

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const count = Cart.count();
  badge.textContent = count;
  badge.hidden = count === 0;
  const cartLink = badge.closest("a, button");
  if (cartLink) {
    cartLink.setAttribute(
      "aria-label",
      count === 0 ? "Cart, empty" : `Cart, ${count} item${count === 1 ? "" : "s"}`
    );
  }
}

document.addEventListener("cart:change", updateCartBadge);
window.addEventListener("storage", (e) => {
  if (e.key === Cart.KEY) updateCartBadge();
});
document.addEventListener("DOMContentLoaded", updateCartBadge);
