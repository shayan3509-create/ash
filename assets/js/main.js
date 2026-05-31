// ============================================

// جاوااسکریپت اصلی فروشگاه نیوشاپ

// بدون سیستم ترجمه – فقط امکانات پایه

// ============================================



// تشخیص زبان از آدرس صفحه (برای رندر داینامیک)

let isEnglish = window.location.pathname.includes('en.html') || window.location.pathname.endsWith('/en.html');



// ---------- دیتاهای دو زبانه ----------

const categoriesData = [

    { nameFa: 'موبایل', nameEn: 'Mobile', count: 1243, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>' },

    { nameFa: 'لپ‌تاپ', nameEn: 'Laptop', count: 856, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect x="4" y="4" width="16" height="12" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg>' },

    { nameFa: 'هدفون', nameEn: 'Headphone', count: 432, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>' },

    { nameFa: 'ساعت هوشمند', nameEn: 'Smart Watch', count: 321, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>' },

    { nameFa: 'تبلت', nameEn: 'Tablet', count: 245, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>' },

    { nameFa: 'لوازم جانبی', nameEn: 'Accessories', count: 1876, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path><line x1="8" y1="8" x2="4" y2="12"></line><line x1="12" y1="4" x2="8" y2="8"></line></svg>' }

];



const productsData = [

    { id: 1, nameFa: 'iPhone 15 Pro Max', nameEn: 'iPhone 15 Pro Max', price: '65,900,000', oldPrice: '72,500,000', discount: 9, image: 'https://hooshmandariya.com/wp-content/uploads/2023/12/iphone-15-promax-bluetitanium-sidefront-view-1000px1000px-jpg-600x600.jpg' },

    { id: 2, nameFa: 'سامسونگ Galaxy S24 Ultra', nameEn: 'Samsung Galaxy S24 Ultra', price: '58,900,000', oldPrice: '64,500,000', discount: 8, image: 'https://payatelecom.com/uploads/products/b362e7.jpg?m=thumb&w=1280&h=800&q=high' },

    { id: 3, nameFa: 'هدفون سونی WH-1000XM5', nameEn: 'Sony WH-1000XM5', price: '12,500,000', oldPrice: '15,800,000', discount: 20, image: 'https://janebi.com/janebi/9fd2/files/469649.webp' },

    { id: 4, nameFa: 'لپ‌تاپ ایسوس ROG Zephyrus', nameEn: 'Asus ROG Zephyrus', price: '45,900,000', oldPrice: '52,000,000', discount: 11, image: 'https://www.technolife.com/image/color_image_TLP-31437_8f8f8f_c6093d4e-4f67-410e-9ae7-fb8b6329a5e7.png' },

    { id: 5, nameFa: 'ساعت اپل واچ سری 9', nameEn: 'Apple Watch Series 9', price: '28,900,000', oldPrice: '32,500,000', discount: 11, image: '' },

    { id: 6, nameFa: 'تبلت سامسونگ Tab S9', nameEn: 'Samsung Tab S9', price: '22,900,000', oldPrice: '26,800,000', discount: 14, image: '' }

];



const featuresData = [

    { titleFa: 'پشتیبانی تلفنی', titleEn: 'Phone Support', descFa: 'پاسخگویی سریع و حرفه‌ای', descEn: 'Quick and professional response', icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>' },

    { titleFa: 'ضمانت اصالت کالا', titleEn: 'Authenticity Guarantee', descFa: 'ضمانت ۷ روزه بازگشت کالا', descEn: '7-day return guarantee', icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' },

    { titleFa: 'ارسال اکسپرس', titleEn: 'Express Delivery', descFa: 'تحویل در کمترین زمان', descEn: 'Fastest delivery time', icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle><line x1="16" y1="13" x2="23" y2="13"></line></svg>' },

    { titleFa: 'بهترین قیمت', titleEn: 'Best Price', descFa: 'تضمین بهترین قیمت بازار', descEn: 'Best price guarantee', icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>' }

];



// ---------- توابع کمکی زبان ----------

function getCategoryName(cat) {

    return isEnglish ? cat.nameEn : cat.nameFa;

}

function getProductName(p) {

    return isEnglish ? p.nameEn : p.nameFa;

}

function getCurrency() {

    return isEnglish ? 'Toman' : 'تومان';

}

function getUnitText() {

    return isEnglish ? 'products' : 'محصول';

}

function getInstallmentLabel() {

    return isEnglish ? 'Starting installment from' : 'شروع اقساط از';

}

function getBuyBtnText() {

    return isEnglish ? 'Buy & View Details' : 'خرید و مشاهده جزئیات';

}

function getFeatureTitle(f) {

    return isEnglish ? f.titleEn : f.titleFa;

}

function getFeatureDesc(f) {

    return isEnglish ? f.descEn : f.descFa;

}



// ---------- توابع رندر ----------

function renderCategories() {

    const container = document.getElementById('categoriesGrid');

    if (!container) return;

    container.innerHTML = categoriesData.map(c => `

        <div class="category-card" onclick="location.href='../products/category.html'">

            <div class="category-icon">${c.icon}</div>

            <div class="category-name">${getCategoryName(c)}</div>

            <div class="category-count">${c.count.toLocaleString()} ${getUnitText()}</div>

        </div>

    `).join('');

}



function renderProducts(productsArr, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    

    const currency = getCurrency();

    const installmentLabel = getInstallmentLabel();

    const buyBtnText = getBuyBtnText();

    

    container.innerHTML = productsArr.slice(0, 4).map(p => `

        <div class="product-card">

            <div class="product-image-wrapper">

                ${p.image ? `<img src="${p.image}" alt="${getProductName(p)}" class="product-img">` : `

                <div class="product-img-placeholder">

                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">

                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>

                        <line x1="12" y1="18" x2="12" y2="18"></line>

                    </svg>

                </div>

                `}

                <span class="discount-badge">-${p.discount}%</span>

                <button class="wishlist-btn" onclick="event.preventDefault(); event.stopPropagation(); this.classList.toggle('active');" title="${isEnglish ? 'Add to Wishlist' : 'افزودن به علاقه‌مندی‌ها'}">

                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>

                    </svg>

                </button>

            </div>

            <div class="product-content">

                <h3 class="product-title" title="${getProductName(p)}">${getProductName(p)}</h3>

                <div class="price-container">

                    <div class="price-row">

                        <span class="product-price">${p.price} <span class="currency-text">${currency}</span></span>

                        <span class="product-old-price">${p.oldPrice}</span>

                    </div>

                </div>

                <div class="installment-badge">

                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

                        <rect x="3" y="4" width="18" height="16" rx="2"></rect>

                        <line x1="16" y1="2" x2="16" y2="4"></line>

                        <line x1="8" y1="2" x2="8" y2="4"></line>

                        <line x1="3" y1="10" x2="21" y2="10"></line>

                    </svg>

                    <span>${installmentLabel} <strong>${Math.floor(parseInt(p.price.replace(/,/g, '')) / 12).toLocaleString()}</strong> ${currency}</span>

                </div>

            </div>

            <div class="product-card-footer">

                <a href="../product/detail.html?id=${p.id}" class="btn-buy-details">

                    <span>${buyBtnText}</span>

                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

                        <line x1="5" y1="12" x2="19" y2="12"></line>

                        <polyline points="12 5 19 12 12 19"></polyline>

                    </svg>

                </a>

                <button class="quick-add-cart" onclick="event.preventDefault(); event.stopPropagation(); addToCart('${getProductName(p)}', '${p.price}');" title="${isEnglish ? 'Add to Cart' : 'افزودن سریع به سبد'}">

                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

                        <circle cx="9" cy="21" r="1"></circle>

                        <circle cx="20" cy="21" r="1"></circle>

                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>

                    </svg>

                </button>

            </div>

        </div>

    `).join('');

}

function renderFeatures() {

    const container = document.getElementById('featuresGrid');

    if (!container) return;

    container.innerHTML = featuresData.map(f => `

        <div class="feature-card">

            <div class="feature-icon">${f.icon}</div>

            <h3 class="feature-title">${getFeatureTitle(f)}</h3>

            <p class="feature-desc">${getFeatureDesc(f)}</p>

        </div>

    `).join('');

}



// ---------- خرید و سبد خرید ----------

function buyAndView(productId, productName, productPrice) {

    addToCart(productName, productPrice);

    setTimeout(() => {

        window.location.href = `../products/detail.html?id=${productId}`;

    }, 300);

}



let cart = [];

const cartCountEl = document.getElementById('cartCount');

window.addToCart = function(name, price) {

    cart.push({ name, price });

    if (cartCountEl) cartCountEl.textContent = cart.length;

    const toast = document.createElement('div');

    toast.textContent = isEnglish ? `${name} added to cart` : `${name} به سبد خرید اضافه شد`;

    toast.style.cssText = `position:fixed; bottom:20px; left:20px; background:#10b981; color:white; padding:12px 24px; border-radius:8px; z-index:9999; animation:slideIn 0.3s ease; direction:${isEnglish ? 'ltr' : 'rtl'};`;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);

};



// ---------- شمارنده (آمار) ----------

function startCounter(elementId, target, duration = 2000) {

    const element = document.getElementById(elementId);

    if (!element) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                let start = 0;

                const increment = target / (duration / 16);

                const update = () => {

                    start += increment;

                    if (start < target) {

                        element.textContent = Math.floor(start).toLocaleString();

                        requestAnimationFrame(update);

                    } else {

                        element.textContent = target.toLocaleString();

                    }

                };

                update();

                observer.unobserve(element);

            }

        });

    }, { threshold: 0.5 });

    observer.observe(element);

}



// ---------- تایمر ----------

function startTimer() {

    const targetDate = new Date();

    targetDate.setDate(targetDate.getDate() + 7);

    setInterval(() => {

        const now = new Date();

        const diff = targetDate - now;

        document.getElementById('days').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');

        document.getElementById('hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');

        document.getElementById('minutes').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');

        document.getElementById('seconds').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

    }, 1000);

}



// ---------- انیمیشن اسکرول ----------

function initScrollAnimation() {

    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) entry.target.classList.add('visible');

        });

    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

}



// ---------- دکمه بازگشت به بالا ----------

function initBackToTop() {

    const btn = document.getElementById('backToTop');

    if (!btn) return;

    window.addEventListener('scroll', () => {

        btn.style.display = window.scrollY > 300 ? 'flex' : 'none';

    });

    btn.addEventListener('click', () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

    });

}



