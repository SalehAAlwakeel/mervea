const CART_KEY = "mervea-cart";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const money = (n) => `$${Number(n).toFixed(0)}`;

function submitNetlifyForm(form, extra = {}) {
  const payload = new URLSearchParams(new FormData(form));
  payload.set("form-name", form.getAttribute("name") || "contact");
  Object.entries(extra).forEach(([key, value]) => payload.set(key, value));
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload.toString(),
  }).catch(() => {});
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  renderCart();
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function addToCart(id, qty = 1) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, name: product.name, price: product.price, image: product.image, qty });
  setCart(cart);
  toast(`${product.name} added to your ritual`);
  openCart();
}

function updateQty(id, qty) {
  const cart = getCart()
    .map((item) => (item.id === id ? { ...item, qty } : item))
    .filter((item) => item.qty > 0);
  setCart(cart);
}

function starSvg(size = 12, color = "currentColor") {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" aria-hidden="true"><path d="M12 0l2.4 9.2L24 12l-9.6 2.8L12 24l-2.4-9.2L0 12l9.6-2.8z"/></svg>`;
}

function scatterStars(container, count = 14, color = "#fff") {
  if (!container) return;
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2.4}s`;
    star.innerHTML = starSvg(8 + Math.random() * 10, color);
    container.appendChild(star);
  }
}

function paintSiteStars() {
  let field = $("#site-stars");
  if (!field) {
    field = document.createElement("div");
    field.id = "site-stars";
    field.className = "site-stars";
    field.setAttribute("aria-hidden", "true");
    document.body.appendChild(field);
  }
  scatterStars(field, 12, "rgba(255,255,255,.9)");
  scatterStars(field, 10, "#ffc8a3");
  scatterStars(field, 8, "#ffb6c1");
}

function toast(message) {
  let el = $(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.id = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("is-on");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("is-on"), 2400);
}

function renderCart() {
  $$(".cart-count").forEach((el) => {
    el.textContent = cartCount();
    el.hidden = cartCount() === 0;
  });

  const list = $("#cart-items");
  const total = $("#cart-total");
  if (total) total.textContent = money(cartTotal());
  if (!list) return;

  const cart = getCart();
  if (!cart.length) {
    list.innerHTML = `<p class="cart-empty">Your ritual bag is empty.<br>Begin with a polish, butter, soap, or glow oil.</p>`;
    return;
  }

  list.innerHTML = cart
    .map(
      (item) => `
      <article class="cart-line">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <strong>${item.name}</strong>
          <div>${money(item.price)}</div>
          <div class="qty" style="margin-top:8px">
            <button data-qty="${item.id}" data-dir="-1" type="button">−</button>
            <span>${item.qty}</span>
            <button data-qty="${item.id}" data-dir="1" type="button">+</button>
          </div>
        </div>
        <button type="button" data-remove="${item.id}" aria-label="Remove">✕</button>
      </article>`
    )
    .join("");
}

function openCart() {
  $("#cart-drawer")?.classList.add("is-open");
  $("#cart-backdrop")?.classList.add("is-open");
}

function closeCart() {
  $("#cart-drawer")?.classList.remove("is-open");
  $("#cart-backdrop")?.classList.remove("is-open");
}

function bindCart() {
  $("#open-cart")?.addEventListener("click", openCart);
  $("#close-cart")?.addEventListener("click", closeCart);
  $("#cart-backdrop")?.addEventListener("click", closeCart);

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      e.preventDefault();
      const qty = Number($("#pdp-qty")?.textContent || 1);
      addToCart(add.dataset.add, qty);
    }

    const remove = e.target.closest("[data-remove]");
    if (remove) updateQty(remove.dataset.remove, 0);

    const qtyBtn = e.target.closest("[data-qty]");
    if (qtyBtn) {
      const item = getCart().find((c) => c.id === qtyBtn.dataset.qty);
      if (item) updateQty(item.id, item.qty + Number(qtyBtn.dataset.dir));
    }
  });
}

function bindMenu() {
  const overlay = $("#menu-overlay");
  const toggle = $("#nav-toggle");
  toggle?.addEventListener("click", () => {
    const open = overlay.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("#menu-overlay a").forEach((a) =>
    a.addEventListener("click", () => overlay.classList.remove("is-open"))
  );
}

function bindHeaderScroll() {
  const header = $(".site-header");
  if (!header) return;
  const onDark = header.dataset.onDark === "true";
  const update = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("is-light", !onDark || scrolled);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function bindReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  $$(".reveal").forEach((el) => io.observe(el));
}

function bindMagnetic() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  $$(".cart-btn, .nav-toggle").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

function routeKey(url) {
  let path = (url.pathname || "/").replace(/\\/g, "/");
  if (path.endsWith("/")) path = path.slice(0, -1) || "/";
  if (path.endsWith("/index.html")) path = path.slice(0, -11) || "/";
  if (path === "/index.html" || path === "index.html") path = "/";
  return `${path}${url.search}`;
}

function bindTransitions() {
  const wipe = $("#page-wipe");
  let navigating = false;

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (!link || navigating) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;

    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;

    if (routeKey(url) === routeKey(location)) {
      if (!url.hash) e.preventDefault();
      return;
    }

    e.preventDefault();
    navigating = true;
    wipe?.classList.remove("is-entering");
    wipe?.classList.add("is-leaving");
    const next = routeKey(url) === "/" ? new URL("index.html", location.href).href : url.href;
    window.setTimeout(() => {
      location.href = next;
    }, 460);
  });

  if (!wipe) return;
  wipe.classList.add("is-entering");
  const finish = () => wipe.classList.remove("is-entering");
  wipe.addEventListener("animationend", finish, { once: true });
  window.setTimeout(finish, 520);
}

function renderHomeProducts() {
  const root = $("#home-products");
  if (!root) return;
  root.innerHTML = PRODUCTS.map(productCard).join("");
}

function productCard(p) {
  return `
    <article class="product-card">
      <a class="product-media" href="product.html?id=${p.id}" data-link>
        <img src="${p.image}" alt="${p.name}">
      </a>
      <div class="product-body">
        <div class="cat">${p.categoryLabel}</div>
        <h3><a href="product.html?id=${p.id}" data-link>${p.name}</a></h3>
        <p>${p.short}</p>
        <div class="product-row">
          <span class="price">${money(p.price)}</span>
          <button class="btn btn-primary" data-add="${p.id}" type="button">Add <span class="arrow">→</span></button>
        </div>
      </div>
    </article>`;
}

function renderShop() {
  const root = $("#shop-grid");
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const current = params.get("category") || "all";
  const apply = (cat) => {
    $$(".filter-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.filter === cat));
    const list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    root.innerHTML = list.map(productCard).join("");
    bindReveal();
    bindMagnetic();
  };
  $$(".filter-btn").forEach((btn) =>
    btn.addEventListener("click", () => apply(btn.dataset.filter))
  );
  apply(current);
}

function renderProductPage() {
  const root = $("#pdp");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS.find((item) => item.id === id) || PRODUCTS[0];
  document.title = `${p.name} — MERVÉA Body Rituals`;
  root.innerHTML = `
    <div class="pdp-visual">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="pdp-info">
      <p class="eyebrow">${p.categoryLabel} · ${p.scent}</p>
      <h1>${p.name}</h1>
      <p class="eyebrow">${p.ritual}</p>
      <p class="lead">${p.description}</p>
      <div class="price">${money(p.price)} <small style="font-family:Montserrat,sans-serif;font-size:.8rem;color:var(--ink-soft)"> / ${p.size}</small></div>
      <ul class="benefit-list">
        ${p.benefits.map((b) => `<li>${b}</li>`).join("")}
      </ul>
      <div class="qty-row">
        <div class="qty">
          <button type="button" id="qty-minus">−</button>
          <span id="pdp-qty">1</span>
          <button type="button" id="qty-plus">+</button>
        </div>
        <button class="btn btn-primary" data-add="${p.id}" type="button">Add to bag <span class="arrow">→</span></button>
      </div>
      <p class="how"><strong>The ritual.</strong> ${p.howTo}</p>
    </div>`;
  let qty = 1;
  $("#qty-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    $("#pdp-qty").textContent = qty;
  });
  $("#qty-plus").addEventListener("click", () => {
    qty += 1;
    $("#pdp-qty").textContent = qty;
  });
}

function renderCheckout() {
  const list = $("#checkout-items");
  const total = $("#checkout-total");
  if (!list) return;
  const cart = getCart();
  if (!cart.length) {
    list.innerHTML = `<p class="cart-empty">Nothing to checkout yet. <a href="shop.html" data-link>Visit the shop</a>.</p>`;
  } else {
    list.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-line">
          <img src="${item.image}" alt="${item.name}">
          <div><strong>${item.name}</strong><div>Qty ${item.qty}</div></div>
          <div>${money(item.price * item.qty)}</div>
        </div>`
      )
      .join("");
  }
  if (total) total.textContent = money(cartTotal());

  $("#checkout-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!getCart().length) {
      toast("Add a ritual to your bag first");
      return;
    }
    const data = Object.fromEntries(new FormData(e.target));
    const orderId = `MV-${Date.now().toString().slice(-6)}`;
    const orderLines = getCart()
      .map((i) => `• ${i.name} × ${i.qty} — ${money(i.price * i.qty)}`)
      .join("\n");
    const lines = getCart()
      .map((i) => `• ${i.name} × ${i.qty} — ${money(i.price * i.qty)}`)
      .join("%0A");
    await submitNetlifyForm(e.target, {
      orderId,
      items: orderLines,
      total: money(cartTotal()),
    });
    const message = `New MERVÉA order ${orderId}%0A${data.name}%0A${data.email}%0A${data.phone}%0A${data.address}, ${data.city} ${data.postcode}%0A%0A${lines}%0A%0ATotal ${money(cartTotal())}%0ANote: ${data.note || "—"}`;
    localStorage.setItem(
      "mervea-last-order",
      JSON.stringify({ orderId, data, items: getCart(), total: cartTotal() })
    );
    setCart([]);
    $("#checkout-form").hidden = true;
    $(".checkout-grid")?.setAttribute("hidden", "");
    const success = $("#order-success");
    success.classList.add("is-on");
    success.hidden = false;
    $("#order-id").textContent = orderId;
    const wa = $("#whatsapp-order");
    if (wa) {
      const phone = (STORE.whatsapp || "").replace(/\D/g, "");
      wa.href = phone ? `https://wa.me/${phone}?text=${message}` : `https://wa.me/?text=${message}`;
    }
  });
}

