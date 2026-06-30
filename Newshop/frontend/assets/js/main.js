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
const bestSellersSection = document.querySelector('.best-sellers');

if (bestSellersSection) {
    const bestSellersData = [
        {
            id: 1,
            name: 'آیفون ۱۵ پرو مکس',
            price: 75000000,
            oldPrice: 82000000,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
            badge: 'پرفروش'
        },
        {
            id: 2,
            name: 'مک‌بوک پرو M3',
            price: 120000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 3,
            name: 'گلکسی S24 Ultra',
            price: 65000000,
            oldPrice: 70000000,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
            badge: 'تخفیف'
        },
        {
            id: 4,
            name: 'ایرپادز پرو ۲',
            price: 12000000,
            oldPrice: 14000000,
            image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
            badge: 'ویژه'
        },
        {
            id: 5,
            name: 'اپل واچ سری ۹',
            price: 28000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
            badge: 'محبوب'
        },
        {
            id: 6,
            name: 'آیپد پرو M2',
            price: 55000000,
            oldPrice: 60000000,
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
            badge: 'پرفروش'
        },
        {
            id: 7,
            name: 'سونی WH-1000XM5',
            price: 18000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 8,
            name: 'سامسونگ Galaxy Buds',
            price: 8500000,
            oldPrice: 9500000,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
            badge: 'تخفیف'
        },
        {
            id: 9,
            name: 'لنوو Legion 5',
            price: 85000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
            badge: 'گیمینگ'
        },
        {
            id: 10,
            name: 'دوربین Canon EOS R6',
            price: 95000000,
            oldPrice: 105000000,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
            badge: 'حرفه‌ای'
        }
    ];

    function formatPrice(price) {
        return price.toLocaleString('fa-IR');
    }

    function createProductCard(product) {
        const card = document.createElement('a');
        card.href = `#product-${product.id}`;
        card.className = 'marquee-card';
        card.dataset.productId = product.id;

        const oldPriceHtml = product.oldPrice 
            ? `<span class="marquee-card__price-old">${formatPrice(product.oldPrice)}</span>`
            : '';

        card.innerHTML = `
            <div class="marquee-card__image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="marquee-card__image" loading="lazy">
                <span class="marquee-card__badge">${product.badge}</span>
            </div>
            <div class="marquee-card__info">
                <h3 class="marquee-card__name">${product.name}</h3>
                <div class="marquee-card__price">
                    <span class="marquee-card__price-current">${formatPrice(product.price)}</span>
                    ${oldPriceHtml}
                    <span class="marquee-card__price-unit">تومان</span>
                </div>
            </div>
        `;

        return card;
    }

    const marqueeTrack = bestSellersSection.querySelector('.marquee-track');

    // رندر کارت‌ها (۲ بار برای infinite loop)
    bestSellersData.forEach(product => {
        marqueeTrack.appendChild(createProductCard(product));
    });
    
    bestSellersData.forEach(product => {
        marqueeTrack.appendChild(createProductCard(product));
    });

    // کلیک روی کارت
    marqueeTrack.addEventListener('click', (e) => {
        const card = e.target.closest('.marquee-card');
        if (card) {
            e.preventDefault();
            const productId = card.dataset.productId;
            console.log('مشاهده محصول:', productId);
        }
    });

    // انیمیشن ورود
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





// جدیدترین

// ==================== جدیدترین محصولات ====================
const newArrivalsSection = document.querySelector('.new-arrivals');

if (newArrivalsSection) {
    const newArrivalsData = [
        {
            id: 11,
            name: 'آیفون ۱۶ پرو',
            price: 85000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 12,
            name: 'مک‌بوک ایر M3',
            price: 95000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 13,
            name: 'گلکسی Z Fold 6',
            price: 78000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 14,
            name: 'ایرپادز مکس',
            price: 25000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 15,
            name: 'اپل واچ Ultra 2',
            price: 45000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 16,
            name: 'آیپد ایر M2',
            price: 42000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 17,
            name: 'سونی PS5 Pro',
            price: 38000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 18,
            name: 'نینتندو Switch 2',
            price: 22000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 19,
            name: 'دوربین Sony A7 IV',
            price: 110000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
            badge: 'جدید'
        },
        {
            id: 20,
            name: 'ASUS ROG Strix',
            price: 125000000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
            badge: 'جدید'
        }
    ];

    function formatPrice(price) {
        return price.toLocaleString('fa-IR');
    }

    function createNewArrivalCard(product) {
        const card = document.createElement('a');
        card.href = `#product-${product.id}`;
        card.className = 'marquee-card';
        card.dataset.productId = product.id;

        card.innerHTML = `
            <div class="marquee-card__image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="marquee-card__image" loading="lazy">
                <span class="marquee-card__badge">${product.badge}</span>
            </div>
            <div class="marquee-card__info">
                <h3 class="marquee-card__name">${product.name}</h3>
                <div class="marquee-card__price">
                    <span class="marquee-card__price-current">${formatPrice(product.price)}</span>
                    <span class="marquee-card__price-unit">تومان</span>
                </div>
            </div>
        `;

        return card;
    }

    const newArrivalsTrack = newArrivalsSection.querySelector('.new-arrivals-track');

    // رندر کارت‌ها (۲ بار)
    newArrivalsData.forEach(product => {
        newArrivalsTrack.appendChild(createNewArrivalCard(product));
    });
    
    newArrivalsData.forEach(product => {
        newArrivalsTrack.appendChild(createNewArrivalCard(product));
    });

    // کلیک روی کارت
    newArrivalsTrack.addEventListener('click', (e) => {
        const card = e.target.closest('.marquee-card');
        if (card) {
            e.preventDefault();
            const productId = card.dataset.productId;
            console.log('مشاهده محصول جدید:', productId);
        }
    });

    // انیمیشن ورود
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
            container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
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
    
    let autoPlayTimer = null;
    let progressAnimationId = null;
    let progressStartTime = null;
    let isPaused = false;

    // نمایش اسلاید مشخص
    function showSlide(index) {
        // حذف active از همه
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // اضافه کردن active به اسلاید فعلی
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
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

    // شروع progress bar با requestAnimationFrame
    function startProgress() {
        progressStartTime = Date.now();
        
        function animate() {
            if (isPaused) {
                progressAnimationId = requestAnimationFrame(animate);
                return;
            }
            
            const elapsed = Date.now() - progressStartTime;
            const progress = (elapsed / autoPlayInterval) * 100;
            
            if (progress >= 100) {
                progressBar.style.width = '0%';
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
        stopProgress();
        startProgress();
    }

    // توقف auto-play
    function stopAutoPlay() {
        isPaused = true;
        stopProgress();
    }

    // ریست auto-play (برای دکمه‌ها)
    function restartAutoPlay() {
        stopProgress();
        progressStartTime = Date.now();
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






    // Pause on hover (فقط روی خود بنر)
const sliderContainer = bannerSlider.querySelector('.slider-container');

sliderContainer.addEventListener('mouseenter', () => {
    stopAutoPlay();
});

sliderContainer.addEventListener('mouseleave', () => {
    startAutoPlay();
});





    // Swipe برای موبایل
    let touchStartX = 0;
    let touchEndX = 0;

    bannerSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
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