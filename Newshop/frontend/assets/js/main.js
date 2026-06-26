// اتصال به بک‌اند
const BACKEND_URL = 'http://localhost:5000';

// تست اتصال به سرور
async function testConnection() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products`);
    if (response.ok) {
      console.log('✅ Connection to backend successful');
      return true;
    } else {
      console.error('❌ Backend connection failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    return false;
  }
}

// گرفتن اطلاعات محصولات (اگر نیاز بود)
async function getProducts() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products`);
    const data = await response.json();
    console.log('Products from backend:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

// ثبت نام (اگر نیاز بود)
async function registerUser(userData) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log('Registration successful:', result);
      return result;
    } else {
      console.error('Registration failed:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}

// ورود (اگر نیاز بود)
async function loginUser(credentials) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log('Login successful:', result);
      localStorage.setItem('token', result.token);
      return result;
    } else {
      console.error('Login failed:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

// تابع‌های اصلی
document.addEventListener('DOMContentLoaded', async () => {
  // تست اتصال به بک‌اند
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log('🚀 Backend is ready');
    // میتونی اطلاعاتی رو از بک‌اند بگیری
    // await getProducts();
  }
  
  // کدهای قبلی هدر
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const cartBadge = document.getElementById('cart-badge');
  const header = document.getElementById('header');
  const glare = document.getElementById('glare');

  // Glare با حرکت موس
  header.addEventListener('mousemove', (e) => {
    const rect = header.getBoundingClientRect();
    glare.style.setProperty('--x', `${e.clientX - rect.left}px`);
    glare.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });

  // تم دارک/لایت
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
  } else {
    htmlEl.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => themeToggle.style.transform = '', 500);
  });

  // جستجو
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      console.log('Search query:', query);
      // میتونی اینجا به بک‌اند بفرستی
      // searchOnBackend(query);
    }
  });

  // شمارنده سبد خرید
  function updateCartBadge(count) {
    cartBadge.textContent = count;
    cartBadge.style.animation = 'none';
    cartBadge.offsetHeight;
    cartBadge.style.animation = 'badgeBounce 0.4s ease';
  }
});

// تابع جستجوی بک‌اند (اگر نیاز بود)
async function searchOnBackend(query) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products?search=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log('Search results:', data);
    return data;
  } catch (error) {
    console.error('Search error:', error);
    return null;
  }
}