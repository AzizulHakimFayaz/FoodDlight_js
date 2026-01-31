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
        <div class="cart-item" data-item-id="${item.id}">
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

        // Animate quantity display
        const cartItem = document.querySelector(`[data-item-id="${id}"]`);
        if (cartItem) {
            const qtyDisplay = cartItem.querySelector('.qty-display');
            const priceDisplay = cartItem.querySelector('.cart-item-price');

            if (qtyDisplay) {
                qtyDisplay.classList.add('pop');
                setTimeout(() => qtyDisplay.classList.remove('pop'), 300);
            }

            if (priceDisplay) {
                priceDisplay.classList.add('updated');
                setTimeout(() => priceDisplay.classList.remove('updated'), 300);
            }
        }

        if (item.quantity <= 0) {
            // Animate item removal
            animateRemoval(id, () => {
                cart = cart.filter(i => i.id != id);
                localStorage.setItem('foodCart', JSON.stringify(cart));
                renderCart();
            });
            return;
        }
    }

    localStorage.setItem('foodCart', JSON.stringify(cart));
    updateSummary(cart);

    // Update just the quantity display and price without full re-render
    const cartItem = document.querySelector(`[data-item-id="${id}"]`);
    if (cartItem && item) {
        cartItem.querySelector('.qty-display').textContent = item.quantity;
    }
};

// Animate item removal with slide-out effect
function animateRemoval(id, callback) {
    const cartItem = document.querySelector(`[data-item-id="${id}"]`);
    if (cartItem) {
        cartItem.classList.add('removing');
        setTimeout(callback, 400);
    } else {
        callback();
    }
}

window.removeItem = (id) => {
    animateRemoval(id, () => {
        let cart = JSON.parse(localStorage.getItem('foodCart')) || [];
        cart = cart.filter(i => i.id != id);
        localStorage.setItem('foodCart', JSON.stringify(cart));
        renderCart();
    });
};

window.placeOrder = () => {
    // Create confetti celebration
    createConfetti();

    setTimeout(() => {
        alert("🎉 Order Placed Successfully! \nThank you for choosing FoodieDelight.");
        localStorage.removeItem('foodCart');
        window.location.href = 'index.html';
    }, 1000);
};

// Confetti celebration animation
function createConfetti() {
    const colors = ['#ff6b6b', '#ffa502', '#ff7675', '#fd79a8', '#a29bfe', '#74b9ff'];
    const container = document.body;

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
            z-index: 9999;
            pointer-events: none;
        `;
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation to document
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);
