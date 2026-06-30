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




// ==================== اسلایدر بنر ====================






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