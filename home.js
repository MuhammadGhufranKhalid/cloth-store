console.log("Home JS Loaded");

// ==========================
// ELEMENTS
// ==========================

document.addEventListener("DOMContentLoaded", () => {

  const shopBtn = document.querySelector(".shop-btn");
  const bagBtn = document.querySelector(".bag-btn");
  const userBtn = document.querySelector(".fa-user");
  const cartBtn = document.querySelector(".cart-btn");

  // ==========================
  // NAVIGATION
  // ==========================

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

  if (userBtn) {
    userBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // ==========================
  // SEARCH
  // ==========================

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

  // ==========================
  // PRODUCTS (ONLY IF NOT EXISTS)
  // ==========================

  if (!localStorage.getItem("products") || JSON.parse(localStorage.getItem("products")).length === 0) {

    const products = [
      { id: 1, name: "Embroidered Seersucker Shirt", price: 99, image: "ntw-con1.jpg" },
      { id: 2, name: "Basic Slim Fit T-Shirt", price: 99, image: "ntw-con2.jpg" },
      { id: 3, name: "Blurred Print T-Shirt", price: 99, image: "ntw-con3.jpg" },
      { id: 4, name: "Full Sleeve Zipper", price: 99, image: "ntw-con4.jpg" }
    ];

    localStorage.setItem("products", JSON.stringify(products));
  }

  const products = JSON.parse(localStorage.getItem("products"));

  // ==========================
  // ADD TO CART (FIXED)
  // ==========================

  const addIcons = document.querySelectorAll(".add-icon");

  addIcons.forEach((icon, index) => {

    icon.addEventListener("click", (e) => {

      e.stopPropagation();

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const item = products[index];

      cart.push(item);

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      showToast("Added to Cart ✔");

    });

  });

  // ==========================
  // PRODUCT DETAIL
  // ==========================

  const productCards = document.querySelectorAll(".img-box");

  productCards.forEach((card, index) => {

    card.addEventListener("click", () => {

      localStorage.setItem("selectedProduct", JSON.stringify(products[index]));

      window.location.href = "product.html";

    });

  });

  // ==========================
  // CART COUNT FIX
  // ==========================

  function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartBtn) {
      cartBtn.innerText = `Cart (${cart.length})`;
    }
  }

  updateCartCount();

  // ==========================
  // HERO SLIDER FIX
  // ==========================

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

  // ==========================
  // TOAST FIX
  // ==========================

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

});

const userBtn = document.querySelector(".user-btn");

if (userBtn) {

  userBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    toggleUserMenu();

  });

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

  menu.style.position = "absolute";
  menu.style.top = "70px";
  menu.style.right = "60px";
  menu.style.background = "#fff";
  menu.style.border = "1px solid #ddd";
  menu.style.padding = "10px";
  menu.style.borderRadius = "8px";
  menu.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
  menu.style.zIndex = "999";

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

  // LOGIN
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.onclick = () => {
      window.location.href = "login.html";
    };
  }

  // LOGOUT
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("loggedUser");
      location.reload();
    };
  }
}

// close when click outside
document.addEventListener("click", () => {
  const menu = document.querySelector(".user-dropdown");
  if (menu) menu.remove();
});