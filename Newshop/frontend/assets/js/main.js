// اتصال به بک‌اند
const BACKEND_URL = 'http://localhost:5000';

async function testConnection() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products`);
    if (response.ok) {
      console.log('✅ Connection to backend successful');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Network error:', error);
    return false;
  }
}

async function getProducts() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

async function registerUser(userData) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const result = await response.json();
    if (response.ok) return result;
    return null;
  } catch (error) {
    return null;
  }
}

async function loginUser(credentials) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.token);
      return result;
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function searchOnBackend(query) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products?search=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

// ==================== توابع اصلی ====================
document.addEventListener('DOMContentLoaded', async () => {




// ==================== پرفروش‌ترین‌های هفته ====================
// ==================== پرفروش‌ترین‌های هفته ====================




// ==================== پرفروش‌ترین‌های هفته ====================
// ==================== پرفروش‌ترین‌های هفته ====================

// ==================== پرفروش‌ترین‌های هفته ====================
const bestSellersSection = document.querySelector('.best-sellers');

if (bestSellersSection) {
    const bestSellersData = [
        { 
            id: 1, 
            name: 'آیفون ۱۵ پرو مکس', 
            price: 75000000, 
            oldPrice: 82000000,
            discount: 9,
            rating: 4.9,
            ratingCount: 534,
            stock: 3,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', 
            badge: 'پرفروش' 
        },
        { 
            id: 2, 
            name: 'مک‌بوک پرو M3', 
            price: 120000000, 
            oldPrice: 135000000,
            discount: 11,
            rating: 4.8,
            ratingCount: 289,
            stock: 5,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 3, 
            name: 'گلکسی S24 Ultra', 
            price: 65000000, 
            oldPrice: 70000000,
            discount: 7,
            rating: 4.7,
            ratingCount: 456,
            stock: 8,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop', 
            badge: 'تخفیف' 
        },
        { 
            id: 4, 
            name: 'ایرپادز پرو ۲', 
            price: 12000000, 
            oldPrice: 14000000,
            discount: 14,
            rating: 4.6,
            ratingCount: 712,
            stock: 15,
            image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop', 
            badge: 'ویژه' 
        },
        { 
            id: 5, 
            name: 'اپل واچ سری ۹', 
            price: 28000000, 
            oldPrice: 32000000,
            discount: 13,
            rating: 4.8,
            ratingCount: 378,
            stock: 4,
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop', 
            badge: 'محبوب' 
        },
        { 
            id: 6, 
            name: 'آیپد پرو M2', 
            price: 55000000, 
            oldPrice: 60000000,
            discount: 8,
            rating: 4.7,
            ratingCount: 298,
            stock: 6,
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', 
            badge: 'پرفروش' 
        },
        { 
            id: 7, 
            name: 'سونی WH-1000XM5', 
            price: 18000000, 
            oldPrice: 22000000,
            discount: 18,
            rating: 4.9,
            ratingCount: 445,
            stock: 2,
            image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 8, 
            name: 'سامسونگ Galaxy Buds', 
            price: 8500000, 
            oldPrice: 9500000,
            discount: 11,
            rating: 4.5,
            ratingCount: 267,
            stock: 20,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop', 
            badge: 'تخفیف' 
        },
        { 
            id: 9, 
            name: 'لنوو Legion 5', 
            price: 85000000, 
            oldPrice: 95000000,
            discount: 11,
            rating: 4.8,
            ratingCount: 134,
            stock: 3,
            image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop', 
            badge: 'گیمینگ' 
        },
        { 
            id: 10, 
            name: 'دوربین Canon EOS R6', 
            price: 95000000, 
            oldPrice: 105000000,
            discount: 10,
            rating: 4.9,
            ratingCount: 89,
            stock: 1,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', 
            badge: 'حرفه‌ای' 
        }
    ];

    function formatPrice(price) {
        return price.toLocaleString('fa-IR');
    }

    // ساخت ستاره‌های امتیاز
    function createStars(rating) {
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += `
                    <svg class="marquee-card__star" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `;
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += `
                    <svg class="marquee-card__star" viewBox="0 0 24 24" fill="currentColor">
                        <defs>
                            <linearGradient id="halfStarBest${i}">
                                <stop offset="50%" stop-color="currentColor"/>
                                <stop offset="50%" stop-color="rgba(0,0,0,0.3)"/>
                            </linearGradient>
                        </defs>
                        <path fill="url(#halfStarBest${i})" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `;
            } else {
                starsHtml += `
                    <svg class="marquee-card__star empty" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `;
            }
        }
        
        return starsHtml;
    }

    function createProductCard(product) {
        const card = document.createElement('a');
        card.href = `#product-${product.id}`;
        card.className = 'marquee-card';
        card.dataset.productId = product.id;
        card.draggable = false;

        // Badge تخفیف
        const discountBadge = product.discount 
            ? `<div class="marquee-card__discount"><span>-${product.discount}٪</span></div>`
            : '';

        // Stock Badge
        const stockBadge = product.stock && product.stock <= 5
            ? `<div class="marquee-card__stock">فقط ${product.stock.toLocaleString('fa-IR')} عدد باقی‌مانده</div>`
            : '';

        // Rating Stars
        const ratingHtml = product.rating 
            ? `
                <div class="marquee-card__rating">
                    <div class="marquee-card__stars">
                        ${createStars(product.rating)}
                    </div>
                    <span class="marquee-card__rating-count">(${product.ratingCount.toLocaleString('fa-IR')})</span>
                </div>
            `
            : '';

        // قیمت‌ها (قدیم و جدید)
        const pricesHtml = product.oldPrice 
            ? `
                <div class="marquee-card__prices">
                    <span class="marquee-card__price-old">${formatPrice(product.oldPrice)}</span>
                    <span class="marquee-card__price-current">${formatPrice(product.price)}</span>
                    <span class="marquee-card__price-unit">تومان</span>
                </div>
            `
            : `
                <div class="marquee-card__price">
                    <span class="marquee-card__price-current">${formatPrice(product.price)}</span>
                    <span class="marquee-card__price-unit">تومان</span>
                </div>
            `;

        card.innerHTML = `
            <div class="marquee-card__image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="marquee-card__image" loading="lazy" draggable="false">
                <span class="marquee-card__badge">${product.badge}</span>
                ${discountBadge}
                <button class="marquee-card__wishlist" data-product-id="${product.id}">
                    <svg viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
                ${stockBadge}
            </div>
            <div class="marquee-card__info">
                <h3 class="marquee-card__name">${product.name}</h3>
                ${ratingHtml}
                ${pricesHtml}
            </div>
            <div class="marquee-card__actions">
                <button class="marquee-card__action-btn marquee-card__action-btn--view">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    مشاهده
                </button>
                <button class="marquee-card__action-btn marquee-card__action-btn--cart">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    سبد خرید
                </button>
            </div>
        `;

        return card;
    }

    const track = bestSellersSection.querySelector('.best-sellers-track');

    // رندر کارت‌ها (۲ بار)
    bestSellersData.forEach(product => {
        track.appendChild(createProductCard(product));
    });
    
    bestSellersData.forEach(product => {
        track.appendChild(createProductCard(product));
    });

    // ===== Wishlist Heart =====
    track.addEventListener('click', (e) => {
        const wishlistBtn = e.target.closest('.marquee-card__wishlist');
        if (wishlistBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            wishlistBtn.classList.toggle('active');
            
            const productId = wishlistBtn.dataset.productId;
            const isActive = wishlistBtn.classList.contains('active');
            
            console.log(`${isActive ? 'افزوده به' : 'حذف از'} علاقه‌مندی‌ها: ${productId}`);
        }
    });

    // ===== Quick Actions =====
    track.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.marquee-card__action-btn--view');
        if (viewBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = viewBtn.closest('.marquee-card');
            const productId = card.dataset.productId;
            
            console.log('مشاهده سریع محصول:', productId);
        }
        
        const cartBtn = e.target.closest('.marquee-card__action-btn--cart');
        if (cartBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = cartBtn.closest('.marquee-card');
            const productId = card.dataset.productId;
            
            console.log('افزودن به سبد خرید:', productId);
            
            // افکت بصری
            cartBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                cartBtn.style.transform = '';
            }, 200);
        }
    });

    // ===== جلوگیری از drag پیش‌فرض =====
    track.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // متغیرهای حرکت
    let position = 0;
    let isDragging = false;
    let startX = 0;
    let startPos = 0;
    let animationId;
    const autoSpeed = -0.8;

    function getTrackWidth() {
        return track.scrollWidth / 2;
    }

    // حلقه حرکت خودکار
    function animate() {
        if (!isDragging) {
            position += autoSpeed;
            
            if (Math.abs(position) >= getTrackWidth()) {
                position = 0;
            }
        }
        
        track.style.left = `${position}px`;
        animationId = requestAnimationFrame(animate);
    }

    animate();

    // ===== درگ با موس =====
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startPos = position;
        track.classList.add('dragging');
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const diff = e.clientX - startX;
        position = startPos + diff;
        
        const max = getTrackWidth();
        if (position > 0) position = 0;
        if (position < -max) position = -max;
        
        track.style.left = `${position}px`;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            track.classList.remove('dragging');
        }
    });

    // ===== Swipe با انگشت =====
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startPos = position;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const diff = e.touches[0].clientX - startX;
        position = startPos + diff;
        
        const max = getTrackWidth();
        if (position > 0) position = 0;
        if (position < -max) position = -max;
        
        track.style.left = `${position}px`;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        isDragging = false;
    });

    // ===== کلیک روی کارت =====
    track.addEventListener('click', (e) => {
        // اگر روی دکمه‌ها کلیک شده، کاری نکن
        if (e.target.closest('.marquee-card__wishlist') || 
            e.target.closest('.marquee-card__action-btn')) {
            return;
        }
        
        const card = e.target.closest('.marquee-card');
        if (!card) return;
        
        if (Math.abs(e.clientX - startX) > 5) {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const productId = card.dataset.productId;
        console.log('مشاهده محصول:', productId);
    });

    // ===== انیمیشن ورود =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(bestSellersSection);
}
// ==================== جدیدترین محصولات ====================
// ==================== جدیدترین محصولات ====================
const newArrivalsSection = document.querySelector('.new-arrivals');

