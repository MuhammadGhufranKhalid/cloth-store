

const productsContainer = document.querySelector(".products");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length === 0) {
  products = [
    {
      id: 1,
      name: "Embroidered Shirt",
      price: 99,
      image: "ntw-con1.jpg"
    },
    {
      id: 2,
      name: "Slim Fit T-Shirt",
      price: 120,
      image: "ntw-con2.jpg"
    },
    {
      id: 3,
      name: "Printed T-Shirt",
      price: 150,
      image: "ntw-con3.jpg"
    }
  ];
}


function renderProducts(data) {

  productsContainer.innerHTML = "";

  data.forEach(product => {

    const div = document.createElement("div");

    div.classList.add("product-card");

    div.innerHTML = `
      <img src="${product.image}" width="150">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add To Cart</button>
    `;

    productsContainer.appendChild(div);

  });

}

renderProducts(products);


searchInput.addEventListener("input", () => {

  const value = searchInput.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  renderProducts(filtered);

});


sortSelect.addEventListener("change", () => {

  let sorted = [...products];

  if (sortSelect.value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sortSelect.value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  renderProducts(sorted);

});

window.addToCart = function(id) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find(p => p.id === id);

  const exists = cart.find(item => item.id === id);

  if (exists) {
    exists.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added To Cart");

};