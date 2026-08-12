// ==============================
// DYNAMIC BANNERS SLIDER
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

    if (banners.length === 0 || !img) {
        console.log("No banners found");
        return;
    }
    // اگه فقط یک بنر باشه: دکمه‌ها، خط پیشرفت و دات‌ها مخفی می‌شن
    

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
        void img.offsetWidth;
        
        img.src = getBannerImage(banners[index]);
        img.alt = banners[index].title;
        
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
        void progressBar.offsetWidth;
        
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

    // دکمه‌ها
    if (btnNext) {
        btnNext.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            prevBanner();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextBanner();
        });
    }

    // شروع
    changeBanner(0);
})();

// ==============================
// CATEGORIES SCROLL
// ==============================
const categoryScroll = document.querySelector(".categories-scroll");
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
        try { categoryScroll.releasePointerCapture(e.pointerId); } catch {}
    });

    categoryScroll.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", e => {
            if (moved) { e.preventDefault(); e.stopPropagation(); }
        });
    });
}

document.querySelector(".category-arrow.right")?.addEventListener("click", () => {
    categoryScroll?.scrollBy({ left: 400, behavior: "smooth" });
});

document.querySelector(".category-arrow.left")?.addEventListener("click", () => {
    categoryScroll?.scrollBy({ left: -400, behavior: "smooth" });
});

// ==============================
// FLASH PRODUCTS DRAG
// ==============================
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
        try { flashProducts.setPointerCapture(e.pointerId); } catch {}
    });

    flashProducts.addEventListener("pointermove", e => {
        if (!isDragging) return;
        const distance = e.clientX - startX;
        if (Math.abs(distance) > 5) hasMoved = true;
        flashProducts.scrollLeft = startScrollLeft - distance;
    });

    flashProducts.addEventListener("pointerup", e => {
        if (!isDragging) return;
        if (hasMoved) { e.preventDefault(); e.stopPropagation(); }
        isDragging = false;
        flashProducts.style.scrollBehavior = "smooth";
        flashProducts.classList.remove("dragging");
        try { flashProducts.releasePointerCapture(e.pointerId); } catch {}
    });

    flashProducts.addEventListener("pointercancel", e => {
        isDragging = false;
        flashProducts.style.scrollBehavior = "smooth";
        flashProducts.classList.remove("dragging");
        try { flashProducts.releasePointerCapture(e.pointerId); } catch {}
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