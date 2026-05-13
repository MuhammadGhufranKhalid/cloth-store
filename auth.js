console.log("Auth Loaded");

// ==========================
// REGISTER
// ==========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push({ email, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");

    window.location.href = "login.html";

  });

}

// ==========================
// LOGIN
// ==========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // ADMIN CHECK
    if (email === "admin@test.com" && password === "admin123") {

      localStorage.setItem("loggedUser", JSON.stringify({
        email,
        role: "admin"
      }));

      alert("Admin Login Success");

      window.location.href = "admin.html";

      return;
    }

    // USER CHECK
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {

      localStorage.setItem("loggedUser", JSON.stringify({
        email,
        role: "user"
      }));

      alert("Login Successful");

      window.location.href = "index.html";

    } else {

      alert("Invalid Email or Password");

    }

  });

}