if (newArrivalsSection) {
    const newArrivalsData = [
        { 
            id: 11, 
            name: 'آیفون ۱۶ پرو', 
            price: 85000000, 
            oldPrice: 95000000,
            discount: 11,
            rating: 4.8,
            ratingCount: 234,
            stock: 5,
            image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 12, 
            name: 'مک‌بوک ایر M3', 
            price: 95000000, 
            oldPrice: 110000000,
            discount: 14,
            rating: 4.9,
            ratingCount: 189,
            stock: 3,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 13, 
            name: 'گلکسی Z Fold 6', 
            price: 78000000, 
            oldPrice: 89000000,
            discount: 12,
            rating: 4.7,
            ratingCount: 156,
            stock: 2,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 14, 
            name: 'ایرپادز مکس', 
            price: 25000000, 
            oldPrice: 32000000,
            discount: 22,
            rating: 4.6,
            ratingCount: 312,
            stock: 8,
            image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 15, 
            name: 'اپل واچ Ultra 2', 
            price: 45000000, 
            oldPrice: 52000000,
            discount: 13,
            rating: 4.8,
            ratingCount: 278,
            stock: 4,
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 16, 
            name: 'آیپد ایر M2', 
            price: 42000000, 
            oldPrice: 48000000,
            discount: 13,
            rating: 4.7,
            ratingCount: 198,
            stock: 6,
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 17, 
            name: 'سونی PS5 Pro', 
            price: 38000000, 
            oldPrice: 45000000,
            discount: 16,
            rating: 4.9,
            ratingCount: 445,
            stock: 2,
            image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 18, 
            name: 'نینتندو Switch 2', 
            price: 22000000, 
            oldPrice: 28000000,
            discount: 21,
            rating: 4.5,
            ratingCount: 167,
            stock: 10,
            image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 19, 
            name: 'دوربین Sony A7 IV', 
            price: 110000000, 
            oldPrice: 125000000,
            discount: 12,
            rating: 4.9,
            ratingCount: 89,
            stock: 1,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        },
        { 
            id: 20, 
            name: 'ASUS ROG Strix', 
            price: 125000000, 
            oldPrice: 145000000,
            discount: 14,
            rating: 4.8,
            ratingCount: 134,
            stock: 3,
            image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop', 
            badge: 'جدید' 
        }
    ];

    function formatPrice(price) {
        return price.toLocaleString('fa-IR');
    }

    // ساخت ستاره‌های امتیاز
    function createStars(rating) {
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += `
                    <svg class="marquee-card__star" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `;
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += `
                    <svg class="marquee-card__star" viewBox="0 0 24 24" fill="currentColor">
                        <defs>
                            <linearGradient id="halfStar${i}">
                                <stop offset="50%" stop-color="currentColor"/>
                                <stop offset="50%" stop-color="rgba(0,0,0,0.3)"/>
                            </linearGradient>
                        </defs>
                        <path fill="url(#halfStar${i})" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `;
            } else {
                starsHtml += `
                    <svg class="marquee-card__star empty" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `;
            }
        }
        
        return starsHtml;
    }



    function createNewArrivalCard(product) {
    const card = document.createElement('a');
    card.href = `#product-${product.id}`;
    card.className = 'marquee-card';
    card.dataset.productId = product.id;
    card.draggable = false;

    // Badge تخفیف (اگر تخفیف داشته باشه)
    const discountBadge = product.discount 
        ? `<div class="marquee-card__discount"><span>-${product.discount}٪</span></div>`
        : '';

    // Stock Badge (اگر کمتر از ۵ عدد باقی‌مانده)
    const stockBadge = product.stock && product.stock <= 5
        ? `<div class="marquee-card__stock">فقط ${product.stock.toLocaleString('fa-IR')} عدد باقی‌مانده</div>`
        : '';

    // Rating Stars
    const ratingHtml = product.rating 
        ? `
            <div class="marquee-card__rating">
                <div class="marquee-card__stars">
                    ${createStars(product.rating)}
                </div>
                <span class="marquee-card__rating-count">(${product.ratingCount.toLocaleString('fa-IR')})</span>
            </div>
        `
        : '';

    // قیمت‌ها (قدیم و جدید)
    const pricesHtml = product.oldPrice 
        ? `
            <div class="marquee-card__prices">
                <span class="marquee-card__price-old">${formatPrice(product.oldPrice)}</span>
                <span class="marquee-card__price-current">${formatPrice(product.price)}</span>
                <span class="marquee-card__price-unit">تومان</span>
            </div>
        `
        : `
            <div class="marquee-card__price">
                <span class="marquee-card__price-current">${formatPrice(product.price)}</span>
                <span class="marquee-card__price-unit">تومان</span>
            </div>
        `;

    card.innerHTML = `
        <div class="marquee-card__image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="marquee-card__image" loading="lazy" draggable="false">
            <span class="marquee-card__badge">${product.badge}</span>
            ${discountBadge}
            <button class="marquee-card__wishlist" data-product-id="${product.id}">
                <svg viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            </button>
            ${stockBadge}
        </div>
        <div class="marquee-card__info">
            <h3 class="marquee-card__name">${product.name}</h3>
            ${ratingHtml}
            ${pricesHtml}
        </div>
        <div class="marquee-card__actions">
            <button class="marquee-card__action-btn marquee-card__action-btn--view">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
                مشاهده
            </button>
            <button class="marquee-card__action-btn marquee-card__action-btn--cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                سبد خرید
            </button>
        </div>
    `;

    return card;
}





    const track = newArrivalsSection.querySelector('.new-arrivals-track');

    // رندر کارت‌ها (۲ بار)
    newArrivalsData.forEach(product => {
        track.appendChild(createNewArrivalCard(product));
    });
    
    newArrivalsData.forEach(product => {
        track.appendChild(createNewArrivalCard(product));
    });

    // ===== Wishlist Heart =====
    track.addEventListener('click', (e) => {
        const wishlistBtn = e.target.closest('.marquee-card__wishlist');
        if (wishlistBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            wishlistBtn.classList.toggle('active');
            
            const productId = wishlistBtn.dataset.productId;
            const isActive = wishlistBtn.classList.contains('active');
            
            console.log(`${isActive ? 'افزوده به' : 'حذف از'} علاقه‌مندی‌ها: ${productId}`);
            
            // اینجا می‌تونی API call کنی یا localStorage رو آپدیت کنی
        }
    });

    // ===== Quick Actions =====
    track.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.marquee-card__action-btn--view');
        if (viewBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = viewBtn.closest('.marquee-card');
            const productId = card.dataset.productId;
            
            console.log('مشاهده سریع محصول:', productId);
            // اینجا می‌تونی modal باز کنی
        }
        
        const cartBtn = e.target.closest('.marquee-card__action-btn--cart');
        if (cartBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = cartBtn.closest('.marquee-card');
            const productId = card.dataset.productId;
            
            console.log('افزودن به سبد خرید:', productId);
            // اینجا می‌تونی سبد خرید رو آپدیت کنی
            
            // افکت بصری
            cartBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                cartBtn.style.transform = '';
            }, 200);
        }
    });

    // ===== جلوگیری از drag پیش‌فرض =====
    track.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // متغیرهای حرکت
    let position = 0;
    let isDragging = false;
    let startX = 0;
    let startPos = 0;
    let animationId;
    const autoSpeed = -0.8;

    function getTrackWidth() {
        return track.scrollWidth / 2;
    }

    // حلقه حرکت خودکار با left
    function animate() {
        if (!isDragging) {
            position += autoSpeed;
            
            if (Math.abs(position) >= getTrackWidth()) {
                position = 0;
            }
        }
        
        track.style.left = `${position}px`;
        animationId = requestAnimationFrame(animate);
    }

    animate();

    // ===== درگ با موس =====
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startPos = position;
        track.classList.add('dragging');
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const diff = e.clientX - startX;
        position = startPos + diff;
        
        const max = getTrackWidth();
        if (position > 0) position = 0;
        if (position < -max) position = -max;
        
        track.style.left = `${position}px`;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            track.classList.remove('dragging');
        }
    });

    // ===== Swipe با انگشت =====
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startPos = position;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const diff = e.touches[0].clientX - startX;
        position = startPos + diff;
        
        const max = getTrackWidth();
        if (position > 0) position = 0;
        if (position < -max) position = -max;
        
        track.style.left = `${position}px`;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        isDragging = false;
    });

    // ===== کلیک روی کارت =====
    track.addEventListener('click', (e) => {
        // اگر روی دکمه‌ها کلیک شده، کاری نکن
        if (e.target.closest('.marquee-card__wishlist') || 
            e.target.closest('.marquee-card__action-btn')) {
            return;
        }
        
        const card = e.target.closest('.marquee-card');
        if (!card) return;
        
        if (Math.abs(e.clientX - startX) > 5) {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const productId = card.dataset.productId;
        console.log('مشاهده محصول جدید:', productId);
    });

    // ===== انیمیشن ورود =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(newArrivalsSection);
}

