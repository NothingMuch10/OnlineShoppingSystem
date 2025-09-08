// checkout.js
$(function () {
  // Build order summary from localStorage cart
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const $orderItems = $("#order-items");
  let total = 0;

  if (cart.length === 0) {
    $orderItems.append(`<li class="list-group-item text-center"> Your cart is empty.</li>`);
  } else {
    cart.forEach(item => {
      const line = (item.price || 0) * (item.quantity || 1);
      total += line;
      $orderItems.append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${item.name} (x${item.quantity})
          <span>₹${line}</span>
        </li>
      `);
    });
  }
  $("#checkout-total").text(total);

  // Handle checkout form submission
  $("#checkout-form").on("submit", function (e) {
    e.preventDefault();
    alert(" Order placed successfully!");
    localStorage.removeItem("cart");  // clear cart
    if (typeof updateCartCountBadge === "function") {
      updateCartCountBadge();         // refresh navbar badge (from script.js)
    }
    window.location.href = "index.html"; // redirect to home
  });
});
