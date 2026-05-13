document.addEventListener("DOMContentLoaded", () => {

  console.log("Cart JS Loaded");

  const cartContainer = document.querySelector(".cart-items");
  const totalText = document.getElementById("total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {

    if (!cartContainer) {
      console.log("Cart container not found");
      return;
    }

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<h2>Cart is Empty</h2>";
      totalText.innerText = 0;
      return;
    }

    cart.forEach((item, index) => {

      total += item.price;

      const div = document.createElement("div");

      div.style.display = "flex";
      div.style.gap = "20px";
      div.style.alignItems = "center";
      div.style.margin = "15px 0";

      div.innerHTML = `
        <img src="${item.image}" width="80">
        <div>
          <h3>${item.name}</h3>
          <p>$${item.price}</p>
        </div>
        <button onclick="removeItem(${index})">Remove</button>
      `;

      cartContainer.appendChild(div);

    });

    totalText.innerText = total;

  }

  window.removeItem = function(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

  }

  renderCart();

});