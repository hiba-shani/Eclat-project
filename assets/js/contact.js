 
 let currentProduct = null;

// 1️ Load product sent from shopDetails page
document.addEventListener("DOMContentLoaded", function () {

  const stored = localStorage.getItem("selectedProduct");
  if (stored) {
    currentProduct = JSON.parse(stored);

    // Show product on contact page (optional)
    const pName = document.getElementById("product-name");
    const pPrice = document.getElementById("product-price");
    const pSize = document.getElementById("size-btn");

    if (pName) pName.textContent = currentProduct.name;
    if (pPrice) pPrice.textContent = currentProduct.price;
    if (pSize) pSize.textContent = currentProduct.sizes?.join(", ") || "No size selected";
  }

 
 
 
  const form=document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // get error elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    // clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    let isValid = true;

    // Name validation
    const namePattern = /^[A-Za-z\s]+$/;
    if (name === "") {
      nameError.textContent = "Please enter your name";
      isValid = false;
    } else if (!namePattern.test(name)) {
      nameError.textContent = "Name should contain only letters (no numbers or symbols)";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.textContent = "Please enter your email";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;
    if (phone === "") {
      phoneError.textContent = "Please enter your phone number";
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      phoneError.textContent = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // If all fields are valid
    if (isValid) {
      sendMail(currentProduct);
      // alert("Form submitted successfully!");
      // this.reset();
    }
  });
});