// ---------- دارک مود ----------

function initDarkMode() {

    const toggle = document.getElementById('darkModeToggle');

    const body = document.body;

    const sunIcon = document.querySelector('.sun-icon');

    const moonIcon = document.querySelector('.moon-icon');

    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {

        body.classList.add('dark');

        if (sunIcon) sunIcon.style.display = 'none';

        if (moonIcon) moonIcon.style.display = 'block';

    }

    if (toggle) {

        toggle.addEventListener('click', () => {

            body.classList.toggle('dark');

            const isDark = body.classList.contains('dark');

            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';

            if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';

        });

    }

}



// ---------- اجرای اولیه ----------

document.addEventListener('DOMContentLoaded', () => {

    renderCategories();

    renderProducts(productsData, 'featuredProducts');

    renderProducts(productsData, 'bestsellerProducts');

    renderFeatures();

    startCounter('customersCount', 12500);

    startCounter('productsCount', 10432);

    startCounter('ordersCount', 8750);

    startCounter('citiesCount', 350);

    startTimer();

    initScrollAnimation();

    initBackToTop();

    initDarkMode();

});



// استایل انیمیشن توست

const style = document.createElement('style');

style.textContent = `@keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;

document.head.appendChild(style);





/* =========================

   3D GLASS BUTTONS

========================= */



document.querySelectorAll('.glass-btn')

.forEach(btn=>{



    btn.addEventListener('click',()=>{



        btn.classList.toggle('active');



    });



});



const hero = document.querySelector('.hero-3d');

if (hero) {

    hero.addEventListener('mousemove', (e) => {

        const x = (window.innerWidth / 2 - e.pageX) / 40;

        const y = (window.innerHeight / 2 - e.pageY) / 40;



        const floatingPhone = document.querySelector('.floating-phone');

        const floatingLaptop = document.querySelector('.floating-laptop');



        if (floatingPhone)

            floatingPhone.style.transform = `translate(${x}px,${y}px) rotate(-18deg)`;



        if (floatingLaptop)

            floatingLaptop.style.transform = `translate(${-x}px,${-y}px) rotate(12deg)`;

    });

}

