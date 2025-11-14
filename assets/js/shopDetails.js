const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('assets/product.json')
    .then(response => response.json())
    .then(data => {
        const product = data.find(item => item.id == id);
        const container = document.getElementById('productDetails');

        if (product) {

            

            let currentImage = product.image;

            

            const sizeButtons = product.sizes ? product.sizes.map(
                size => `<button class="btn btn-outline-secondary btn-sm m-1 size-btn">${size}</button>`
            ).join('') :
                `<p class="text-muted">No sizes available</p>`;


            container.innerHTML = `
            <div class ="col-md-5 text-center">
            <img id="mainImage" src="${currentImage}" alt="${product.name}" class="img-fluid mb-3" style="max-width:350px;">
            </div>
            <div class="col-md-5">
            <h2>${product.name}</h2>
            <p class="text-muted">${product.category}</p>
            <h4 class ="fw-bold">${product.price}</h4>
            <p class="mt-3">${product.description}</p>
            <div class ="mt-3">
            <h6>Select size:</h6>
            ${sizeButtons}
            </div>
            <button class="btn btn-dark mt-4 add-to-cart-btn">Add to Cart</button>
            <button class="btn btn-dark mt-4 buy-now-btn">Buy Now</button>
            </div>
            `;

            // redirect to contact(buy now)

            const buyNowBtn = document.querySelector('.buy-now-btn');
            buyNowBtn.addEventListener('click', () => {
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = 'contact.html';
            });

           

            // size button heiglights

            const sizeBtns = document.querySelectorAll('.size-btn');
            sizeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    sizeBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });





            let selectedSize = null;
            

            // size click
            document.addEventListener('click', e => {
                if (e.target.classList.contains('size-btn')) {
                    selectedSize = e.target.textContent.trim();
                    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                }

               
            });

            // add to cart button (use a specific selector or id)
            document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                const productObj = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: document.getElementById('mainImage').src,
                    size: selectedSize,
                     qty: 1
                };
                addToCart(productObj);
                alert('Added to cart');
            });

           

        } else {
            container.innerHTML = `<p class="text-danger">Product Not Found</p>`;
        }
    });
