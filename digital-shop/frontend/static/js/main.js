// ===== مدیریت مگا منوی دسته‌بندی =====
document.addEventListener('DOMContentLoaded', function() {
    
    const categoryMenu = document.querySelector('.category-menu');
    const categoryTrigger = document.querySelector('.category-trigger');
    const megaMenu = document.querySelector('.mega-menu');
    
    // تابع برای باز کردن مگا منو
    function openMegaMenu() {
        megaMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // تابع برای بستن مگا منو
    function closeMegaMenu() {
        megaMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // کلیک روی trigger
    categoryTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (megaMenu.classList.contains('active')) {
            closeMegaMenu();
        } else {
            openMegaMenu();
        }
    });
    
    // کلیک بیرون
    document.addEventListener('click', function(e) {
        if (!categoryMenu.contains(e.target)) {
            closeMegaMenu();
        }
    });
    
    // جلوگیری از بسته شدن داخل
    megaMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // بستن با Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && megaMenu.classList.contains('active')) {
            closeMegaMenu();
        }
    });
    
    // ===== مدیریت سرچ موبایل =====
    const mobileSearchBtn = document.querySelector('.mobile-search-btn');
    const headerCenter = document.querySelector('.header-center');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-box input');
    
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            headerCenter.classList.add('active');
            setTimeout(function() {
                searchInput.focus();
            }, 300);
        });
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', function(e) {
            e.stopPropagation();
            headerCenter.classList.remove('active');
            searchInput.blur();
        });
    }
    
    document.addEventListener('click', function(e) {
        if (headerCenter && !headerCenter.contains(e.target) && mobileSearchBtn && !mobileSearchBtn.contains(e.target)) {
            headerCenter.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && headerCenter.classList.contains('active')) {
            headerCenter.classList.remove('active');
        }
    });
    
    // ===== دارک مود =====
    const themeBtn = document.querySelector('.theme-btn');
    
    themeBtn.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    

// ===== افکت Sticky Header =====
const header = document.querySelector('.main-header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // ذخیره وضعیت اسکرول در sessionStorage
    sessionStorage.setItem('lastScroll', currentScroll);
    
    if (currentScroll > 0) {
        document.documentElement.classList.add('scrolled');
        header.classList.add('scrolled');
    } else {
        document.documentElement.classList.remove('scrolled');
        header.classList.remove('scrolled');
    }
});


    // ===== انیمیشن زنگ زدن نوتیفیکیشن =====
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationBadge = notificationBtn.querySelector('.badge');
    
    function shakeBell() {
        const count = parseInt(notificationBadge.textContent);
        
        // فقط وقتی نوتیف وجود داره زنگ بزنه
        if (count > 0) {
            // زنگ اول
            notificationBtn.classList.add('shake');
            
            setTimeout(function() {
                notificationBtn.classList.remove('shake');
                
                // زنگ دوم (بعد از ۴۰۰ میلی‌ثانیه)
                setTimeout(function() {
                    notificationBtn.classList.add('shake');
                    
                    setTimeout(function() {
                        notificationBtn.classList.remove('shake');
                    }, 600);
                }, 400);
            }, 600);
        }
    }
    
    // شروع بعد از ۲ ثانیه (تا صفحه لود بشه)
    setTimeout(shakeBell, 2000);
    
    // هر ۱۰ ثانیه تکرار
    setInterval(shakeBell, 10000);
    
});