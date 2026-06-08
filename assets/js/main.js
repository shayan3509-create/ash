// ============================================
// جاوااسکریپت اصلی فروشگاه نیوشاپ
// فقط فارسی – حذف سیستم دو زبانه
// ============================================

// ---------- دیتاها ----------
const categoriesData = [
    { name: 'موبایل', count: 1243, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>' },
    { name: 'لپ‌تاپ', count: 856, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/></svg>' },
    { name: 'هدفون', count: 432, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>' },
    { name: 'ساعت هوشمند', count: 321, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/></svg>' },
    { name: 'تبلت', count: 245, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>' },
    { name: 'لوازم جانبی', count: 1876, icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8h10v8a5 5 0 0 1 -10 0l0 -8" /><path d="M9 8v-5h6v5" /></svg>' }
];

const productsData = [
    { id: 1, name: 'iPhone 15 Pro Max', price: '65,900,000', oldPrice: '72,500,000', discount: 9, image: 'https://hooshmandariya.com/wp-content/uploads/2023/12/iphone-15-promax-bluetitanium-sidefront-view-1000px1000px-jpg-600x600.jpg' },
    { id: 2, name: 'سامسونگ Galaxy S24 Ultra', price: '58,900,000', oldPrice: '64,500,000', discount: 8, image: 'https://payatelecom.com/uploads/products/b362e7.jpg?m=thumb&w=1280&h=800&q=high' },
    { id: 3, name: 'هدفون سونی WH-1000XM5', price: '12,500,000', oldPrice: '15,800,000', discount: 20, image: 'https://janebi.com/janebi/9fd2/files/469649.webp' },
    { id: 4, name: 'لپ‌تاپ ایسوس ROG Zephyrus', price: '45,900,000', oldPrice: '52,000,000', discount: 11, image: 'https://www.technolife.com/image/color_image_TLP-31437_8f8f8f_c6093d4e-4f67-410e-9ae7-fb8b6329a5e7.png' },
    { id: 5, name: 'ساعت اپل واچ سری 9', price: '28,900,000', oldPrice: '32,500,000', discount: 11, image: '' },
    { id: 6, name: 'تبلت سامسونگ Tab S9', price: '22,900,000', oldPrice: '26,800,000', discount: 14, image: '' }
];

const featuresData = [
    { title: 'پشتیبانی تلفنی', desc: 'پاسخگویی سریع و حرفه‌ای', icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg>' },
    { title: 'ضمانت اصالت کالا', desc: 'ضمانت ۷ روزه بازگشت کالا', icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>' },
    { title: 'ارسال اکسپرس', desc: 'تحویل در کمترین زمان', icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>' },
    { title: 'بهترین قیمت', desc: 'تضمین بهترین قیمت بازار', icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>' }
];

// ---------- توابع رندر ----------
function renderCategories() {
    const container = document.getElementById('categoriesGrid');
    if (!container) return;
    container.innerHTML = categoriesData.map(c => `
        <div class="category-card" onclick="location.href='../products/category.html'">
            <div class="category-icon">${c.icon}</div>
            <div class="category-name">${c.name}</div>
            <div class="category-count">${c.count.toLocaleString()} محصول</div>
        </div>
    `).join('');
}

function renderProducts(productsArr, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = productsArr.slice(0, 4).map(p => `
        <div class="product-card">
            <div class="product-image-wrapper">
                ${p.image ? `<img src="${p.image}" alt="${p.name}" class="product-img">` : `
                <div class="product-img-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12" y2="18"></line>
                    </svg>
                </div>
                `}
                <span class="discount-badge">-${p.discount}%</span>
                <button class="wishlist-btn" onclick="event.preventDefault(); event.stopPropagation(); this.classList.toggle('active');" title="افزودن به علاقه‌مندی‌ها">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-content">
                <h3 class="product-title" title="${p.name}">${p.name}</h3>
                <div class="price-container">
                    <div class="price-row">
                        <span class="product-price">${p.price} <span class="currency-text">تومان</span></span>
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
                    <span>شروع اقساط از <strong>${Math.floor(parseInt(p.price.replace(/,/g, '')) / 12).toLocaleString()}</strong> تومان</span>
                </div>
            </div>
            <div class="product-card-footer">
                <a href="../product/detail.html?id=${p.id}" class="btn-buy-details">
                    <span>خرید و مشاهده جزئیات</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
                <button class="quick-add-cart" onclick="event.preventDefault(); event.stopPropagation(); addToCart('${p.name}', '${p.price}');" title="افزودن سریع به سبد">
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
            <h3 class="feature-title">${f.title}</h3>
            <p class="feature-desc">${f.desc}</p>
        </div>
    `).join('');
}

// ---------- خرید و سبد خرید ----------
let cart = [];
const cartCountEl = document.getElementById('cartCount');
window.addToCart = function(name, price) {
    cart.push({ name, price });
    if (cartCountEl) cartCountEl.textContent = cart.length;
    const toast = document.createElement('div');
    toast.textContent = `${name} به سبد خرید اضافه شد`;
    toast.style.cssText = `position:fixed; bottom:20px; left:20px; background:#10b981; color:white; padding:12px 24px; border-radius:8px; z-index:9999; animation:slideIn 0.3s ease; direction:rtl;`;
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

function initNeoCarousel() {
    const slides = document.querySelectorAll('.neo-slide');
    const dotsContainer = document.getElementById('neoDots');
    const ctrSpan = document.getElementById('neoCtr');
    const progressFill = document.getElementById('neoPf');
    const prevBtn = document.getElementById('neoPrev');
    const nextBtn = document.getElementById('neoNext');
    const heroContainer = document.querySelector('.neo-hero');
    if (!slides.length) return;

    // تنظیم پس‌زمینه یکدست و ثابت برای بنر
    if (heroContainer) {
        heroContainer.style.background = '#0a0a2a';
        heroContainer.style.backgroundSize = 'cover';
        heroContainer.style.animation = 'none';
    }

    const total = slides.length;
    let current = 0;
    let progressInterval;
    let progressValue = 0;

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === current) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function getPositionClass(index) {
        const diff = (index - current + total) % total;
        if (diff === 0) return 'active';
        if (diff === 1) return 'next1';
        if (diff === 2) return 'next2';
        if (diff === total - 1) return 'prev1';
        if (diff === total - 2) return 'prev2';
        return 'hidden';
    }

    function updateSlides() {
        slides.forEach((slide, i) => {
            slide.className = `neo-slide ${getPositionClass(i)}`;
        });
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });
        }
        if (ctrSpan) {
            ctrSpan.textContent = `${String(current+1).padStart(2,'0')}/${String(total).padStart(2,'0')}`;
        }
    }

    function startProgress() {
        if (progressInterval) clearInterval(progressInterval);
        if (!progressFill) return;
        progressValue = 0;
        progressFill.style.width = '0%';
        progressInterval = setInterval(() => {
            progressValue += 100 / 35;
            if (progressFill) progressFill.style.width = Math.min(progressValue, 100) + '%';
            if (progressValue >= 100) {
                clearInterval(progressInterval);
                goToSlide(current + 1);
            }
        }, 100);
    }

    function goToSlide(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        if (index === current) return;
        current = index;
        updateSlides();
        startProgress();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(current + 1));
    slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
            if (!slide.classList.contains('active')) {
                goToSlide(idx);
            }
        });
    });

    createDots();
    updateSlides();
    startProgress();
}

// ---------- لودر ----------
function initLoader() {
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        if (loader) {
            if (typeof gsap !== 'undefined') {
                gsap.to(loader, { opacity: 0, duration: 0.5, onComplete: () => loader.style.display = 'none' });
            } else {
                loader.style.display = 'none';
            }
        }
        const heroContent = document.querySelector('.hero-banner-content');
        if (heroContent && typeof gsap !== 'undefined') {
            gsap.from(heroContent, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' });
            gsap.from(heroContent.querySelector('.badge'), { opacity: 0, y: 20, duration: 0.6, delay: 0.2 });
            gsap.from(heroContent.querySelector('.title'), { opacity: 0, y: 30, duration: 0.6, delay: 0.4 });
            gsap.from(heroContent.querySelector('.desc'), { opacity: 0, y: 20, duration: 0.6, delay: 0.6 });
            gsap.from(heroContent.querySelector('.btn-buy'), { opacity: 0, scale: 0.8, duration: 0.5, delay: 0.8 });
        }
    });
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
    
    initDarkMode();
    initLoader();
    initNeoCarousel();
});

// استایل انیمیشن توست
const style = document.createElement('style');
style.textContent = `@keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
document.head.appendChild(style);

// ============================================================
// اسکریپت کاروسل سه‌بعدی اسپکتروم (اصلاح شده برای RTL و بدون تیلت)
// ============================================================
(function() {
    const cards = document.querySelectorAll('.spectrum-card');
    const dots = document.querySelectorAll('.spectrum-dots .dot');
    const carousel = document.getElementById('spectrumCarousel');
    const prevBtn = document.getElementById('prevBtnSp');
    const nextBtn = document.getElementById('nextBtnSp');
    const curNumSpan = document.getElementById('curNumSp');
    if (!cards.length) return;

    const total = cards.length;
    let current = 0;
    let autoTimer, progressTimer;
    let isAnimating = false;

    const SPREAD = 260;
    const Z_BACK = -280;
    const AUTO_INTERVAL = 4000;

    function getCardTransform(relIndex) {
        const absRel = Math.abs(relIndex);
        const x = relIndex * SPREAD;
        const z = -absRel * Math.abs(Z_BACK);
        const ry = relIndex * -22;
        const scale = 1 - absRel * 0.12;
        const opacity = 1 - absRel * 0.28;
        const blur = absRel > 1 ? (absRel - 1) * 3 : 0;
        return { x, z, ry, scale, opacity, blur };
    }

    function render(animated = true) {
        cards.forEach((card, i) => {
            let rel = i - current;
            if (rel > Math.floor(total / 2)) rel -= total;
            if (rel < -Math.floor(total / 2)) rel += total;
            const t = getCardTransform(rel);
            const zIndex = 100 - Math.abs(rel) * 10;
            card.style.transition = animated
                ? 'transform 0.85s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.5s, filter 0.85s, opacity 0.85s'
                : 'none';
            card.style.transform = `translateX(${t.x}px) translateZ(${t.z}px) rotateY(${t.ry}deg) scale(${t.scale})`;
            card.style.opacity = t.opacity;
            card.style.filter = `blur(${t.blur}px)`;
            card.style.zIndex = zIndex;
            card.style.pointerEvents = rel === 0 ? 'auto' : 'none';
            if (rel === 0) {
                card.classList.add('active-card');
                card.style.boxShadow = '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(255,60,0,0.15)';
            } else {
                card.classList.remove('active-card');
                card.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
            }
        });
        if (dots.length) {
            dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
        }
        if (curNumSpan) curNumSpan.textContent = String(current + 1).padStart(2, '0');
        resetProgress();
    }

    function resetProgress() {
        const activeCard = cards[current];
        const bar = activeCard.querySelector('.progress-bar');
        if (bar) bar.style.width = '0%';
        if (progressTimer) clearInterval(progressTimer);
        let progressVal = 0;
        progressTimer = setInterval(() => {
            progressVal += 100 / (AUTO_INTERVAL / 100);
            if (progressVal >= 100) progressVal = 100;
            if (bar) bar.style.width = progressVal + '%';
        }, 100);
    }

    function goTo(index, anim = true) {
        if (isAnimating) return;
        isAnimating = true;
        current = ((index % total) + total) % total;
        render(anim);
        clearTimeout(autoTimer);
        autoTimer = setTimeout(() => goTo(current + 1), AUTO_INTERVAL);
        setTimeout(() => { isAnimating = false; }, 900);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    if (dots.length) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => goTo(parseInt(dot.dataset.i)));
        });
    }
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (i !== current) goTo(i);
        });
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') goTo(current - 1);
        if (e.key === 'ArrowLeft') goTo(current + 1);
    });
    if (carousel) {
        let dragStartX = null;
        carousel.addEventListener('pointerdown', e => { dragStartX = e.clientX; });
        carousel.addEventListener('pointerup', e => {
            if (dragStartX === null) return;
            const dx = e.clientX - dragStartX;
            if (Math.abs(dx) > 50) dx > 0 ? goTo(current - 1) : goTo(current + 1);
            dragStartX = null;
        });
    }

    render(false);
    autoTimer = setTimeout(() => goTo(1), AUTO_INTERVAL);
})();
// ---------- پشتیبانی (رفع مشکل باز و بسته شدن) ----------
(function() {
    const toggle = document.getElementById('supportToggle');
    const modal = document.getElementById('supportModal');
    const close = document.getElementById('supportClose');
    const choicePanel = document.getElementById('supportChoice');
    const chatBody = document.getElementById('supportBody');
    const chatFooter = document.getElementById('supportFooter');
    const input = document.getElementById('supportInput');
    const send = document.getElementById('supportSend');
    const title = document.getElementById('supportTitle');

    if (!toggle || !modal) return;

    let chatType = null; // 'ai' یا 'human'

    // نمایش پنجره
    function openModal() {
        modal.classList.add('open');
        resetToChoice();
    }

    // بستن پنجره
    function closeModal() {
        modal.classList.remove('open');
    }

    // کلیک روی دکمه شناور
    toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // جلوگیری از پردازش توسط document
        if (modal.classList.contains('open')) {
            closeModal();
        } else {
            openModal();
        }
    });

    // کلیک روی دکمه ضربدر
    close.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    // بستن با کلیک بیرون
    document.addEventListener('click', (e) => {
        if (!modal.contains(e.target) && e.target !== toggle) {
            closeModal();
        }
    });

    // انتخاب نوع چت
    document.querySelectorAll('.support-option').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // اختیاری
            chatType = this.dataset.type;
            startChat();
        });
    });

    function resetToChoice() {
        chatType = null;
        choicePanel.style.display = 'block';
        chatBody.style.display = 'none';
        chatFooter.style.display = 'none';
        chatBody.innerHTML = '';
        title.textContent = 'پشتیبانی';
    }

    function startChat() {
    // بستن مودال
    modal.classList.remove('open');
    // هدایت به صفحه چت با پارامتر نوع
    window.location.href = '../../shop/support/chat.html?type=' + chatType;
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `support-message ${sender}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgDiv);
        scrollToBottom();
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        setTimeout(() => {
            if (chatType === 'ai') {
                addMessage('متوجه پیام شما شدم. در حال بررسی هستم...', 'bot');
            } else {
                addMessage('کارشناسان ما در اسرع وقت پاسخگو خواهند بود. در ساعات اداری پاسخ فوری دریافت می‌کنید.', 'bot');
            }
        }, 1000);
    }

    send.addEventListener('click', (e) => {
        e.stopPropagation();
        sendMessage();
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            sendMessage();
        }
    });

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
})();