
let allProducts = [];

fetch('assets/product.json')
  .then(response => response.json())
  .then(data => {
    allProducts = data;
    displayProducts(allProducts); // show all initially
  })
  .catch(error => console.error('error loading products:', error));

function displayProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = ''; // clear old items

  products.forEach(product => {
    const col = document.createElement('div');
    col.classList.add('col-md-3', 'mb-4');
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image}" alt="${product.name}" class="card-img-top">
        <div class="card-body text-center">
          <h5 class="card-title">${product.name}</h5>
          <p class="text-muted">${product.category}</p>
          <p class="fw-bold">${product.price}</p>
          <div class="d-flex justify-content-center gap-2 mt-3">
            <button class="btn btn-outline-dark btn-sm add-to-cart"
              data-id="${product.id}"
              data-name="${product.name}"
              data-price="${product.price}"
              data-image="${product.image}">
              Add to Cart
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="viewDetails(${product.id})">View</button>
          </div>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

//  Dropdown Filter Event
document.getElementById('categorySelect').addEventListener('change', function () {
  const selected = this.value;
  if (selected === 'all') {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(
      product => product.category.toLowerCase() === selected.toLowerCase()
    );
    displayProducts(filtered);
  }
});

//  Add to Cart (same as before)
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
    const btn = e.target;
    const product = {
      id: parseInt(btn.dataset.id),
      name: btn.dataset.name,
      price: btn.dataset.price,
      image: btn.dataset.image,
      qty: 1
    };
    addToCart(product);
    alert('Added to cart');
  }
});

function viewDetails(id) {
  window.location.href = `shopDetails.html?id=${id}`;
}