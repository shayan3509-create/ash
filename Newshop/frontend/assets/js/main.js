// تغییر تم
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

// بررسی تم ذخیره شده
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
}

// کلیک روی دکمه تم
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        
        // ذخیره در مرورگر
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// سرچ باکس
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

if (searchButton && searchInput) {
    searchButton.addEventListener('click', function(e) {
        e.stopPropagation();
        searchInput.classList.toggle('active');
        
        if (searchInput.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 300);
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchButton.contains(e.target) && !searchInput.contains(e.target)) {
            searchInput.classList.remove('active');
        }
    });

    searchInput.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.classList.remove('active');
        }
    });
}