// api.js - API Client for NewShop
const API_BASE_URL = '/api';

/**
 * Fetches layout configuration for homepage sections
 * @returns {Promise<Object>} Layout data including section order and visibility
 */
export async function getHomePageLayout() {
    const response = await fetch(`${API_BASE_URL}/home/layout`);
    if (!response.ok) throw new Error('Failed to load homepage layout');
    return response.json();
}

/**
 * Fetches banner slider data
 * @returns {Promise<Object>} Banner slides data
 */
export async function getBannerSlides() {
    const response = await fetch(`${API_BASE_URL}/home/sections/banner_slider`);
    if (!response.ok) throw new Error('Failed to load banners');
    return response.json();
}

/**
 * Fetches amazing offers data
 * @returns {Promise<Object>} Amazing offer products
 */
export async function getAmazingOffers() {
    const response = await fetch(`${API_BASE_URL}/home/sections/amazing-offer`);
    if (!response.ok) throw new Error('Failed to load amazing offers');
    return response.json();
}

/**
 * Fetches category data
 * @returns {Promise<Object>} Categories with icons and counts
 */
export async function getCategories() {
    const response = await fetch(`${API_BASE_URL}/home/sections/categories`);
    if (!response.ok) throw new Error('Failed to load categories');
    return response.json();
}

/**
 * Fetches popular brands data
 * @returns {Promise<Object>} Popular brands list
 */
export async function getPopularBrands() {
    const response = await fetch(`${API_BASE_URL}/home/sections/brands`);
    if (!response.ok) throw new Error('Failed to load brands');
    return response.json();
}

/**
 * Fetches best sellers data
 * @returns {Promise<Object>} Best selling products
 */
export async function getBestSellers() {
    const response = await fetch(`${API_BASE_URL}/home/sections/best-sellers`);
    if (!response.ok) throw new Error('Failed to load best sellers');
    return response.json();
}

/**
 * Fetches new arrivals data
 * @returns {Promise<Object>} Latest products
 */
export async function getNewArrivals() {
    const response = await fetch(`${API_BASE_URL}/home/sections/new-arrivals`);
    if (!response.ok) throw new Error('Failed to load new arrivals');
    return response.json();
}

/**
 * Fetches social networks data
 * @returns {Promise<Object>} Social media links and stats
 */
export async function getSocialNetworks() {
    const response = await fetch(`${API_BASE_URL}/home/sections/social-networks`);
    if (!response.ok) throw new Error('Failed to load social networks');
    return response.json();
}

/**
 * Generic API request helper
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>}
 */
export async function apiRequest(endpoint, options = {}) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}

// Export all functions as default
export default {
    getHomePageLayout,
    getBannerSlides,
    getAmazingOffers,
    getCategories,
    getPopularBrands,
    getBestSellers,
    getNewArrivals,
    getSocialNetworks,
    apiRequest
};