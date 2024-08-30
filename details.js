const apiUrl = 'https://fakestoreapi.com/products';
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    if (productId) {
        fetchProductDetails(productId);
        updateCartCount();
    } else {
        console.error('Product ID is missing in the URL');
    }
});

function fetchProductDetails(productId) {
    fetch(`${apiUrl}/${productId}`)
        .then(response => response.json())
        .then(product => {
            displayProductDetails(product);
        })
        .catch(error => console.error('Error fetching product details:', error));
}

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
      <div class="product">
        <div>
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="details">
          <h3>${product.category}</h3>
          <h2>${product.title}</h2> 
          <p class="des">${product.description}</p>
          <p class="rating">Rating: ${product.rating.rate}</p>
          <p class="price">$${product.price}</p>
          <button onclick="addToCart(${product.id}, '${product.title}', '${product.image}', ${product.price})">Add to Cart</button>
          <button onclick="goToCart()">Go To Cart</button>
        </div>
     </div> 
    `;
}

function addToCart(id, title, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(p => p.id === id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ id, title, image, price, quantity: 1 });
    }

    // Update localStorage and cart count
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart');
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');

    // Calculate the total number of items in the cart
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

    // Update the cart count display
    cartCountElement.textContent = totalItems;
}

function goToCart() {
    // Redirect to the cart page
    window.location.href = 'cart.html';
}




function fetchProductDetails(productId) {
    fetch(`${apiUrl}/${productId}`)
        .then(response => response.json())
        .then(product => {
            displayProductDetails(product);
            fetchRelatedProducts(product.category); // Fetch related products
        })
        .catch(error => console.error('Error fetching product details:', error));
}

function fetchRelatedProducts(category) {
    fetch(`${apiUrl}/category/${category}`)
        .then(response => response.json())
        .then(products => {
            displayRelatedProducts(products);
        })
        .catch(error => console.error('Error fetching related products:', error));
}

function displayRelatedProducts(products) {
    const relatedProducts = document.getElementById('related-products');
    relatedProducts.innerHTML = products.map(product => `
        <div class="related-product" style="opacity: 0;">
            <img src="${product.image}" alt="${product.title}">
            <h4 class="title">${product.title}</h4>
            <div>
            <button onclick="viewDetails(${product.id})">Details</button>
            <button onclick="addToCart(${product.id}, '${product.title}', '${product.image}', ${product.price})">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Trigger animations after a slight delay to create a sequential effect
    const relatedProductElements = document.querySelectorAll('.related-product');
    relatedProductElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transition = 'opacity 0.5s ease-in-out';
        }, index * 200); // Stagger the animations
    });
}
