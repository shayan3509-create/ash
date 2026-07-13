console.log('🚀 فایل main.js شروع شد');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM آماده است');

    try {
        // ===== انیمیشن زنگوله =====
        console.log('🔔 شروع بخش زنگوله');
        const notificationBtn = document.querySelector('.notification-btn');
        console.log('🔔 notificationBtn:', notificationBtn);
        
        const notificationBadge = notificationBtn ? notificationBtn.querySelector('.badge') : null;
        console.log('🔔 notificationBadge:', notificationBadge);
        
        if (notificationBadge) {
            console.log('🔔 مقدار badge:', notificationBadge.textContent);
        }
        
        function shakeBell() {
            console.log('🔔 تابع shakeBell اجرا شد');
            
            if (!notificationBtn || !notificationBadge) {
                console.log('⚠️ notificationBtn یا badge وجود نداره');
                return;
            }
            
            const count = parseInt(notificationBadge.textContent);
            console.log('🔔 تعداد نوتیف:', count);
            
            if (count > 0) {
                console.log('🔔 شروع زنگ زدن');
                notificationBtn.classList.add('shake');
                
                setTimeout(function() {
                    notificationBtn.classList.remove('shake');
                    console.log('🔔 زنگ اول تموم شد');
                    
                    setTimeout(function() {
                        notificationBtn.classList.add('shake');
                        console.log('🔔 زنگ دوم شروع شد');
                        
                        setTimeout(function() {
                            notificationBtn.classList.remove('shake');
                            console.log('🔔 زنگ دوم تموم شد');
                        }, 600);
                    }, 400);
                }, 600);
            } else {
                console.log('⚠️ تعداد نوتیف صفره، زنگ نمی‌زنه');
            }
        }
        
        setTimeout(function() {
            console.log('⏰ ۲ ثانیه گذشت، زنگوله اول');
            shakeBell();
        }, 2000);
        
        setInterval(function() {
            console.log('⏰ هر ۲۰ ثانیه، زنگوله');
            shakeBell();
        }, 20000);
        
        console.log('✅ بخش زنگوله تموم شد');
        
    } catch (error) {
        console.error('❌ خطا در بخش زنگوله:', error);
    }
    
    try {
        // ===== انیمیشن slide سبد خرید =====
        console.log('🛒 شروع بخش سبد خرید');
        const cartBtn = document.querySelector('.cart-btn');
        console.log('🛒 cartBtn:', cartBtn);
        
        const cartBadge = cartBtn ? cartBtn.querySelector('.badge') : null;
        console.log('🛒 cartBadge:', cartBadge);
        
        if (cartBadge) {
            console.log('🛒 مقدار badge:', cartBadge.textContent);
        }
        
        function slideCart() {
            console.log('🛒 تابع slideCart اجرا شد');
            
            if (!cartBtn || !cartBadge) {
                console.log('⚠️ cartBtn یا badge وجود نداره');
                return;
            }
            
            const count = parseInt(cartBadge.textContent);
            console.log('🛒 تعداد محصول:', count);
            
            if (count > 0) {
                console.log('🛒 شروع slide');
                cartBtn.classList.add('slide');
                
                setTimeout(function() {
                    cartBtn.classList.remove('slide');
                    console.log('🛒 slide تموم شد');
                }, 1200);
            } else {
                console.log('⚠️ تعداد محصول صفره، slide نمی‌کنه');
            }
        }
        
        setTimeout(function() {
            console.log('⏰ ۳ ثانیه گذشت، سبد خرید اول');
            slideCart();
        }, 3000);
        
        setInterval(function() {
            console.log('⏰ هر ۱۵ ثانیه، سبد خرید');
            slideCart();
        }, 15000);
        
        console.log('✅ بخش سبد خرید تموم شد');
        
    } catch (error) {
        console.error('❌ خطا در بخش سبد خرید:', error);
    }
    
    try {
        // ===== مگا منو =====
        console.log('📂 شروع بخش مگا منو');
        const categoryMenu = document.querySelector('.category-menu');
        const categoryTrigger = document.querySelector('.category-trigger');
        const megaMenu = document.querySelector('.mega-menu');
        
        console.log('📂 categoryMenu:', categoryMenu);
        console.log('📂 categoryTrigger:', categoryTrigger);
        console.log('📂 megaMenu:', megaMenu);
        
        function openMegaMenu() {
            console.log('📂 باز کردن مگا منو');
            megaMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMegaMenu() {
            console.log('📂 بستن مگا منو');
            megaMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (categoryTrigger) {
            categoryTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📂 کلیک روی categoryTrigger');
                
                if (megaMenu.classList.contains('active')) {
                    closeMegaMenu();
                } else {
                    openMegaMenu();
                }
            });
        }
        
        document.addEventListener('click', function(e) {
            if (categoryMenu && !categoryMenu.contains(e.target)) {
                closeMegaMenu();
            }
        });
        
        if (megaMenu) {
            megaMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && megaMenu && megaMenu.classList.contains('active')) {
                closeMegaMenu();
            }
        });
        
        console.log('✅ بخش مگا منو تموم شد');
        
    } catch (error) {
        console.error('❌ خطا در بخش مگا منو:', error);
    }
    
    try {
        // ===== مدیریت سرچ موبایل =====
        console.log('🔍 شروع بخش سرچ');
        const mobileSearchBtn = document.querySelector('.mobile-search-btn');
        const headerCenter = document.querySelector('.header-center');
        const headerTop = document.querySelector('.header-top');
        const searchClose = document.querySelector('.search-close');
        const searchSubmit = document.querySelector('.search-submit');
        const searchInput = document.querySelector('.search-box input');
        
        console.log('🔍 mobileSearchBtn:', mobileSearchBtn);
        console.log('🔍 headerCenter:', headerCenter);
        console.log('🔍 headerTop:', headerTop);
        console.log('🔍 searchClose:', searchClose);
        console.log('🔍 searchSubmit:', searchSubmit);
        console.log('🔍 searchInput:', searchInput);
        
        if (mobileSearchBtn) {
            mobileSearchBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('🔍 باز کردن سرچ');
                headerCenter.classList.add('active');
                headerTop.classList.add('search-active');
                setTimeout(function() {
                    searchInput.focus();
                }, 400);
            });
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('🔍 بستن سرچ');
                headerCenter.classList.remove('active');
                headerTop.classList.remove('search-active');
                searchInput.blur();
                searchInput.value = '';
            });
        }
        
        if (searchSubmit) {
            searchSubmit.addEventListener('click', function(e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    console.log('🔍 جستجو برای:', query);
                }
            });
        }
        
        document.addEventListener('click', function(e) {
            if (headerCenter && !headerCenter.contains(e.target) && mobileSearchBtn && !mobileSearchBtn.contains(e.target)) {
                headerCenter.classList.remove('active');
                headerTop.classList.remove('search-active');
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && headerCenter && headerCenter.classList.contains('active')) {
                headerCenter.classList.remove('active');
                headerTop.classList.remove('search-active');
                searchInput.blur();
            }
            
            if (e.key === 'Enter' && headerCenter && headerCenter.classList.contains('active')) {
                const query = searchInput.value.trim();
                if (query) {
                    console.log('🔍 جستجو با Enter:', query);
                }
            }
        });
        
        console.log('✅ بخش سرچ تموم شد');
        
    } catch (error) {
        console.error('❌ خطا در بخش سرچ:', error);
    }
    
    try {
        // ===== دارک مود =====
        console.log('🌙 شروع بخش دارک مود');
        const themeBtn = document.querySelector('.theme-btn');
        console.log('🌙 themeBtn:', themeBtn);
        
        if (themeBtn) {
            themeBtn.addEventListener('click', function() {
                console.log('🌙 کلیک روی themeBtn');
                const isDark = document.documentElement.classList.toggle('dark-mode');
                
                if (isDark) {
                    localStorage.setItem('theme', 'dark');
                    console.log('🌙 دارک مود فعال شد');
                } else {
                    localStorage.setItem('theme', 'light');
                    console.log('☀️ لایت مود فعال شد');
                }
            });
        }
        
        console.log('✅ بخش دارک مود تموم شد');
        
    } catch (error) {
        console.error('❌ خطا در بخش دارک مود:', error);
    }
    
    try {
        // ===== افکت Sticky Header =====
        console.log('📌 شروع بخش Sticky Header');
        const header = document.querySelector('.main-header');
        console.log('📌 header:', header);
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            sessionStorage.setItem('lastScroll', currentScroll);
            
            if (currentScroll > 0) {
                document.documentElement.classList.add('scrolled');
                if (header) header.classList.add('scrolled');
            } else {
                document.documentElement.classList.remove('scrolled');
                if (header) header.classList.remove('scrolled');
            }
        });
        
        console.log('✅ بخش Sticky Header تموم شد');
        
    } catch (error) {
        console.error('❌ خطا در بخش Sticky Header:', error);
    }

    // =========================================
    // 🎠 بخش اسلایدر کاروسل 3D
    // =========================================



    // =========================================
    // 🎠 بخش اسلایدر کاروسل 3D (با دیباگ کامل)
    // =========================================









    // =========================================
    // 🎠 بخش اسلایدر کاروسل 3D (اصلاح شده)
    // =========================================
    try {
        console.log('🎠 ========================================');
        console.log('🎠 شروع بخش اسلایدر کاروسل');
        console.log('🎠 ========================================');
        
        // ===== انتخاب المان‌ها =====
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        const carouselDotsContainer = document.getElementById('carouselDots');
        const carouselBtnPrev = document.getElementById('btnPrev');
        const carouselBtnNext = document.getElementById('btnNext');
        const carouselContainer = document.getElementById('carouselContainer');
        
        console.log('🎠 تعداد اسلایدها:', carouselSlides.length);
        
        if (!carouselContainer || carouselSlides.length === 0) {
            console.warn('🎠 ⚠️ اسلایدر در این صفحه وجود ندارد');
            throw new Error('Carousel not found');
        }
        
        // ===== متغیرهای وضعیت =====
        let carouselIndex = 0;
        const carouselTotal = carouselSlides.length;
        let carouselAutoplay;
        let carouselAnimating = false;
        let carouselDragging = false;
        let carouselStartX = 0;
        let carouselCurrentX = 0;
        
        // ===== ساخت نقطه‌ها =====
        function createCarouselDots() {
            if (!carouselDotsContainer) return;
            carouselDotsContainer.innerHTML = '';
            for (let i = 0; i < carouselTotal; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('🎠 🔵 کلیک روی نقطه:', i);
                    goToCarouselSlide(i);
                    resetCarouselAutoplay();
                });
                carouselDotsContainer.appendChild(dot);
            }
            console.log('🎠 ✅ نقاط ساخته شدند:', carouselTotal);
        }
        
        // ===== به‌روزرسانی موقعیت اسلایدها =====
        // 🔧 اصلاح: چک carouselAnimating حذف شد تا همیشه اجرا شود
        function updateCarousel() {
            console.log('🎠 🔄 updateCarousel - ایندکس:', carouselIndex);
            
            carouselSlides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
                
                let diff = index - carouselIndex;
                
                // مدیریت لوپ بی‌نهایت
                if (diff > carouselTotal / 2) diff -= carouselTotal;
                if (diff < -carouselTotal / 2) diff += carouselTotal;
                
                if (diff === 0) {
                    slide.classList.add('active');
                } else if (diff === 1) {
                    slide.classList.add('next');
                } else if (diff === -1) {
                    slide.classList.add('prev');
                } else if (diff === 2) {
                    slide.classList.add('far-next');
                } else if (diff === -2) {
                    slide.classList.add('far-prev');
                }
            });
            
            // به‌روزرسانی نقطه‌ها
            if (carouselDotsContainer) {
                const dots = carouselDotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === carouselIndex);
                });
            }
        }
        
        // ===== توابع ناوبری =====
        // 🔧 اصلاح: اول updateCarousel صدا زده می‌شود، بعد قفل فعال می‌شود
        function nextCarouselSlide() {
            if (carouselAnimating) {
                console.log('🎠 ⚠️ در حال انیمیشن، لغو شد');
                return;
            }
            
            carouselAnimating = true;
            const oldIndex = carouselIndex;
            carouselIndex = (carouselIndex + 1) % carouselTotal;
            console.log('🎠 ➡️ ایندکس:', oldIndex, '→', carouselIndex);
            
            updateCarousel();
            
            setTimeout(function() { 
                carouselAnimating = false; 
            }, 600);
        }
        
        function prevCarouselSlide() {
            if (carouselAnimating) {
                console.log('🎠 ⚠️ در حال انیمیشن، لغو شد');
                return;
            }
            
            carouselAnimating = true;
            const oldIndex = carouselIndex;
            carouselIndex = (carouselIndex - 1 + carouselTotal) % carouselTotal;
            console.log('🎠 ⬅️ ایندکس:', oldIndex, '→', carouselIndex);
            
            updateCarousel();
            
            setTimeout(function() { 
                carouselAnimating = false; 
            }, 600);
        }
        
        function goToCarouselSlide(index) {
            if (carouselAnimating) {
                console.log('🎠 ⚠️ در حال انیمیشن، لغو شد');
                return;
            }
            
            carouselAnimating = true;
            const oldIndex = carouselIndex;
            carouselIndex = index;
            console.log('🎠 🎯 ایندکس:', oldIndex, '→', carouselIndex);
            
            updateCarousel();
            
            setTimeout(function() { 
                carouselAnimating = false; 
            }, 600);
        }
        
        // ===== اتوپلی =====
        function startCarouselAutoplay() {
            stopCarouselAutoplay();
            carouselAutoplay = setInterval(function() {
                console.log('🎠 ⏰ اتوپلی');
                nextCarouselSlide();
            }, 20000);
            console.log('🎠 ✅ اتوپلی شروع شد');
        }
        
        function stopCarouselAutoplay() {
            clearInterval(carouselAutoplay);
        }
        
        function resetCarouselAutoplay() {
            stopCarouselAutoplay();
            startCarouselAutoplay();
        }
        
        // ===== رویدادهای دکمه‌ها =====
        if (carouselBtnNext) {
            carouselBtnNext.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎠 🔵 کلیک روی btnNext');
                nextCarouselSlide();
                resetCarouselAutoplay();
            });
            console.log('🎠 ✅ رویداد btnNext متصل شد');
        }
        
        if (carouselBtnPrev) {
            carouselBtnPrev.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎠 🔵 کلیک روی btnPrev');
                prevCarouselSlide();
                resetCarouselAutoplay();
            });
            console.log('🎠 ✅ رویداد btnPrev متصل شد');
        }
        
        // ===== درگ و سوایپ =====
        // 🔧 اصلاح: استفاده از mousemove روی container به جای window
        function carouselDragStart(e) {
            if (carouselAnimating) return;
            carouselDragging = true;
            carouselStartX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            carouselCurrentX = carouselStartX;
            console.log('🎠 👆 درگ شروع - X:', carouselStartX);
        }
        
        function carouselDragMove(e) {
            if (!carouselDragging) return;
            carouselCurrentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            console.log('🎠 👆 درگ حرکت - X:', carouselCurrentX);
        }
        
        function carouselDragEnd() {
            if (!carouselDragging) return;
            carouselDragging = false;
            
            const diff = carouselStartX - carouselCurrentX;
            const threshold = 50;
            
            console.log('🎠 👆 درگ پایان - اختلاف:', diff);
            
            if (diff > threshold) {
                nextCarouselSlide();
                resetCarouselAutoplay();
            } else if (diff < -threshold) {
                prevCarouselSlide();
                resetCarouselAutoplay();
            }
        }
        
        // 🔧 اصلاح: همه رویدادهای موس روی container
        carouselContainer.addEventListener('mousedown', carouselDragStart);
        carouselContainer.addEventListener('mousemove', carouselDragMove);
        carouselContainer.addEventListener('mouseup', carouselDragEnd);
        carouselContainer.addEventListener('mouseleave', function() {
            if (carouselDragging) carouselDragEnd();
        });
        
        // رویدادهای تاچ
        carouselContainer.addEventListener('touchstart', carouselDragStart, { passive: true });
        carouselContainer.addEventListener('touchmove', carouselDragMove, { passive: true });
        carouselContainer.addEventListener('touchend', carouselDragEnd);
        
        // جلوگیری از درگ و راست‌کلیک
        carouselSlides.forEach(function(slide) {
            slide.addEventListener('dragstart', function(e) { e.preventDefault(); });
            slide.addEventListener('contextmenu', function(e) { e.preventDefault(); });
        });
        
        // ===== اجرای اولیه =====
        createCarouselDots();
        updateCarousel();
        startCarouselAutoplay();
        
        console.log('🎠 ✅ بخش اسلایدر با موفقیت اجرا شد');
        
    } catch (error) {
        console.error('🎠 ❌ خطا در اسلایدر:', error);
    }



















    console.log('🎉 کل فایل main.js با موفقیت اجرا شد!');
});