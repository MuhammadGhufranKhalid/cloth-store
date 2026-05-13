console.log("Admin Panel Loaded");


let products = JSON.parse(localStorage.getItem("products")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

function addProduct() {

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
    image
  };

  products.push(newProduct);

  localStorage.setItem("products", JSON.stringify(products));

  alert("Product Added");

  renderProducts();

}

function deleteProduct(id) {

  products = products.filter(p => p.id !== id);

  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();

}

function renderProducts() {

  const container = document.getElementById("productList");

  container.innerHTML = "";

  products.forEach(p => {

    const div = document.createElement("div");

    div.classList.add("item");

    div.innerHTML = `
      <img src="${p.image}" width="80">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>

      <button onclick="deleteProduct(${p.id})">Delete</button>
    `;

    container.appendChild(div);

  });

}

function renderUsers() {

  const container = document.getElementById("userList");

  container.innerHTML = "";

  users.forEach((u, index) => {

    const div = document.createElement("div");

    div.classList.add("item");

    div.innerHTML = `
      <p>${u.email}</p>
      <button onclick="deleteUser(${index})">Delete</button>
    `;

    container.appendChild(div);

  });

}

function deleteUser(index) {

  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  renderUsers();

}

// INIT
renderProducts();
renderUsers();