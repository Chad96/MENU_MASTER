import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcD7DbkWQ7YbSJQqKaI63NrvvQzk0leYY",
  authDomain: "menu-master-72fd3.firebaseapp.com",
  projectId: "menu-master-72fd3",
  storageBucket: "menu-master-72fd3.appspot.com",
  messagingSenderId: "721437273433",
  appId: "1:721437273433:web:b60e7a0b85e686ce8a3048",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Add an event listener for form submission
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
        alert("Login Successful..");
        // Redirect or show success message
        window.location.href = "index.html"; // Redirect to a dashboard page or another page after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        // Show error message to user
        alert(`Error: ${errorMessage}`);
      });
  });
