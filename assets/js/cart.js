

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

//  Add product to cart
function addToCart(product) {
  // check if already in cart
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1; // increase quantity
  } else {
    cart.push(product);
  }


  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

//  Update cart count in navbar
function updateCartCount() {
  const countSpan = document.getElementById('cartCount');
  if (countSpan) {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    countSpan.textContent = totalItems;
  }
}
// clear cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  // if (typeof updateCartCount === "function") {
  updateCartCount();
  // }

  if (typeof renderCart === "function") {
    renderCart();
  }

  alert("cart cleared!");
}