function bindContact() {
  const form = $("#contact-form");
  if (!form) return;
  $$(".field input, .field textarea").forEach((input) => {
    input.addEventListener("focus", () => input.closest(".field").classList.add("is-focus"));
    input.addEventListener("blur", () => input.closest(".field").classList.remove("is-focus"));
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await submitNetlifyForm(form);
    form.hidden = true;
    $("#contact-success").classList.add("is-on");
  });
}

function renderCategories() {
  const root = $("#cat-grid");
  if (!root) return;
  root.innerHTML = CATEGORIES.map(
    (c) => `
    <a class="cat-card" href="shop.html?category=${c.id}" data-link>
      <img src="${c.image}" alt="${c.name}">
      <div class="line">${c.line}</div>
      <h3>${c.name}</h3>
      <p>${c.copy}</p>
    </a>`
  ).join("");
}

function splitHeroTitle() {
  const title = $("#hero-title");
  if (!title) return;
  const text = title.textContent;
  title.innerHTML = [...text]
    .map((ch, i) => `<span style="animation-delay:${0.35 + i * 0.05}s">${ch === " " ? "&nbsp;" : ch}</span>`)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  bindTransitions();
  bindMenu();
  bindHeaderScroll();
  bindCart();
  bindMagnetic();
  bindContact();
  renderCart();
  renderHomeProducts();
  renderCategories();
  renderShop();
  renderProductPage();
  renderCheckout();
  splitHeroTitle();
  paintSiteStars();
  scatterStars($("#hero-stars"), 12, "#ffc8a3");
  scatterStars($("#why-stars"), 10, "rgba(255,255,255,.85)");
  scatterStars($("#ritual-stars"), 8, "rgba(255,255,255,.85)");
  scatterStars($("#footer-stars"), 8, "rgba(255,200,163,.7)");
  scatterStars($("#page-stars"), 10, "#c4896a");
  bindReveal();
});
