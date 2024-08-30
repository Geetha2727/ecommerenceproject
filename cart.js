let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
});

// Function to add item to cart
function addToCart(product) {
    if (!product || !product.id || !product.title || isNaN(product.price) || isNaN(product.quantity) || !product.image) {
        console.error('Invalid product data:', product);
        return;
    }

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    const shippingCost = 30; // Example shipping cost
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    const itemListDiv = document.createElement('div');
    itemListDiv.classList.add('item-list');
    cartItemsContainer.appendChild(itemListDiv);

    cart.forEach((product, index) => {
        if (!product || !product.title || isNaN(product.price) || isNaN(product.quantity) || !product.image) return;

        const subtotal = product.quantity * product.price;
        total += subtotal;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="cart-item-details">
                <img src="${product.image}" alt="${product.title}">
                <div class="details">
                    <h4 class="title">${product.title}</h4>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="quantity">${product.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <p>${product.quantity} * $${product.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        itemListDiv.appendChild(itemDiv);
    });

    const orderSummaryDiv = document.createElement('div');
    orderSummaryDiv.classList.add('order-summary');
    orderSummaryDiv.innerHTML = `
        <h3>Order Summary</h3>
        <p>Products (${cart.length}) <span>$${total.toFixed(2)}</span></p>
        <p>Shipping <span>$${shippingCost.toFixed(2)}</span></p>
        <p>Total amount <strong>$${(total + shippingCost).toFixed(2)}</strong></p>
        <button onclick="goToCheckout()">Go to checkout</button>
    `;
    cartItemsContainer.appendChild(orderSummaryDiv);
}

function changeQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;

    const totalItems = cart.reduce((sum, product) => sum + (product.quantity || 0), 0);
    cartCountElement.textContent = totalItems;
}

function goToCheckout() {
    alert('Proceeding to checkout');
}
