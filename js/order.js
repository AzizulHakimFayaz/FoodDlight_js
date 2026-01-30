document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('foodCart')) || [];
    const cartContainer = document.getElementById('cart-items-container');
    const summaryContainer = document.getElementById('order-summary');

    // Empty State
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <span class="material-icons empty-cart-icon">shopping_bag</span>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any delicious food yet.</p>
                <a href="index.html" class="checkout-btn" style="display: inline-block; width: auto; margin-top: 20px; text-decoration: none;">Browse Menu</a>
            </div>
        `;
        summaryContainer.style.display = 'none';
        return;
    }

    summaryContainer.style.display = 'block';

    // Render Items
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">৳${item.price}</div>
            </div>
            
            <div class="quantity-controls">
                <button class="qty-btn remove" onclick="updateQuantity('${item.id}', -1)">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn add" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
            
            <button class="remove-btn" onclick="removeItem('${item.id}')">
                <span class="material-icons">delete_outline</span>
            </button>
        </div>
    `).join('');

    updateSummary(cart);
}

function updateSummary(cart) {
    // Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 60; // Fixed delivery fee
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + deliveryFee + tax;

    // Update DOM
    document.getElementById('subtotal').textContent = `৳${subtotal.toFixed(2)}`;
    document.getElementById('delivery-fee').textContent = `৳${deliveryFee}`;
    document.getElementById('tax').textContent = `৳${tax.toFixed(2)}`;
    document.getElementById('total-price').textContent = `৳${total.toFixed(2)}`;
}

// Global functions for inline usage
window.updateQuantity = (id, change) => {
    let cart = JSON.parse(localStorage.getItem('foodCart')) || [];
    const item = cart.find(i => i.id == id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id != id);
        }
    }

    localStorage.setItem('foodCart', JSON.stringify(cart));
    renderCart(); // Re-render logic
};

window.removeItem = (id) => {
    let cart = JSON.parse(localStorage.getItem('foodCart')) || [];
    cart = cart.filter(i => i.id != id);

    localStorage.setItem('foodCart', JSON.stringify(cart));
    renderCart();
};

window.placeOrder = () => {
    alert("Order Placed Successfully! \nThank you for choosing FoodieDelight.");
    localStorage.removeItem('foodCart');
    window.location.href = 'index.html';
};
