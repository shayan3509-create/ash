document.addEventListener('DOMContentLoaded', function() {
  // ========================================
  // انتخاب المان‌ها
  // ========================================
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const sliderContainer = document.querySelector('.slider-container');
  
  // ========================================
  // متغیرهای اصلی
  // ========================================
  let currentSlide = 0;
  let isAnimating = false;
  let autoPlayInterval;
  let clickCooldown = false; // 🛡️ آنتی اسپم
  
  const totalSlides = slides.length;
  const autoPlayDelay = 7000;       // ۷ ثانیه اتوماتیک
  const animationDuration = 600;    // مدت انیمیشن
  const cooldownTime = 2000;        // ⏱️ ۲ ثانیه بین کلیک‌ها
  
  // ========================================
  // 🚫 جلوگیری از drag و context menu
  // ========================================
  document.querySelectorAll('.slider-container img').forEach(img => {
    img.setAttribute('draggable', 'false');
  });
  
  sliderContainer.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
  
  sliderContainer.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  
  // ========================================
  // 🎬 انیمیشن ورود بنر هنگام اسکرول
  // ========================================
  const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  scrollAnimateElements.forEach(el => {
    observer.observe(el);
  });
  
  // ========================================
  // 🔄 تابع رفتن به اسلاید مشخص
  // ========================================
  function goToSlide(index, direction = 'next') {
    if (isAnimating || index === currentSlide) return;
    
    isAnimating = true;
    
    const currentSlideEl = slides[currentSlide];
    const nextSlideEl = slides[index];
    
    let exitClass, enterClass;
    
    if (direction === 'next') {
      exitClass = 'exit-left';
      enterClass = 'enter-right';
    } else {
      exitClass = 'exit-right';
      enterClass = 'enter-left';
    }
    
    // آماده کردن اسلاید جدید
    nextSlideEl.style.transition = 'none';
    nextSlideEl.classList.add(enterClass);
    nextSlideEl.style.opacity = '1';
    
    // Force reflow
    void nextSlideEl.offsetWidth;
    
    // اعمال انیمیشن
    nextSlideEl.style.transition = '';
    nextSlideEl.classList.remove(enterClass);
    nextSlideEl.classList.add('active');
    
    currentSlideEl.classList.add(exitClass);
    currentSlideEl.classList.remove('active');
    
    // بعد از انیمیشن
    setTimeout(() => {
      currentSlideEl.classList.remove(exitClass);
      currentSlideEl.style.opacity = '';
      
      currentSlide = index;
      updateDots();
      isAnimating = false;
    }, animationDuration);
  }
  
  // ========================================
  // 📍 توابع کمکی
  // ========================================
  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    goToSlide(next, 'next');
  }
  
  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev, 'prev');
  }
  
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  // ========================================
  // ⏰ Auto-play
  // ========================================
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }
  
  // ========================================
  // 🛡️ آنتی اسپم
  // ========================================
  function startCooldown() {
    clickCooldown = true;
    setTimeout(() => {
      clickCooldown = false;
    }, cooldownTime);
  }
  
  // ========================================
  // 🖱️ Event Listeners دکمه‌ها
  // ========================================
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (clickCooldown) return;
    
    startCooldown();
    nextSlide();
    resetAutoPlay();
  });
  
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (clickCooldown) return;
    
    startCooldown();
    prevSlide();
    resetAutoPlay();
  });
  
  // ========================================
  // 👆 Swipe برای موبایل
  // ========================================
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  
  sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    stopAutoPlay();
  }, { passive: true });
  
  sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
    resetAutoPlay();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // اگر حرکت عمودی بیشتر از افقی بوده، swipe رو نادیده بگیر
    if (Math.abs(diffY) > Math.abs(diffX)) return;
    
    if (Math.abs(diffX) < swipeThreshold) return;
    
    // ✅ جهت درست برای RTL:
    // کشیدن به راست = قبلی (از چپ میاد)
    // کشیدن به چپ = بعدی (از راست میاد)
    if (diffX < 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
  
  // ========================================
  // 🚀 شروع
  // ========================================
  startAutoPlay();
});








