// script.js

// ============ Utilities ============
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function cartItemCount(cart) {
  // count total quantity, not just number of lines
  return cart.reduce((n, item) => n + (item.quantity || 0), 0);
}
function updateCartCountBadge() {
  const cart = getCart();
  const count = cartItemCount(cart);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

// ============ Header/Footer injection ============
$(function () {
  // load partials once DOM is ready
  $("#header").load("header.html", updateCartCountBadge);
  $("#footer").load("footer.html");

  // ============ Category filter on product page ============
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category"); // e.g., "Electronics"

  if (category && $(".product-card").length) {
    $(".product-card").each(function () {
      const cat = ($(this).data("category") || "").toString().toLowerCase();
      if (cat !== category.toLowerCase()) $(this).hide();
    });
    // optional: show heading
    const h2 = $("h2:first");
    if (h2.length) h2.text(`Products — ${category}`);
  }

  // ============ Cart logic ============
  let cart = getCart();

  function renderCart() {
    const $tbody = $("#cart-body");
    const $summary = $("#cart-summary");
    if (!$tbody.length) return; // not on cart page

    $tbody.empty();
    if (cart.length === 0) {
      $tbody.append(`<tr><td colspan="5" class="text-center py-4">🛒 Your cart is empty.</td></tr>`);
      $("#totalAmount").text("0");
      $summary.show();
      return;
    }

    let total = 0;
    cart.forEach((item, idx) => {
      const line = (item.price || 0) * (item.quantity || 1);
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
          <td>₹${line}</td>
          <td><button class="btn btn-sm btn-outline-danger remove" data-index="${idx}"><i class="fa fa-trash"></i></button></td>
        </tr>
      `);
    });

    $("#totalAmount").text(total);
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

  // clear cart button
  $(document).on("click", "#clear-cart", function () {
    cart = [];
    saveCart(cart);
    renderCart();
  });

  // if we are on cart page, render now
  if ($("#cart-body").length) renderCart();
});
