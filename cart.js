document.addEventListener("DOMContentLoaded", () => {
  console.log("Cart JS Loaded");

  const cartContainer = document.querySelector(".cart-items");
  const totalText = document.getElementById("total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    if (!cartContainer) {
      console.log("Cart container not found");
      return;
    }

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<h2>Cart is Empty</h2>";
      if (totalText) totalText.innerText = 0;
      return;
    }

    cart.forEach((item, index) => {
      const quantity = item.quantity || 1;
      const itemTotal = Number(item.price) * quantity;

      total += itemTotal;

      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Subtotal: $${itemTotal}</p>
        </div>

        <div class="qty-box">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      `;

      cartContainer.appendChild(div);
    });

    if (totalText) totalText.innerText = total;
  }

  window.increaseQty = function(index) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    saveCart();
    renderCart();
  };

  window.decreaseQty = function(index) {
    if ((cart[index].quantity || 1) > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }

    saveCart();
    renderCart();
  };

  window.removeItem = function(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  };

  renderCart();
});