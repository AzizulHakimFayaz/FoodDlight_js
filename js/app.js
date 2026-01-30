// Food Delight App Logic

document.addEventListener('DOMContentLoaded', () => {
    init();
});

// State
let cartCount = 0;
let activeCategory = 'All';

// Init
function init() {
    renderCategories();
    renderFoodItems(window.foodItems);
    setupEventListeners();
}

// Render Categories
function renderCategories() {
    const categoryList = document.getElementById('category-list');
    const categories = ['All', ...new Set(window.foodItems.map(item => item.category))];

    categoryList.innerHTML = categories.map(cat => `
        <div class="category-pill ${cat === 'All' ? 'active' : ''}" onclick="filterByCategory('${cat}')">
            ${cat}
        </div>
    `).join('');
}

// Render Food Grid
function renderFoodItems(items) {
    const foodGrid = document.getElementById('food-grid');

    if (items.length === 0) {
        foodGrid.innerHTML = '<p class="no-items">No items found.</p>';
        return;
    }

    foodGrid.innerHTML = items.map(item => `
        <div class="food-card">
            <div class="rating-badge">
                <span class="material-icons" style="font-size: 14px; color: var(--accent);">star</span>
                ${item.rating}
            </div>
            
            <img src="${item.image}" alt="${item.name}" class="card-image">
            
            <div class="card-background">
                <div class="card-info">
                    <span class="category-label">${item.category}</span>
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                </div>
                
                <div class="card-footer">
                    <div class="price">৳${item.price}</div>
                    <button class="add-btn" onclick="addToCart('${item.id}')">
                        <span class="material-icons">add</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Function
window.filterByCategory = (category) => {
    activeCategory = category;

    // Update active pill
    document.querySelectorAll('.category-pill').forEach(pill => {
        if (pill.innerText === category) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    // Filter items
    if (category === 'All') {
        renderFoodItems(window.foodItems);
    } else {
        const filtered = window.foodItems.filter(item => item.category === category);
        renderFoodItems(filtered);
    }
};

// Search Function
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');

    // Search checks name, category, and description
    const handleSearch = () => {
        const term = searchInput.value.toLowerCase();
        const filtered = window.foodItems.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );
        renderFoodItems(filtered);
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('input', handleSearch);
}

// Add to Cart
window.addToCart = (id) => {
    // Find item
    const item = window.foodItems.find(i => i.id == id);

    // Increment cart
    cartCount++;
    updateCartUI();

    console.log(`Added ${item.name} to cart`);

    // Visual feedback
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
};

function updateCartUI() {
    const cartCountElement = document.querySelector('.cart-count');
    // If text was "Cart", change to number, or append
    if (cartCount > 0) {
        cartCountElement.textContent = `Cart (${cartCount})`;
    } else {
        cartCountElement.textContent = 'Cart';
    }
}
