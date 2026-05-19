console.log("Home JS Loaded");

document.addEventListener("DOMContentLoaded", () => {
  const shopBtn = document.querySelector(".shop-btn");
  const bagBtn = document.querySelector(".bag-btn");
  const userIcon = document.querySelector(".fa-user");
  const cartBtn = document.querySelector(".cart-btn");

  const products = [
    { id: 1, name: "Embroidered Seersucker Shirt", price: 99, image: "ntw-con1.jpg", description: "Premium V-Neck T-Shirt" },
    { id: 2, name: "Basic Slim Fit T-Shirt", price: 99, image: "ntw-con2.jpg", description: "Soft cotton slim fit t-shirt" },
    { id: 3, name: "Blurred Print T-Shirt", price: 99, image: "ntw-con3.jpg", description: "Stylish Henley printed t-shirt" },
    { id: 4, name: "Full Sleeve Zipper", price: 99, image: "ntw-con4.jpg", description: "Comfortable crewneck zipper" },

    { id: 5, name: "Basic Heavy Weight T-Shirt", price: 199, image: "xiv1.jpg", description: "Heavy weight cotton t-shirt" },
    { id: 6, name: "Soft Wash Straight Fit Jeans", price: 199, image: "xiv2.jpg", description: "Soft wash cotton jeans" },
    { id: 7, name: "Basic Heavy Weight T-Shirt", price: 199, image: "xiv3.jpg", description: "Classic heavy weight t-shirt" }
  ];

  localStorage.setItem("products", JSON.stringify(products));

  if (shopBtn) {
    shopBtn.addEventListener("click", () => {
      window.location.href = "products.html";
    });
  }

  if (bagBtn) {
    bagBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  if (userIcon) {
    userIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleUserMenu();
    });
  }

  const searchInput = document.querySelector(".input-search input");

  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const value = searchInput.value.toLowerCase();
      const allProducts = document.querySelectorAll(".img-box");

      allProducts.forEach(product => {
        const text = product.innerText.toLowerCase();
        product.style.display = text.includes(value) ? "block" : "none";
      });
    });
  }

  const allAddButtons = document.querySelectorAll(".add-icon, .plus-icon");
  const allProductCards = document.querySelectorAll(".img-box");

  allAddButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const item = products[index];

      if (!item) {
        showToast("Product data missing");
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...item,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
      showToast("Added to Cart ✔");
    });
  });

  allProductCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const item = products[index];

      if (!item) return;
      localStorage.setItem("selectedProduct", JSON.stringify(item));
      window.location.href = "product.html";
    });
  });

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    if (cartBtn) {
      cartBtn.innerText = `Cart (${totalQuantity})`;
    }
  }

  updateCartCount();

  const heroImages = document.querySelectorAll(".container-imgs img");

  if (heroImages.length > 0) {
    let current = 0;

    heroImages.forEach((img, i) => {
      if (i !== 0) img.style.display = "none";
    });

    setInterval(() => {
      heroImages[current].style.display = "none";
      current = (current + 1) % heroImages.length;
      heroImages[current].style.display = "block";
    }, 3000);
  }

  function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      document.body.appendChild(toast);
    }

    toast.innerText = message;

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#000",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: "8px",
      zIndex: "9999",
      transition: "0.3s",
      opacity: "1"
    });

    setTimeout(() => {
      toast.style.opacity = "0";
    }, 2000);
  }

  function toggleUserMenu() {
    let existing = document.querySelector(".user-dropdown");

    if (existing) {
      existing.remove();
      return;
    }

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const menu = document.createElement("div");

    menu.className = "user-dropdown";

    Object.assign(menu.style, {
      position: "absolute",
      top: "70px",
      right: "60px",
      background: "#fff",
      border: "1px solid #ddd",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      zIndex: "999"
    });

    if (user) {
      menu.innerHTML = `
        <p>${user.email}</p>
        <button id="logoutBtn">Logout</button>
      `;
    } else {
      menu.innerHTML = `
        <button id="loginBtn">Login</button>
      `;
    }

    document.body.appendChild(menu);

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
      loginBtn.onclick = () => {
        window.location.href = "login.html";
      };
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        localStorage.removeItem("loggedUser");
        location.reload();
      };
    }
  }

  document.addEventListener("click", () => {
    const menu = document.querySelector(".user-dropdown");
    if (menu) menu.remove();
  });
});