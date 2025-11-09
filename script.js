// Data produk
const products = [
    {
        id: 1,
        name: "SKINTIFIC - Panthenol Gentle Gel Cleanser",
        description: "pembersih wajah bertekstur gel ringan yang membersihkan secara lembut namun efektif, menghilangkan kotoran dan minyak berlebih tanpa membuat kulit kering.",
        price: 100000,
        image: "image/skintific panthenol.jpg",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "COSRX Low pH Good Morning Gel Cleanser 50ml",
        description: "pembersih wajah berformula lembut yang membantu menjaga keseimbangan pH kulit, membersihkan kotoran dan minyak berlebih tanpa membuat kulit kering, serta cocok untuk semua jenis kulit termasuk yang sensitif.",
        price: 150000,
        image: "image/COSRX Low pH.jpg",
        badge: "New"
    },
    {
        id: 3,
        name: "FFY! HYDRICEING & BRIGHTENING Essence Booster",
        description: "Produk ini diformulasikan khusus sebagai serum-infused toner yang membantu membuat kulit terasa lebih lembut dan halus.",
        price: 130000,
        image: "image/FFY.jpg"
    },
    {
        id: 4,
        name: "ANESSA Brightening UV Sunscreen Gel SPF50+ PA+++",
        description: "tabir surya gel yang memberikan perlindungan tinggi dari sinar UVA dan UVB sambil mencerahkan kulit.",
        price: 400000,
        image: "image/annesa.jpg",
        badge: "Sale"
    }
];

// State aplikasi
let cart = [];
let currentSlide = 0;

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartCount = document.querySelector('.cart-count');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');
const cartNotification = document.getElementById('cartNotification');
const notificationText = document.getElementById('notificationText');
const showcaseItems = document.querySelectorAll('.showcase-item');
const indicators = document.querySelectorAll('.indicator');

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    startSlideshow();
});

// Render produk ke grid
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
                    <button class="btn btn-outline view-details" data-id="${product.id}">Detail</button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Tambahkan event listeners untuk tombol produk
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            viewProductDetails(productId);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submissions
    contactForm.addEventListener('submit', handleContactForm);
    newsletterForm.addEventListener('submit', handleNewsletter);
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Product showcase indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
        });
    });
}

// Mobile menu functions
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showNotification(`"${product.name}" telah ditambahkan ke keranjang!`);
        
        // Animasi tombol
        const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        button.textContent = 'Ditambahkan!';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.textContent = 'Tambah ke Keranjang';
            button.style.backgroundColor = '';
        }, 2000);
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Detail Produk:\n\n${product.name}\n\n${product.description}\n\nHarga: Rp ${product.price.toLocaleString('id-ID')}`);
    }
}

// Notification system
function showNotification(message) {
    notificationText.textContent = message;
    cartNotification.classList.add('show');
    
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}

// Slideshow functions
function startSlideshow() {
    setInterval(() => {
        nextSlide();
    }, 5000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % showcaseItems.length;
    updateSlideshow();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlideshow();
}

function updateSlideshow() {
    showcaseItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide);
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Form handlers
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    showNotification(`Terima kasih, ${name}! Pesan Anda telah berhasil dikirim.`);
    contactForm.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification(`Terima kasih! Email ${email} telah berhasil didaftarkan untuk newsletter.`);
    newsletterForm.reset();
}

// Navbar scroll effect
function handleNavbarScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

// Animasi saat scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .testimonial-card, .feature, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});