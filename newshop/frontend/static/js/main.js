/* ============================================================
   MAIN.JS - NEW SHOP
   همه کدها مرتب و در زمان مناسب اجرا می‌شوند
============================================================ */


// ==============================
// 1. DYNAMIC BANNERS SLIDER
// ==============================
(function() {
    const banners = window.DYNAMIC_BANNERS || [];
    let currentBanner = 0;
    let progressTimer = null;
    const bannerTime = 5000;

    const img = document.getElementById("banner-image");
    const dotsContainer = document.getElementById("banner-dots");
    const progressBar = document.getElementById("banner-progress-bar");
    const btnNext = document.getElementById("banner-next");
    const btnPrev = document.getElementById("banner-prev");

    // اگر بنری نیست یا img وجود ندارد، خروج
    if (banners.length === 0 || !img) {
        return;
    }

    // ✅ اگر فقط یک بنر باشد: دکمه‌ها، خط پیشرفت و دات‌ها مخفی می‌شوند
    if (banners.length === 1) {
        if (btnNext) btnNext.style.display = "none";
        if (btnPrev) btnPrev.style.display = "none";
        if (dotsContainer) dotsContainer.style.display = "none";
        if (progressBar && progressBar.parentElement) {
            progressBar.parentElement.style.display = "none";
        }
        // فقط بنر اول را نمایش بده و برو
        img.src = getBannerImage(banners[0]);
        img.alt = banners[0].title || "";
        updateBannerLink(0);
        return;
    }

    function getBannerImage(banner) {
        if (window.innerWidth <= 768 && banner.mobileSrc) {
            return banner.mobileSrc;
        }
        return banner.src;
    }

    function updateDots(index) {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll(".banner-dot");
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    function updateBannerLink(index) {
        const bannerLink = document.querySelector(".banner-link");
        if (bannerLink && banners[index]) {
            bannerLink.href = banners[index].link || "#";
            if (banners[index].newTab) {
                bannerLink.setAttribute("target", "_blank");
            } else {
                bannerLink.removeAttribute("target");
            }
        }
    }

    function changeBanner(index) {
        currentBanner = index;
        img.classList.remove("banner-change");
        void img.offsetWidth; // reflow

        img.src = getBannerImage(banners[index]);
        img.alt = banners[index].title || "";

        if (img.complete) {
            img.classList.add("banner-change");
        }

        updateBannerLink(index);
        updateDots(index);
        resetProgress();
    }

    function nextBanner() {
        currentBanner = (currentBanner + 1) % banners.length;
        changeBanner(currentBanner);
    }

    function prevBanner() {
        currentBanner = (currentBanner - 1 + banners.length) % banners.length;
        changeBanner(currentBanner);
    }

    function resetProgress() {
        if (!progressBar) return;
        if (progressTimer) clearTimeout(progressTimer);

        progressBar.style.transition = "none";
        progressBar.style.width = "0%";
        void progressBar.offsetWidth; // reflow

        progressBar.style.transition = "width " + bannerTime + "ms linear";
        progressBar.style.width = "100%";

        progressTimer = setTimeout(nextBanner, bannerTime);
    }

    // ساخت dots
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        banners.forEach((banner, index) => {
            const dot = document.createElement("span");
            dot.className = "banner-dot";
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                changeBanner(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    // ✅ در RTL: دکمه next باید به راست برود (اسلاید بعدی)
    if (btnNext) {
        btnNext.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextBanner();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            prevBanner();
        });
    }

    // شروع
    changeBanner(0);
})();


// ==============================
// 2. همه کدها بعد از آماده شدن DOM
// ==============================
document.addEventListener('DOMContentLoaded', function() {

    // ==========================
    // 2.1 CATEGORIES SCROLL
    // ==========================
    const categoryScroll = document.getElementById("categories-scroll");
    if (categoryScroll) {
        let down = false;
        let startX = 0;
        let scrollStart = 0;
        let moved = false;

        categoryScroll.addEventListener("pointerdown", e => {
            down = true;
            moved = false;
            startX = e.clientX;
            scrollStart = categoryScroll.scrollLeft;
            categoryScroll.style.scrollBehavior = "auto";
            categoryScroll.setPointerCapture(e.pointerId);
        });

        categoryScroll.addEventListener("pointermove", e => {
            if (!down) return;
            let move = e.clientX - startX;
            if (Math.abs(move) > 3) moved = true;
            categoryScroll.scrollLeft = scrollStart - move;
        });

        categoryScroll.addEventListener("pointerup", e => {
            down = false;
            categoryScroll.style.scrollBehavior = "smooth";
            try { categoryScroll.releasePointerCapture(e.pointerId); } catch(err) {}
        });

        categoryScroll.querySelectorAll(".category-card").forEach(card => {
            card.addEventListener("click", e => {
                if (moved) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });

        // دکمه‌های اسکرول
        const rightArrow = document.querySelector(".category-arrow.right");
        const leftArrow = document.querySelector(".category-arrow.left");

        if (rightArrow) {
            rightArrow.addEventListener("click", () => {
                categoryScroll.scrollBy({ left: 400, behavior: "smooth" });
            });
        }

        if (leftArrow) {
            leftArrow.addEventListener("click", () => {
                categoryScroll.scrollBy({ left: -400, behavior: "smooth" });
            });
        }
    }

    // ==========================
    // 2.2 FLASH PRODUCTS DRAG
    // ==========================
    const flashProducts = document.querySelector(".flash-products");
    if (flashProducts) {
        let isDragging = false;
        let hasMoved = false;
        let startX = 0;
        let startScrollLeft = 0;

        flashProducts.addEventListener("pointerdown", e => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            isDragging = true;
            hasMoved = false;
            startX = e.clientX;
            startScrollLeft = flashProducts.scrollLeft;
            flashProducts.style.scrollBehavior = "auto";
            flashProducts.classList.add("dragging");
            try { flashProducts.setPointerCapture(e.pointerId); } catch(err) {}
        });

        flashProducts.addEventListener("pointermove", e => {
            if (!isDragging) return;
            const distance = e.clientX - startX;
            if (Math.abs(distance) > 5) hasMoved = true;
            flashProducts.scrollLeft = startScrollLeft - distance;
        });

        flashProducts.addEventListener("pointerup", e => {
            if (!isDragging) return;
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
            }
            isDragging = false;
            flashProducts.style.scrollBehavior = "smooth";
            flashProducts.classList.remove("dragging");
            try { flashProducts.releasePointerCapture(e.pointerId); } catch(err) {}
        });

        flashProducts.addEventListener("pointercancel", e => {
            isDragging = false;
            flashProducts.style.scrollBehavior = "smooth";
            flashProducts.classList.remove("dragging");
            try { flashProducts.releasePointerCapture(e.pointerId); } catch(err) {}
            hasMoved = false;
        });

        flashProducts.addEventListener("click", e => {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                hasMoved = false;
            }
        }, true);
    }

    // ==========================
    // 2.3 MOBILE SEARCH TOGGLE
    // ==========================
    const searchToggle = document.getElementById('searchToggle');
    const searchExpand = document.getElementById('searchExpand');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const headerContainer = document.querySelector('.header-container');

    if (searchToggle && searchExpand) {
        function openSearch() {
            searchExpand.classList.add('open');
            searchToggle.classList.add('active');
            if (headerContainer) headerContainer.classList.add('search-open');
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 350);
        }

        function closeSearch() {
            searchExpand.classList.remove('open');
            searchToggle.classList.remove('active');
            if (headerContainer) headerContainer.classList.remove('search-open');
            if (searchInput) {
                searchInput.value = '';
                searchInput.blur();
            }
        }

        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (searchExpand.classList.contains('open')) {
                closeSearch();
            } else {
                openSearch();
            }
        });

        if (searchClose) {
            searchClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeSearch();
            });
        }

        document.addEventListener('click', function(e) {
            if (searchExpand.classList.contains('open') &&
                !searchExpand.contains(e.target) &&
                !searchToggle.contains(e.target)) {
                closeSearch();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchExpand.classList.contains('open')) {
                closeSearch();
            }
        });

        if (searchInput) {
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = searchInput.value.trim();
                    if (query) {
                        window.location.href = '/search?q=' + encodeURIComponent(query);
                    }
                }
            });
        }
    }

    // ==========================
    // 2.4 SUB HEADER SCROLL BEHAVIOR
    // ==========================
    const subHeader = document.getElementById('subHeader');
    const siteHeader = document.querySelector('.site-header');

    if (subHeader && siteHeader) {
        let ticking = false;

        function updateSubHeader() {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                // اسکرول به پایین: زیر هدر مخفی + بوردر هدر اصلی برگردد
                subHeader.classList.add('hidden');
                siteHeader.classList.remove('sub-visible');
            } else {
                // بالای صفحه: زیر هدر نمایش + بوردر هدر اصلی حذف
                subHeader.classList.remove('hidden');
                siteHeader.classList.add('sub-visible');
            }

            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateSubHeader);
                ticking = true;
            }
        });

        // اجرای اولیه
        updateSubHeader();
    }

    // ==========================
    // 2.5 NOTIFICATION BUTTONS
    // ==========================
    const notificationBtn = document.getElementById('notificationBtn');
    const mobileNotificationBtn = document.getElementById('mobileNotificationBtn');

    function handleNotificationClick(e) {
        e.preventDefault();
        alert('صفحه اعلان‌ها به زودی اضافه می‌شود!');
        // window.location.href = '/notifications/';
    }

    if (notificationBtn) {
        notificationBtn.addEventListener('click', handleNotificationClick);
    }

    if (mobileNotificationBtn) {
        mobileNotificationBtn.addEventListener('click', handleNotificationClick);
    }

    // ==========================
    // 2.6 CATEGORY BUTTON
    // ==========================
    const categoryBtn = document.getElementById('categoryBtn');

    if (categoryBtn) {
        categoryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('منوی دسته‌بندی به زودی اضافه می‌شود!');
        });
    }

}); // پایان DOMContentLoaded