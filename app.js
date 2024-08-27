// Fetching product data from a public API
const apiUrl = 'https://fakestoreapi.com/products';

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts(category = 'all') {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayProducts(data, category);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products, category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const filteredProducts = category === 'all'
        ? products
        : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="viewDetails(${product.id})">Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    // Implement add to cart functionality
    alert(`Product ${productId} added to cart.`);
}

function viewDetails(productId) {
    // Implement view details functionality
    alert(`Viewing details for product ${productId}.`);
}

function filterProducts(category) {
    fetchProducts(category);
}

