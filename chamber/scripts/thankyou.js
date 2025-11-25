// thankyou.js

// Read the URL parameters
const params = new URLSearchParams(window.location.search);

// Output the values into the HTML
document.getElementById("out-fname").textContent = params.get("fname") || "";
document.getElementById("out-lname").textContent = params.get("lname") || "";
document.getElementById("out-email").textContent = params.get("email") || "";
document.getElementById("out-phone").textContent = params.get("phone") || "";
document.getElementById("out-org").textContent = params.get("organization") || "";
document.getElementById("out-timestamp").textContent = params.get("timestamp") || "";
