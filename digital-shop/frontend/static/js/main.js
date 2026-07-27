console.log('🚀 فایل main.js شروع شد');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM آماده است');

    // =========================================
    // 1. 🎯 بخش نیو تایم (Drag + دکمه‌ها + تایمرها + لایک)
    // =========================================
    try {
        console.log('🎯 شروع بخش نیو تایم');
        
        const ntWrapper = document.getElementById('ntCarouselWrapper');
        const ntPrevBtn = document.querySelector('.nt-carousel__btn--prev');
        const ntNextBtn = document.querySelector('.nt-carousel__btn--next');
        const ntCards = document.querySelectorAll('.nt-card');
        
        if (ntWrapper) {
            let ntIsDown = false;
            let ntStartX;
            let ntScrollLeft;
            let ntHasDragged = false;
            
            // ✅ شروع کشیدن با موس - با بررسی هدف کلیک
            ntWrapper.addEventListener('mousedown', function(e) {
                // اگر روی دکمه لایک یا مشاهده سریع کلیک شده، درگ شروع نشود
                if (e.target.closest('.nt-card__icon-btn')) {
                    return;
                }
                
                e.preventDefault();
                ntIsDown = true;
                ntHasDragged = false;
                ntWrapper.classList.add('is-dragging');
                ntStartX = e.pageX - ntWrapper.offsetLeft;
                ntScrollLeft = ntWrapper.scrollLeft;
            });
            
            // خروج موس از wrapper
            ntWrapper.addEventListener('mouseleave', function() {
                if (ntIsDown) { 
                    ntIsDown = false; 
                    ntWrapper.classList.remove('is-dragging'); 
                }
            });
            
            // رها کردن موس
            ntWrapper.addEventListener('mouseup', function() {
                ntIsDown = false;
                ntWrapper.classList.remove('is-dragging');
                if (ntHasDragged) { 
                    setTimeout(function() { ntHasDragged = false; }, 100); 
                }
            });
            
            // حرکت موس هنگام کشیدن
            ntWrapper.addEventListener('mousemove', function(e) {
                if (!ntIsDown) return;
                e.preventDefault();
                const x = e.pageX - ntWrapper.offsetLeft;
                const walk = (x - ntStartX) * 1.5;
                if (Math.abs(walk) > 5) ntHasDragged = true;
                ntWrapper.scrollLeft = ntScrollLeft - walk;
            });
            
            // پشتیبانی از تاچ موبایل
            let ntTouchStartX = 0, ntTouchScrollLeft = 0;
            ntWrapper.addEventListener('touchstart', function(e) {
                ntTouchStartX = e.touches[0].clientX;
                ntTouchScrollLeft = ntWrapper.scrollLeft;
            }, { passive: true });
            
            ntWrapper.addEventListener('touchmove', function(e) {
                const touchX = e.touches[0].clientX;
                const walk = (ntTouchStartX - touchX) * 1.2;
                ntWrapper.scrollLeft = ntTouchScrollLeft + walk;
            }, { passive: true });
            
            // دکمه‌های قبلی و بعدی (اصلاح شده برای RTL)
            const scrollAmount = 300;
            if (ntPrevBtn) {
                ntPrevBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    ntWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
            }
            if (ntNextBtn) {
                ntNextBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    ntWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
            }
            
            // ==========================================
            // ⏰ 1. تایمر اصلی هدر (روز، ساعت، دقیقه، ثانیه)
            // ==========================================
            const timeBoxes = document.querySelectorAll('.nt-countdown__box .nt-countdown__number');
            if (timeBoxes.length === 4) {
                setInterval(function() {
                    let s = parseInt(timeBoxes[3].textContent);
                    let m = parseInt(timeBoxes[2].textContent);
                    let h = parseInt(timeBoxes[1].textContent);
                    let d = parseInt(timeBoxes[0].textContent);

                    if (s > 0) s--;
                    else {
                        s = 59;
                        if (m > 0) m--;
                        else {
                            m = 59;
                            if (h > 0) h--;
                            else {
                                h = 23;
                                if (d > 0) d--;
                                else return;
                            }
                        }
                    }
                    timeBoxes[3].textContent = s.toString().padStart(2, '0');
                    timeBoxes[2].textContent = m.toString().padStart(2, '0');
                    timeBoxes[1].textContent = h.toString().padStart(2, '0');
                    timeBoxes[0].textContent = d.toString().padStart(2, '0');
                }, 1000);
            }

            // ==========================================
            // ⏰ 2. تایمرهای داخل کارت‌های محصول
            // ==========================================
            const cardTimers = document.querySelectorAll('.nt-card__timer-value');
            cardTimers.forEach(function(timerEl) {
                let timeStr = timerEl.textContent.trim();
                let parts = timeStr.split(':');
                if (parts.length === 3) {
                    let totalSeconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
                    
                    setInterval(function() {
                        if (totalSeconds > 0) {
                            totalSeconds--;
                            let h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
                            let m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
                            let s = (totalSeconds % 60).toString().padStart(2, '0');
                            timerEl.textContent = h + ':' + m + ':' + s;
                        }
                    }, 1000);
                }
            });

            // ==========================================
            // ❤️ 3. دکمه لایک - نسخه نهایی و قطعی
            // ==========================================
            const wishlistBtns = document.querySelectorAll('.nt-card__icon-btn--wishlist');
            console.log('❤️ تعداد دکمه‌های لایک:', wishlistBtns.length);
            
            wishlistBtns.forEach(function(btn, index) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    const svg = this.querySelector('svg');
                    const isLiked = this.classList.toggle('is-liked');
                    
                    console.log('❤️ کلیک روی لایک شماره', index, '- وضعیت:', isLiked);
                    
                    if (svg) {
                        if (isLiked) {
                            // ✅ اعمال استایل با !important (هیچ CSS نمی‌تواند override کند)
                            svg.style.setProperty('fill', '#F72585', 'important');
                            svg.style.setProperty('stroke', '#F72585', 'important');
                            console.log('✅ قلب قرمز شد (با !important)');
                        } else {
                            // ❌ بازگشت به حالت خالی
                            svg.style.removeProperty('fill');
                            svg.style.removeProperty('stroke');
                            console.log('❌ قلب خالی شد');
                        }
                    } else {
                        console.error('❌ SVG پیدا نشد!');
                    }
                });
            });
            
            console.log('❤️ ✅ بخش لایک با موفقیت اجرا شد');

            // جلوگیری از کپی و درگ تصاویر
            const ntImages = ntWrapper.querySelectorAll('.nt-card__image');
            ntImages.forEach(function(img) {
                img.addEventListener('dragstart', function(e) { e.preventDefault(); });
                img.addEventListener('contextmenu', function(e) { e.preventDefault(); });
            });
            ntWrapper.addEventListener('contextmenu', function(e) { e.preventDefault(); });
            
            // جلوگیری از کلیک روی کارت هنگام درگ
            ntCards.forEach(function(card) {
                card.addEventListener('click', function(e) {
                    if (ntHasDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            });
            
            // پشتیبانی از کلیدهای جهت‌دار
            ntWrapper.setAttribute('tabindex', '0');
            ntWrapper.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') ntWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                else if (e.key === 'ArrowRight') ntWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
            
            console.log('🎯 ✅ بخش نیو تایم با موفقیت اجرا شد');
        }
    } catch (error) {
        console.error('🎯 ❌ خطا در بخش نیو تایم:', error);
    }

    // =========================================
    // 2. 🔔 انیمیشن زنگوله
    // =========================================
    try {
        const notificationBtn = document.querySelector('.notification-btn');
        const notificationBadge = notificationBtn ? notificationBtn.querySelector('.badge') : null;
        
        function shakeBell() {
            if (!notificationBtn || !notificationBadge) return;
            const count = parseInt(notificationBadge.textContent);
            if (count > 0) {
                notificationBtn.classList.add('shake');
                setTimeout(function() {
                    notificationBtn.classList.remove('shake');
                    setTimeout(function() {
                        notificationBtn.classList.add('shake');
                        setTimeout(function() { 
                            notificationBtn.classList.remove('shake'); 
                        }, 600);
                    }, 400);
                }, 600);
            }
        }
        setTimeout(function() { shakeBell(); }, 2000);
        setInterval(function() { shakeBell(); }, 20000);
    } catch (error) { 
        console.error('❌ خطا در بخش زنگوله:', error); 
    }
    
    // =========================================
    // 3. 🛒 انیمیشن slide سبد خرید
    // =========================================
    try {
        const cartBtn = document.querySelector('.cart-btn');
        const cartBadge = cartBtn ? cartBtn.querySelector('.badge') : null;
        
        function slideCart() {
            if (!cartBtn || !cartBadge) return;
            if (parseInt(cartBadge.textContent) > 0) {
                cartBtn.classList.add('slide');
                setTimeout(function() { 
                    cartBtn.classList.remove('slide'); 
                }, 1200);
            }
        }
        setTimeout(function() { slideCart(); }, 3000);
        setInterval(function() { slideCart(); }, 15000);
    } catch (error) { 
        console.error('❌ خطا در بخش سبد خرید:', error); 
    }
    
    // =========================================
    // 4. 📂 مگا منو
    // =========================================
    try {
        const categoryMenu = document.querySelector('.category-menu');
        const categoryTrigger = document.querySelector('.category-trigger');
        const megaMenu = document.querySelector('.mega-menu');
        
        function openMegaMenu() { 
            if (megaMenu) { 
                megaMenu.classList.add('active'); 
                document.body.style.overflow = 'hidden'; 
            } 
        }
        function closeMegaMenu() { 
            if (megaMenu) { 
                megaMenu.classList.remove('active'); 
                document.body.style.overflow = ''; 
            } 
        }
        
        if (categoryTrigger) {
            categoryTrigger.addEventListener('click', function(e) {
                e.preventDefault(); 
                e.stopPropagation();
                if (megaMenu && megaMenu.classList.contains('active')) closeMegaMenu();
                else openMegaMenu();
            });
        }
        document.addEventListener('click', function(e) { 
            if (categoryMenu && !categoryMenu.contains(e.target)) closeMegaMenu(); 
        });
        if (megaMenu) megaMenu.addEventListener('click', function(e) { e.stopPropagation(); });
        document.addEventListener('keydown', function(e) { 
            if (e.key === 'Escape' && megaMenu && megaMenu.classList.contains('active')) closeMegaMenu(); 
        });
    } catch (error) { 
        console.error('❌ خطا در بخش مگا منو:', error); 
    }
    
    // =========================================
    // 5. 🔍 مدیریت سرچ موبایل
    // =========================================
    try {
        const mobileSearchBtn = document.querySelector('.mobile-search-btn');
        const headerCenter = document.querySelector('.header-center');
        const headerTop = document.querySelector('.header-top');
        const searchClose = document.querySelector('.search-close');
        const searchInput = document.querySelector('.search-box input');
        
        if (mobileSearchBtn) {
            mobileSearchBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (headerCenter) headerCenter.classList.add('active');
                if (headerTop) headerTop.classList.add('search-active');
                setTimeout(function() { 
                    if (searchInput) searchInput.focus(); 
                }, 400);
            });
        }
        if (searchClose) {
            searchClose.addEventListener('click', function(e) {
                e.stopPropagation();
                if (headerCenter) headerCenter.classList.remove('active');
                if (headerTop) headerTop.classList.remove('search-active');
                if (searchInput) { 
                    searchInput.blur(); 
                    searchInput.value = ''; 
                }
            });
        }
        document.addEventListener('click', function(e) {
            if (headerCenter && !headerCenter.contains(e.target) && mobileSearchBtn && !mobileSearchBtn.contains(e.target)) {
                if (headerCenter) headerCenter.classList.remove('active');
                if (headerTop) headerTop.classList.remove('search-active');
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && headerCenter && headerCenter.classList.contains('active')) {
                if (headerCenter) headerCenter.classList.remove('active');
                if (headerTop) headerTop.classList.remove('search-active');
                if (searchInput) searchInput.blur();
            }
        });
    } catch (error) { 
        console.error('❌ خطا در بخش سرچ:', error); 
    }
    
    // =========================================
    // 6. 🌙 دارک مود
    // =========================================
    try {
        const themeBtn = document.querySelector('.theme-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', function() {
                const isDark = document.documentElement.classList.toggle('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }
    } catch (error) { 
        console.error('❌ خطا در بخش دارک مود:', error); 
    }
    
    // =========================================
    // 7. 📌 افکت Sticky Header
    // =========================================
    try {
        const header = document.querySelector('.main-header');
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
    } catch (error) { 
        console.error('❌ خطا در بخش Sticky Header:', error); 
    }

    // =========================================
    // 8. 🎠 اسلایدر کاروسل 3D (3 نوع کارت)
    // =========================================
    try {
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        const carouselDotsContainer = document.getElementById('carouselDots');
        const carouselBtnPrev = document.getElementById('btnPrev');
        const carouselBtnNext = document.getElementById('btnNext');
        const carouselContainer = document.getElementById('carouselContainer');
        
        if (carouselContainer && carouselSlides.length > 0) {
            let carouselIndex = 0;
            const carouselTotal = carouselSlides.length;
            let carouselAutoplay, carouselAnimating = false, carouselDragging = false, carouselStartX = 0, carouselCurrentX = 0;
            
            function createCarouselDots() {
                if (!carouselDotsContainer) return;
                carouselDotsContainer.innerHTML = '';
                for (let i = 0; i < carouselTotal; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', function(e) {
                        e.preventDefault(); 
                        e.stopPropagation();
                        goToCarouselSlide(i); 
                        resetCarouselAutoplay();
                    });
                    carouselDotsContainer.appendChild(dot);
                }
            }
            
            function updateCarousel() {
                carouselSlides.forEach((slide, index) => {
                    slide.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
                    let diff = index - carouselIndex;
                    if (diff > carouselTotal / 2) diff -= carouselTotal;
                    if (diff < -carouselTotal / 2) diff += carouselTotal;
                    if (diff === 0) slide.classList.add('active');
                    else if (diff === 1) slide.classList.add('next');
                    else if (diff === -1) slide.classList.add('prev');
                    else if (diff === 2) slide.classList.add('far-next');
                    else if (diff === -2) slide.classList.add('far-prev');
                });
                if (carouselDotsContainer) {
                    const dots = carouselDotsContainer.querySelectorAll('.dot');
                    dots.forEach((dot, index) => { 
                        dot.classList.toggle('active', index === carouselIndex); 
                    });
                }
            }
            
            function nextCarouselSlide() {
                if (carouselAnimating) return;
                carouselAnimating = true;
                carouselIndex = (carouselIndex + 1) % carouselTotal;
                updateCarousel();
                setTimeout(function() { carouselAnimating = false; }, 600);
            }
            function prevCarouselSlide() {
                if (carouselAnimating) return;
                carouselAnimating = true;
                carouselIndex = (carouselIndex - 1 + carouselTotal) % carouselTotal;
                updateCarousel();
                setTimeout(function() { carouselAnimating = false; }, 600);
            }
            function goToCarouselSlide(index) {
                if (carouselAnimating) return;
                carouselAnimating = true;
                carouselIndex = index;
                updateCarousel();
                setTimeout(function() { carouselAnimating = false; }, 600);
            }
            function startCarouselAutoplay() {
                stopCarouselAutoplay();
                carouselAutoplay = setInterval(function() { 
                    nextCarouselSlide(); 
                }, 20000);
            }
            function stopCarouselAutoplay() { 
                clearInterval(carouselAutoplay); 
            }
            function resetCarouselAutoplay() { 
                stopCarouselAutoplay(); 
                startCarouselAutoplay(); 
            }
            
            if (carouselBtnNext) {
                carouselBtnNext.addEventListener('click', function(e) {
                    e.preventDefault(); 
                    e.stopPropagation();
                    nextCarouselSlide(); 
                    resetCarouselAutoplay();
                });
            }
            if (carouselBtnPrev) {
                carouselBtnPrev.addEventListener('click', function(e) {
                    e.preventDefault(); 
                    e.stopPropagation();
                    prevCarouselSlide(); 
                    resetCarouselAutoplay();
                });
            }
            
            // مدیریت کلیک روی کارت‌ها (3 نوع رفتار)
            carouselSlides.forEach(function(slide) {
                slide.addEventListener('click', function(e) {
                    let cardType = 'product';
                    if (slide.classList.contains('card-coupon')) cardType = 'coupon';
                    else if (slide.classList.contains('card-ad')) cardType = 'ad';
                    
                    if (cardType === 'coupon') {
                        e.preventDefault(); 
                        e.stopPropagation();
                        const code = slide.getAttribute('data-code');
                        if (code) {
                            navigator.clipboard.writeText(code).then(function() {
                                slide.classList.add('copied');
                                const subtitle = slide.querySelector('.slide-subtitle');
                                if (subtitle) {
                                    const originalText = subtitle.textContent;
                                    subtitle.textContent = '✓ کد کپی شد!';
                                    setTimeout(function() { 
                                        subtitle.textContent = originalText; 
                                        slide.classList.remove('copied'); 
                                    }, 2000);
                                }
                                showCopyToast(code);
                            }).catch(function() {
                                const textArea = document.createElement('textarea');
                                textArea.value = code; 
                                textArea.style.position = 'fixed'; 
                                textArea.style.opacity = '0';
                                document.body.appendChild(textArea); 
                                textArea.select();
                                document.execCommand('copy'); 
                                document.body.removeChild(textArea);
                                slide.classList.add('copied');
                                setTimeout(function() { 
                                    slide.classList.remove('copied'); 
                                }, 2000);
                                showCopyToast(code);
                            });
                        }
                    }
                });
            });
            
            function showCopyToast(code) {
                const existingToast = document.querySelector('.carousel-copy-toast');
                if (existingToast) existingToast.remove();
                const toast = document.createElement('div');
                toast.className = 'carousel-copy-toast';
                toast.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>کد <strong>${code}</strong> کپی شد</span>`;
                document.body.appendChild(toast);
                setTimeout(function() { 
                    toast.classList.add('show'); 
                }, 10);
                setTimeout(function() {
                    toast.classList.remove('show');
                    setTimeout(function() { 
                        if (toast.parentNode) toast.remove(); 
                    }, 300);
                }, 2500);
            }
            
            // درگ و سوایپ کاروسل
            function carouselDragStart(e) {
                if (carouselAnimating) return;
                carouselDragging = true;
                carouselStartX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                carouselCurrentX = carouselStartX;
            }
            function carouselDragMove(e) {
                if (!carouselDragging) return;
                carouselCurrentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            }
            function carouselDragEnd() {
                if (!carouselDragging) return;
                carouselDragging = false;
                const diff = carouselStartX - carouselCurrentX;
                if (diff > 50) { 
                    nextCarouselSlide(); 
                    resetCarouselAutoplay(); 
                } 
                else if (diff < -50) { 
                    prevCarouselSlide(); 
                    resetCarouselAutoplay(); 
                }
            }
            
            carouselContainer.addEventListener('mousedown', carouselDragStart);
            carouselContainer.addEventListener('mousemove', carouselDragMove);
            carouselContainer.addEventListener('mouseup', carouselDragEnd);
            carouselContainer.addEventListener('mouseleave', function() { 
                if (carouselDragging) carouselDragEnd(); 
            });
            carouselContainer.addEventListener('touchstart', carouselDragStart, { passive: true });
            carouselContainer.addEventListener('touchmove', carouselDragMove, { passive: true });
            carouselContainer.addEventListener('touchend', carouselDragEnd);
            
            carouselSlides.forEach(function(slide) {
                slide.addEventListener('dragstart', function(e) { e.preventDefault(); });
                slide.addEventListener('contextmenu', function(e) { e.preventDefault(); });
            });
            
            createCarouselDots();
            updateCarousel();
            startCarouselAutoplay();
        }
    } catch (error) {
        console.error('🎠 ❌ خطا در اسلایدر:', error);
    }

}); // پایان صحیح DOMContentLoaded