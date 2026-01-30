document.addEventListener('DOMContentLoaded', () => {
    createFloatingIcons();
});

function createFloatingIcons() {
    // 1. Create container
    const container = document.createElement('div');
    container.id = 'floating-icons-container';
    document.body.prepend(container);

    // 2. Icon set (Material Icons names)
    const icons = [
        'lunch_dining', 'local_pizza', 'fastfood', 'restaurant',
        'local_cafe', 'ramen_dining', 'icecream', 'bakery_dining',
        'local_bar', 'dinner_dining', 'tapas', 'brunch_dining'
    ];

    // 3. Configuration
    const iconCount = 20; // Number of icons on screen

    // 4. Generate icons
    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('span');
        icon.classList.add('material-icons', 'floating-icon');
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];

        // Random horizontal position (0-100vw)
        icon.style.left = `${Math.random() * 100}vw`;

        // Random size (20px - 50px)
        const size = Math.random() * 30 + 20;
        icon.style.fontSize = `${size}px`;

        // Random animation duration (15s - 25s for slow float)
        const duration = Math.random() * 10 + 15;
        icon.style.animation = `floatUp ${duration}s linear infinite`;

        // Random delay so they don't all start at once
        // Negative delay makes them start "mid-animation" so screen isn't empty on load
        const delay = Math.random() * 20;
        icon.style.animationDelay = `-${delay}s`;

        container.appendChild(icon);
    }
}