// ==================== اسلایدر بنر ====================
//برند
// ==================== برندها - اسکرول افقی ====================
const brandsSection = document.querySelector('.brands');

if (brandsSection) {
    const container = brandsSection.querySelector('.brands__scroll-container');
    const prevBtn = brandsSection.querySelector('.brands__scroll-btn--prev');
    const nextBtn = brandsSection.querySelector('.brands__scroll-btn--next');

    // دکمه‌های ناوبری
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const cardWidth = 220;
            container.scrollBy({ left: -cardWidth, behavior: 'smooth' });بنر
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const cardWidth = 220;
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    }

    // Touch events برای موبایل
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const cardWidth = 220;
            if (diff > 0) {
                container.scrollBy({ left: cardWidth, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        }
    }

    // انیمیشن ورود
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(brandsSection);
}
// ==================== انیمیشن ورود برندها ====================

// دسته بندی


// FOOTER


// ==================== انیمیشن ورود دسته‌بندی‌ها ====================
const categoriesSection = document.querySelector('.categories');

if (categoriesSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(categoriesSection);
}


// ==================== اسلایدر بنر ====================







const bannerSlider = document.querySelector('.banner-slider');

if (bannerSlider) {
    const slides = bannerSlider.querySelectorAll('.slide');
    const dots = bannerSlider.querySelectorAll('.dot');
    const prevBtn = bannerSlider.querySelector('.slider-btn--prev');
    const nextBtn = bannerSlider.querySelector('.slider-btn--next');
    const progressBar = bannerSlider.querySelector('.slider-progress__bar');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    const autoPlayInterval = 5000; // 5 ثانیه
    
    let progressAnimationId = null;
    let progressStartTime = null;
    let elapsedBeforePause = 0;
    let isPaused = false;

    // مدیریت ویدیو در اسلاید اول
    const firstSlideVideo = slides[0].querySelector('.slide__video');

    // نمایش اسلاید مشخص
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // مدیریت ویدیو
        if (index === 0 && firstSlideVideo) {
            firstSlideVideo.currentTime = 0; // ریست ویدیو
            firstSlideVideo.play().catch(e => console.log('ویدیو پخش نشد:', e));
        } else if (firstSlideVideo) {
            firstSlideVideo.pause();
        }
        
        currentSlide = index;
    }

    // اسلاید بعدی
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
        restartAutoPlay();
    }

    // اسلاید قبلی
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
        restartAutoPlay();
    }

    // شروع progress bar
    function startProgress() {
        progressStartTime = Date.now();
        
        function animate() {
            if (isPaused) {
                progressAnimationId = requestAnimationFrame(animate);
                return;
            }
            
            const currentElapsed = Date.now() - progressStartTime;
            const totalElapsed = elapsedBeforePause + currentElapsed;
            const progress = (totalElapsed / autoPlayInterval) * 100;
            
            if (progress >= 100) {
                progressBar.style.width = '0%';
                elapsedBeforePause = 0;
                nextSlide();
            } else {
                progressBar.style.width = `${progress}%`;
                progressAnimationId = requestAnimationFrame(animate);
            }
        }
        
        progressAnimationId = requestAnimationFrame(animate);
    }

    // توقف progress bar
    function stopProgress() {
        if (progressAnimationId) {
            cancelAnimationFrame(progressAnimationId);
            progressAnimationId = null;
        }
    }

    // شروع auto-play
    function startAutoPlay() {
        isPaused = false;
        startProgress();
        
        // اگر در اسلاید اول هستیم، ویدیو رو پخش کن
        if (currentSlide === 0 && firstSlideVideo) {
            firstSlideVideo.play().catch(e => console.log('ویدیو پخش نشد:', e));
        }
    }

    // توقف auto-play (pause)
    function pauseAutoPlay() {
        if (!isPaused) {
            elapsedBeforePause += (Date.now() - progressStartTime);
            isPaused = true;
            stopProgress();
            
            // اگر در اسلاید اول هستیم، ویدیو رو pause کن
            if (currentSlide === 0 && firstSlideVideo) {
                firstSlideVideo.pause();
            }
        }
    }

    // ریست auto-play
    function restartAutoPlay() {
        stopProgress();
        elapsedBeforePause = 0;
        progressBar.style.width = '0%';
        startProgress();
    }

    // Event Listeners

    // دکمه قبلی
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }

    // دکمه بعدی
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }

    // کلیک روی dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            restartAutoPlay();
        });
    });

    // Pause on hover
    const sliderContainer = bannerSlider.querySelector('.slider-container');

    sliderContainer.addEventListener('mouseenter', () => {
        pauseAutoPlay();
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Swipe برای موبایل
    let touchStartX = 0;
    let touchEndX = 0;

    bannerSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoPlay();
    }, { passive: true });

    bannerSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // شروع auto-play
    startAutoPlay();
}


