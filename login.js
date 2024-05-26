document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Logged in successfully!");
        window.location.href = "index.html"; // Redirect to homepage after login
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login.");
    }
  });

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registered successfully!");
        loginForm.reset(); // Clear login form
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred during registration.");
    }
  });
});
