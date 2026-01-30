// Food Data (Copied from dummy_data.dart)
const foodItems = [
    {
        id: '1',
        name: 'Margherita Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 1250,
        description: 'Classic delight with 100% real mozzarella cheese.',
        category: 'Pizza',
    },
    {
        id: '2',
        name: 'Cheeseburger',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 450,
        description: 'Juicy grilled beef patty with cheddar cheese.',
        category: 'Burger',
    },
    {
        id: '3',
        name: 'Chicken Biriyani',
        imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 350,
        description: 'Aromatic basmati rice cooked with tender chicken and spices.',
        category: 'Biriyani',
    },
    {
        id: '4',
        name: 'Cola',
        imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 60,
        description: 'Refreshing carbonated soft drink.',
        category: 'Drinks',
    },
    {
        id: '5',
        name: 'Chocolate Lava Cake',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 250,
        description: 'Rich chocolate cake with a molten center.',
        category: 'Dessert',
    },
    {
        id: '6',
        name: 'Pepperoni Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 1400,
        description: 'American classic with spicy pepperoni slices.',
        category: 'Pizza',
    },
];

const categories = ['All', 'Pizza', 'Burger', 'Drinks', 'Dessert', 'Biriyani'];

// State
let currentCategory = 'All';
let cartCount = 0;
let searchQuery = '';

// DOM Elements
const foodGrid = document.getElementById('food-grid');
const categoryList = document.getElementById('category-list');
const cartCountElement = document.querySelector('.cart-count');
const searchInput = document.getElementById('search-input');

// Initialize
function init() {
    renderCategories();
    renderFoodItems();
    
    // Search Listener
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderFoodItems();
    });
}

// Render Categories
function renderCategories() {
    categoryList.innerHTML = categories.map(cat => `
        <button 
            class="category-pill ${cat === currentCategory ? 'active' : ''}"
            onclick="selectCategory('${cat}')"
        >
            ${cat}
        </button>
    `).join('');
}

// Select Category
window.selectCategory = (category) => {
    currentCategory = category;
    renderCategories();
    renderFoodItems();
}

// Render Food Items
function renderFoodItems() {
    const filteredItems = foodItems.filter(item => {
        const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredItems.length === 0) {
        foodGrid.innerHTML = '<p style="font-size: 18px; color: var(--text-secondary);">No delicious items found.</p>';
        return;
    }

    foodGrid.innerHTML = filteredItems.map(item => `
        <div class="food-card">
            <img src="${item.imageUrl}" alt="${item.name}" class="card-image">
            <div class="rating-badge">
                <span class="material-icons" style="font-size: 14px; color: var(--accent);">star</span>
                4.8
            </div>
            <div class="card-background">
                <div class="card-info">
                    <h3>${item.name}</h3>
                    <span class="category-label">${item.category}</span>
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

// Add to Cart
window.addToCart = (id) => {
    cartCount++;
    const item = foodItems.find(i => i.id === id);
    
    // Update UI
    cartCountElement.textContent = cartCount > 0 ? cartCount : 'Cart';
    
    // Simple "Toast" notification could go here
    console.log(`Added ${item.name} to cart`);
    
    // Optional: Animate the cart button to give feedback
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Run init
init();