// شبکه اجتماعی


// ==================== شبکه‌های اجتماعی ====================
const socialSection = document.querySelector('.social-section');

if (socialSection) {
    // انیمیشن ورود با IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(socialSection);

    // جلوگیری از کلیک روی دکمه (چون داخل لینک هست)
    const socialButtons = socialSection.querySelectorAll('.social-card__btn');
    
    socialButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // پیدا کردن لینک والد
            const card = btn.closest('.social-card');
            if (card && card.href) {
                window.open(card.href, '_blank', 'noopener,noreferrer');
            }
        });
    });

    // افکت ripple روی دکمه‌ها
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}








  const isConnected = await testConnection();
  if (isConnected) console.log('🚀 Backend is ready');

  const htmlEl = document.documentElement;
  const header = document.getElementById('header');
  const glare = document.getElementById('glare');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const menuToggle = document.getElementById('menu-toggle');
  const searchToggle = document.getElementById('search-toggle');
  const notificationBtn = document.getElementById('notification-btn');
  
  const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  const sidebarItems = document.querySelectorAll('.sidebar-item:not(.theme-sidebar-item)');
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item:not(.theme-bottom-item)');

  // Glare
  if (header && glare) {
    header.addEventListener('mousemove', (e) => {
      const rect = header.getBoundingClientRect();
      glare.style.setProperty('--x', `${e.clientX - rect.left}px`);
      glare.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  }

  // ==================== تم ====================
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
  } else {
    htmlEl.setAttribute('data-theme', 'light');
  }

  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // ==================== منو و جستجو ====================
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      console.log('🍔 Menu clicked');
    });
  }

  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      console.log('🔍 Search toggle clicked');
    });
  }

  if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
      console.log('🔔 Notification clicked');
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) searchOnBackend(query);
    });
  }

  // ==================== Active State ====================
  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const label = item.querySelector('.sidebar-label')?.textContent;
      bottomNavItems.forEach(bItem => {
        const bLabel = bItem.querySelector('.bottom-nav-label')?.textContent;
        if (bLabel === label) {
          bottomNavItems.forEach(i => i.classList.remove('active'));
          bItem.classList.add('active');
        }
      });
    });
  });

  bottomNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      bottomNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const label = item.querySelector('.bottom-nav-label')?.textContent;
      sidebarItems.forEach(sItem => {
        const sLabel = sItem.querySelector('.sidebar-label')?.textContent;
        if (sLabel === label) {
          sidebarItems.forEach(i => i.classList.remove('active'));
          sItem.classList.add('active');
        }
      });
    });
  });

  function updateCartBadge(count) {
    const badges = document.querySelectorAll('.sidebar-badge, .bottom-nav-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.animation = 'none';
      badge.offsetHeight;
      badge.style.animation = 'badgeBounce 0.4s ease';
    });
  }
});






// ==================== انیمیشن ورود بنر هنگام اسکرول ====================
const bannerSlider = document.querySelector('.banner-slider');

if (bannerSlider) {
    // Intersection Observer برای تشخیص ورود به viewport
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% از عنصر دیده بشه
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // اضافه کردن کلاس انیمیشن
                entry.target.classList.add('is-visible');
                
                // بعد از نمایش، observer رو قطع کن (فقط یک بار اجرا بشه)
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(bannerSlider);
}