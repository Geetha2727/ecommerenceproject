// const apiUrl = 'https://fakestoreapi.com/products';
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get('id');

// document.addEventListener('DOMContentLoaded', () => {
//     if (productId) {
//         fetchProductDetails(productId);
//     } else {
//         console.error('Product ID is missing in the URL');
//     }
// });

// function fetchProductDetails(productId) {
//     fetch(`${apiUrl}/${productId}`)
//         .then(response => response.json())
//         .then(product => {
//             displayProductDetails(product);
//         })
//         .catch(error => console.error('Error fetching product details:', error));
// }

// function displayProductDetails(product) {
//     const productDetails = document.getElementById('product-details');
//     productDetails.innerHTML = `
//       <div class="product">
//         <div>
        
//         <img src="${product.image}" alt="${product.title}">
//         </div>
//         <div class="details">
//         <h3>${product.category}</h3>
//         <h2>${product.title}</h2> 
//         <p class="des">${product.description}</p>
//         <p class="rating">${product.rating.rate}</p>
//         <p class="price">$${product.price}</p>
//         <button onclick="addToCart(${product.id})">Add to Cart</button>
//         <button onclick="goToCart(${product.id})">Go To Cart</button>
//         </div>
//      </div> 
//     `;

//     productList.appendChild(productId);
// }

// function addToCart(productId) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const product = { id: productId, ...product.find(p => p.id == productId) };
//     cart.push(product);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     alert('Product added to cart');
// }

// function updateCartCount() {
//     const cartCountElement = document.getElementById('cart-count');
//     cartCountElement.textContent = cart.length;
// }


// function goToCart() {
//     // Redirection to the cart page
//     window.location.href = 'cart.html';
// }


const apiUrl = 'https://fakestoreapi.com/products';
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error('Product ID is missing in the URL');
    }
    updateCartCount(); // Update cart count on page load
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
          <p class="rating">${product.rating.rate} ⭐</p>
          <p class="price">$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
          <button onclick="goToCart()">Go To Cart</button>
        </div>
      </div> 
    `;
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if product already in cart
    } else {
        cart.push({ id: productId, quantity: 1 }); // Add new product with quantity 1
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart-count')) || [];
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
}

function goToCart() {
    window.location.href = 'cart.html'; // Redirect to the cart page
}


