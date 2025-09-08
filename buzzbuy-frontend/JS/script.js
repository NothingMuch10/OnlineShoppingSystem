// script.js

// ============ Utilities ============
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function cartItemCount(cart) {
  return cart.reduce((n, item) => n + (item.quantity || 0), 0);
}
function updateCartCountBadge() {
  const cart = getCart();
  const count = cartItemCount(cart);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}
function formatINR(n) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(Number(n || 0));
}

// simple image guesser (keeps your current images)
function imageForProduct(p) {
  const name = (p.name || "").toLowerCase();
  const cat = (p.category?.name || "").toLowerCase();
  if (cat.includes("electronics")) {
    return name.includes("phone") ? "images/mobile.png" : "images/laptop.jpg";
  }
  if (cat.includes("clothing")) return "images/pant.png";
  if (cat.includes("furniture")) return "images/furniture.jpg";
  if (cat.includes("food")) return "images/grocery.jpg";
  return "images/laptop.jpg"; // fallback
}

// card html (matches your previous structure/classes)
function productCard(p) {
  const category = p.category?.name || "";
  const img = imageForProduct(p);
  const price = Number(p.price || 0);

  // keep .product-card + data-category and the add-to-cart data payload shape
  return `
    <div class="col-md-4 mb-4 product-card" data-category="${category}">
      <div class="card card-sh h-100">
        <img src="${img}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${p.description || ""}</p>
          <p><strong>₹${formatINR(price)}</strong></p>
          <a href="view_product.html?id=${p.id}" class="btn btn-outline-primary btn-sm">View Details</a>
          <button class="btn btn-success btn-sm add-to-cart"
            data-product='${JSON.stringify({ name: p.name, category, price })}'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============ Header/Footer injection ============
$(function () {
  $("#header").load("header.html", updateCartCountBadge);
  $("#footer").load("footer.html");

  const params = new URLSearchParams(window.location.search);
  const categoryFilter = params.get("category"); // e.g., "Electronics"

  // ============ Load products from backend ============
  async function loadProducts() {
    const $grid = $("#product-grid");
    if (!$grid.length) return;

    try {
      const res = await fetch("http://localhost:8080/api/products");
      if (!res.ok) throw new Error("Failed to load products");
      let products = await res.json();

      // optional category filter (?category=Electronics)
      if (categoryFilter) {
        products = products.filter(
          (p) => (p.category?.name || "").toLowerCase() === categoryFilter.toLowerCase()
        );
        const h2 = $("h2:first");
        if (h2.length) h2.text(`Products — ${categoryFilter}`);
      }

      if (!products.length) {
        $grid.html(`<div class="col-12 text-muted">No products found.</div>`);
        return;
      }

      const html = products.map(productCard).join("");
      $grid.html(html);
    } catch (e) {
      console.error(e);
      $("#product-loading").remove();
      $("#product-grid").html(`<div class="col-12 text-danger">Could not load products.</div>`);
    }
  }

  // ============ Cart logic ============
  let cart = getCart();

  function renderCart() {
    const $tbody = $("#cart-body");
    const $summary = $("#cart-summary");
    if (!$tbody.length) return;

    $tbody.empty();
    if (cart.length === 0) {
      $tbody.append(`<tr><td colspan="5" class="text-center py-4">🛒 Your cart is empty.</td></tr>`);
      $("#totalAmount").text("0");
      $summary.show();
      return;
    }

    let total = 0;
    cart.forEach((item, idx) => {
      const line = (Number(item.price) || 0) * (item.quantity || 1);
      total += line;

      $tbody.append(`
        <tr>
          <td>${item.name}</td>
          <td><span class="badge bg-light text-dark">${item.category}</span></td>
          <td>
            <div class="d-inline-flex align-items-center gap-2">
              <button class="btn btn-sm btn-outline-secondary decrease" data-index="${idx}">−</button>
              <span class="fw-semibold">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary increase" data-index="${idx}">+</button>
            </div>
          </td>
          <td>₹${formatINR(line)}</td>
          <td><button class="btn btn-sm btn-outline-danger remove" data-index="${idx}">
            <i class="fa fa-trash"></i></button></td>
        </tr>
      `);
    });

    $("#totalAmount").text(formatINR(total));
    $summary.show();
    updateCartCountBadge();
  }

  // add-to-cart buttons across site
  $(document).on("click", ".add-to-cart", function () {
    const product = $(this).data("product"); // {name, category, price}
    if (!product) return;

    const existing = cart.find((p) => p.name === product.name);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    saveCart(cart);
    renderCart();
    updateCartCountBadge();
  });

  // qty +/-
  $(document).on("click", ".increase", function () {
    const idx = +$(this).data("index");
    cart[idx].quantity += 1;
    saveCart(cart);
    renderCart();
  });
  $(document).on("click", ".decrease", function () {
    const idx = +$(this).data("index");
    cart[idx].quantity -= 1;
    if (cart[idx].quantity <= 0) cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
  });

  // remove line
  $(document).on("click", ".remove", function () {
    const idx = +$(this).data("index");
    cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
  });

  // clear cart
  $(document).on("click", "#clear-cart", function () {
    cart = [];
    saveCart(cart);
    renderCart();
  });

  // initial renders
  loadProducts();
  if ($("#cart-body").length) renderCart();
});
