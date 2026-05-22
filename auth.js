console.log("Auth Loaded");

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const name = nameInput ? nameInput.value.trim() : "User";
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(user => user.email === email);

    if (exists) {
      alert("This email is already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "user"
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful. Please login");
    window.location.href = "login.html";
  });
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    if (email === "ghufranadmin@gmail.com" && password === "ghufran123") {
      const adminUser = {
        id: 1,
        name: "Admin",
        email,
        role: "admin"
      };

      localStorage.setItem("loggedUser", JSON.stringify(adminUser));
      sessionStorage.setItem("loggedUser", JSON.stringify(adminUser));

      alert("Admin login successful");

      window.location.href = "admin.html";
      return;
    }
    
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user =>
      user.email === email &&
      user.password === password &&
      user.role === "user"
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    const loggedUser = {
      id: user.id,
      name: user.name || "User",
      email: user.email,
      role: "user"
    };

    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    alert("Login successful");

    window.location.href = "index.html";
  });
}