console.log("Admin Panel Loaded");

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser || loggedUser.role !== "admin") {
  alert("Only admin can access dashboard");
  window.location.href = "login.html";
}

let products = JSON.parse(localStorage.getItem("products")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let editId = null;

function updateStats() {
  const totalProducts = document.getElementById("totalProducts");
  const totalUsers = document.getElementById("totalUsers");
  const totalCartItems = document.getElementById("totalCartItems");

  if (totalProducts) totalProducts.innerText = products.length;
  if (totalUsers) totalUsers.innerText = users.filter(user => user.role !== "admin").length;

  const cartCount = cart.reduce((sum, item) => {
    if (!item) return sum;
    return sum + (item.quantity || 1);
  }, 0);

  if (totalCartItems) totalCartItems.innerText = cartCount;
}


function addProduct() {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!name || !price) {
    alert("Please fill product name and price");
    return;
  }

  if (!editId && !imageFile) {
    alert("Please upload product image");
    return;
  }

  if (imageFile) {
    const reader = new FileReader();

    reader.onload = function () {
      saveProduct(name, price, reader.result);
    };

    reader.readAsDataURL(imageFile);
  } else {
    saveProduct(name, price, null);
  }
}

function saveProduct(name, price, imageBase64) {
  if (editId) {
    products = products.map(product => {
      if (product.id === editId) {
        return {
          ...product,
          name,
          price: Number(price),
          image: imageBase64 || product.image
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
      image: imageBase64,
      quantity: 1
    };

    products.push(newProduct);

    alert("Product Added");
  }

  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";

  renderProducts();
  updateStats();
}


function editProduct(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("image").value = "";

  editId = id;

  alert("Product loaded. Select new image only if you want to change it.");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function deleteProduct(id) {
  products = products.filter(p => p.id !== id);

  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();
  updateStats();
}

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

function renderUsers() {
  const container = document.getElementById("userList");

  if (!container) return;

  container.innerHTML = "";

  const normalUsers = users.filter(user => user.role !== "admin");

  if (normalUsers.length === 0) {
    container.innerHTML = "<p>No users found.</p>";
    return;
  }

  normalUsers.forEach(user => {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <div>
        <h3>${user.name || "User"}</h3>
        <p>${user.email}</p>
      </div>

      <button onclick="deleteUser(${user.id})">Delete</button>
    `;

    container.appendChild(div);
  });
}

function deleteUser(id) {
  users = users.filter(user => user.id !== id);

  localStorage.setItem("users", JSON.stringify(users));

  renderUsers();
  updateStats();
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    sessionStorage.removeItem("loggedUser");
    window.location.href = "login.html";
  });
}

renderProducts();
renderUsers();
updateStats();