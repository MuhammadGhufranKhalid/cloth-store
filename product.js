console.log("Product Page Loaded");

const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (!product) {
  alert("No product selected");
  window.location.href = "products.html";
}

const img = document.getElementById("productImage");
const name = document.getElementById("productName");
const desc = document.getElementById("productDescription");
const price = document.getElementById("productPrice");

img.src = product.image;
name.innerText = product.name;
desc.innerText = product.description || "No description available";
price.innerText = "$ " + product.price;

const colorsDiv = document.getElementById("colors");

const colors = ["Red", "Black", "Blue"];

let selectedColor = "";

colors.forEach(color => {

  const btn = document.createElement("button");

  btn.innerText = color;

  btn.onclick = () => {
    selectedColor = color;
    alert("Selected Color: " + color);
  };

  colorsDiv.appendChild(btn);

});

const sizesDiv = document.getElementById("sizes");

const sizes = ["S", "M", "L"];

let selectedSize = "";

sizes.forEach(size => {

  const btn = document.createElement("button");

  btn.innerText = size;

  btn.onclick = () => {
    selectedSize = size;
    alert("Selected Size: " + size);
  };

  sizesDiv.appendChild(btn);

});

const cartBtn = document.getElementById("cartBtn");

cartBtn.addEventListener("click", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(item => item.id === product.id);

  if (exists) {
    exists.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      color: selectedColor || "Default",
      size: selectedSize || "Default"
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to Cart");

});