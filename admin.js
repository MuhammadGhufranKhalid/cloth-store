console.log("Admin Panel Loaded");

let products = JSON.parse(localStorage.getItem("products")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let editId = null;

// ==========================
// UPDATE STATS
// ==========================

function updateStats() {
  const totalProducts = document.getElementById("totalProducts");
  const totalUsers = document.getElementById("totalUsers");
  const totalCartItems = document.getElementById("totalCartItems");

  if (totalProducts) totalProducts.innerText = products.length;
  if (totalUsers) totalUsers.innerText = users.length;

  const cartCount = cart.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);

  if (totalCartItems) totalCartItems.innerText = cartCount;
}

// ==========================
// ADD / UPDATE PRODUCT
// ==========================

function addProduct() {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const image = imageInput.value.trim();

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  if (editId) {
    products = products.map(product => {
      if (product.id === editId) {
        return {
          ...product,
          name,
          price: Number(price),
          image
        };
      }

      return product;
    });

    alert("Product Updated");
    editId = null;
  } else {
    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      image,
      quantity: 1
    };

    products.push(newProduct);

    alert("Product Added");
  }

  localStorage.setItem("products", JSON.stringify(products));

  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";

  renderProducts();
  updateStats();
}

// ==========================
// EDIT PRODUCT
// ==========================

function editProduct(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("image").value = product.image;

  editId = id;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ==========================
// DELETE PRODUCT
// ==========================

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);

  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();
  updateStats();
}

// ==========================
// RENDER PRODUCTS
// ==========================

function renderProducts() {
  const container = document.getElementById("productList");

  if (!container) return;

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:15px;">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
        </div>
      </div>

      <div style="display:flex; gap:10px;">
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// ==========================
// RENDER USERS
// ==========================

function renderUsers() {
  const container = document.getElementById("userList");

  if (!container) return;

  container.innerHTML = "";

  if (users.length === 0) {
    container.innerHTML = "<p>No users found.</p>";
    return;
  }

  users.forEach((u, index) => {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <div>
        <h3>${u.name || "User"}</h3>
        <p>${u.email}</p>
      </div>

      <button onclick="deleteUser(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

// ==========================
// DELETE USER
// ==========================

function deleteUser(index) {
  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  renderUsers();
  updateStats();
}

// ==========================
// LOGOUT
// ==========================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
  });
}

// ==========================
// INIT
// ==========================

renderProducts();
renderUsers();
updateStats();