

document.addEventListener("DOMContentLoaded", function () {
  //  Subscribe Form Logic
  const form = document.getElementById("subscribeForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // stop reload

      const emailInput = document.getElementById("emailInput").value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailInput)) {
        alert("❌ Please enter a valid email address.");
        return;
      }

      // If valid
      alert("✅ Thank you for subscribing, " + emailInput + "! 🎉");
      form.reset();
    });
  }

  //  Add-to-Cart Logic for Home Page
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
      const btn = e.target;
      const product = {
        id: parseInt(btn.dataset.id),
        name: btn.dataset.name,
        price: btn.dataset.price,
        image: btn.dataset.image,
        qty: 1
      };

      addToCart(product); // function comes from cart.js
      alert("🛒 Added to cart!");
    }
  });
});