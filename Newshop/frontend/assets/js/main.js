// main.js - Main script to fetch and render data dynamically

import ApiClient from './api.js';
import * as Style from './style.js';
document.addEventListener('DOMContentLoaded', () => {
    loadHomePageData();
});

async function loadHomePageData() {
    try {
        // Load layout configuration first
        const layout = await ApiClient.getHomePageLayout();

        // Render each section based on layout order
        for (const section of layout.data.sort((a, b) => a.order - b.order)) {
            if (!section.visible) continue;

            switch (section.type) {
                case 'header':
                    await renderHeader(section.config);
                    break;
                case 'banner_slider':
                    await renderBannerSlider();
                    initializeSliderControls();
                    break;
                case 'amazing-offer':
                    await renderAmazingOffer();
                    break;
                case 'categories':
                    await renderCategories();
                    break;
                case 'brands':
                    await renderBrands();
                    break;
                case 'product_carousel':
                    await renderProductCarousel(section.title, section.config);
                    break;
                case 'social_networks':
                    await renderSocialNetworks();
                    break;
                default:
                    console.warn(`Unknown section type: ${section.type}`);
            }
        }
    } catch (error) {
        console.error('Failed to load homepage:', error);
    }
}

async function renderBannerSlider() {
    try {
        const { data } = await ApiClient.getBannerSlides();
        const container = document.querySelector('.slider-container');
        if (!container) return;

        container.innerHTML = data.slides.map(slide => `
            <div class="slide ${slide.active ? 'active' : ''}" data-slide="${slide.id}">
                <img src="${slide.image}" alt="${slide.title}" class="slide__image">
                <div class="slide__overlay">
                    <div class="slide__content">
                        <span class="slide__badge">${slide.badge || ''}</span>
                        <h2 class="slide__title">${slide.title}</h2>
                        <p class="slide__desc">${slide.description}</p>
                        <button class="slide__cta" onclick="location.href='${slide.cta_link}'">
                            ${slide.cta_text}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Initialize slider controls
        initializeSliderControls();
    } catch (error) {
        console.error('Failed to render banner slider:', error);
    }
}

async function renderAmazingOffer() {
    try {
        const { data } = await ApiClient.getAmazingOffers();
        const container = document.querySelector('.amazing-offer__products');
        if (!container) return;

        container.innerHTML = data.items.map(item => `
            <div class="amazing-offer__product-card">
                <div class="amazing-offer__product-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="amazing-offer__product-image">
                </div>
                <div class="amazing-offer__product-info">
                    <h3 class="amazing-offer__product-name">${item.name}</h3>
                    <span class="amazing-offer__product-description">${item.description}</span>
                    <div class="amazing-offer__product-prices">
                        <span class="amazing-offer__product-price--original">${item.price.toLocaleString()}</span>
                        <span class="amazing-offer__product-price--discounted">${item.discounted_price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to render amazing offers:', error);
    }
}

async function renderCategories() {
    try {
        const { data } = await ApiClient.getCategories();
        const container = document.querySelector('.categories__grid');
        if (!container) return;

        container.innerHTML = data.categories.map(category => `
            <a href="${category.link}" class="category-card">
                <div class="category-card__icon">
                    <img src="${category.icon}" alt="${category.name}" class="category-icon-3d" loading="lazy">
                </div>
                <h3 class="category-card__name">${category.name}</h3>
                <span class="category-card__count">${category.count} محصول</span>
            </a>
        `).join('');
    } catch (error) {
        console.error('Failed to render categories:', error);
    }
}

async function renderBrands() {
    try {
        const { data } = await ApiClient.getPopularBrands();
        const container = document.querySelector('.marquee-track.brands-marquee-track');
        if (!container) return;

        container.innerHTML = data.brands.map(brand => `
            <a href="${brand.link}" class="brand-scroll-card">
                <span class="brand-scroll-card__name">${brand.name}</span>
            </a>
        `).join('');
    } catch (error) {
        console.error('Failed to render brands:', error);
    }
}

async function renderProductCarousel(title, config) {
    try {
        let data;
        if (title === 'پرفروش‌ترین‌ها') {
            data = await ApiClient.getBestSellers();
        } else if (title === 'جدیدترین‌ها') {
            data = await ApiClient.getNewArrivals();
        } else {
            // Handle custom sections via config.source_type
            console.log('Custom section:', title, config);
            return;
        }

        const selector = config.source_type === 'best_sellers' 
            ? '.marquee-track.best-sellers-track' 
            : '.marquee-track.new-arrivals-track';

        const container = document.querySelector(selector);
        if (!container) return;

        container.innerHTML = data.data.items.map(product => `
            <div class="product-card">
                <div class="product-card__image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-card__image">
                </div>
                <div class="product-card__info">
                    <h3 class="product-card__name">${product.name}</h3>
                    <div class="product-card__prices">
                        <span class="product-card__price--original">${product.price.toLocaleString()}</span>
                        <span class="product-card__price--discounted">${product.discounted_price?.toLocaleString() || ''}</span>
                    </div>
                    <div class="product-card__actions">
                        <button class="product-card__like-btn" aria-label="افزودن به علاقه‌مندی‌ها">
                            <svg class="like" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </button>
                        <button class="product-card__btn product-card__btn--add-to-cart">افزودن به سبد خرید</button>
                        <button class="product-card__btn product-card__btn--view-details">مشاهده جزئیات</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to render product carousel:', error);
    }
}

async function renderSocialNetworks() {
    try {
        const { data } = await ApiClient.getSocialNetworks();
        const container = document.querySelector('.social-grid');
        if (!container) return;

        container.innerHTML = data.networks.map(network => `
            <a href="${network.url}" class="social-card social-card--${network.platform}" target="_blank" rel="noopener">
                <div class="social-card__glow"></div>
                <div class="social-card__content">
                    <div class="social-card__icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-label="${network.name}">
                            ${network.svg_icon}
                        </svg>
                    </div>
                    <div class="social-card__info">
                        <h3 class="social-card__name">${network.name}</h3>
                        <p class="social-card__handle">${network.handle}</p>
                        <span class="social-card__followers">${network.followers}</span>
                    </div>
                    <button class="social-card__btn">${network.button_text}</button>
                </div>
            </a>
        `).join('');
    } catch (error) {
        console.error('Failed to render social networks:', error);
    }
}

function initializeSliderControls() {
    const prevBtn = document.querySelector('.slider-btn--prev');
    const nextBtn = document.querySelector('.slider-btn--next');

    if (prevBtn) prevBtn.addEventListener('click', () => slide('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => slide('next'));
}

function slide(direction) {
    const slides = document.querySelectorAll('.slide');
    const currentIndex = Array.from(slides).findIndex(s => s.classList.contains('active'));
    let newIndex;

    if (direction === 'next') {
        newIndex = (currentIndex + 1) % slides.length;
    } else {
        newIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === newIndex);
    });
}