const apiUrl = 'https://fakestoreapi.com/products';
let products = []; // Array to hold fetched products
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartCount();
});

function fetchProducts(category = 'all') {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data; // Save fetched products to the global variable
            displayProducts(products, category);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products, category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const filteredProducts = (category === 'all') ? products : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3 class="title">${product.title}</h3>
            <p class="des">${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="viewDetails(${product.id})">Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        // If the product is already in the cart, you can increase the quantity or just alert the user
        alert('This item is already in your cart.');
    } else {
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        // window.location.href=`cart.html`;
        updateCartCount();
    }
}


function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

function viewDetails(productId) {
    // Example redirection to a details page
    window.location.href = `http://127.0.0.1:5500/details.html?id=${productId}`;
}

function filterProducts(category) {
    displayProducts(products, category);
}
