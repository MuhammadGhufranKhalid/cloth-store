console.log("DB Initialized");

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify([]));
}

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}


let users = JSON.parse(localStorage.getItem("users")) || [];


const adminExists = users.some(
  user => user.email === "admin@test.com"
);

if (!adminExists) {

  users.push({
    id: Date.now(),
    name: "Admin",
    email: "admin@test.com",
    password: "admin123",
    role: "admin"
  });

  localStorage.setItem("users", JSON.stringify(users));
}


let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length === 0) {

  products = [
    {
      id: 1,
      name: "Basic T-Shirt",
      description: "Comfortable cotton shirt",
      price: 99,
      image: "ntw-con1.jpg"
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      description: "Modern denim jeans",
      price: 120,
      image: "ntw-con2.jpg"
    }
  ];

  localStorage.setItem("products", JSON.stringify(products));
}