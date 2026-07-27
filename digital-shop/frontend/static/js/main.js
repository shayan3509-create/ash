        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add to cart functionality with animation
        document.querySelectorAll('.btn-primary').forEach(button => {
            if (button.textContent.includes('افزودن به سبد')) {
                button.addEventListener('click', function (e) {
                    e.preventDefault();

                    // Add bounce animation
                    this.classList.add('animate-bounce');
                    setTimeout(() => {
                        this.classList.remove('animate-bounce');
                    }, 1000);

                    // Show success notification
                    showNotification('محصول با موفقیت به سبد خرید اضافه شد!', 'success');

                    // Update cart counter
                    updateCartCounter();
                });
            }
        });

        // Newsletter subscription
        document.querySelector('.btn-secondary').addEventListener('click', function () {
            const emailInput = this.parentElement.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email && isValidEmail(email)) {
                showNotification('با موفقیت در خبرنامه عضو شدید!', 'success');
                emailInput.value = '';
            } else {
                showNotification('لطفاً ایمیل معتبر وارد کنید.', 'error');
            }
        });

        // Utility functions
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl transition-all duration-500 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`;
            notification.innerHTML = `
                <div class="flex items-center">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} ml-3 text-xl"></i>
                    <span class="font-medium">${message}</span>
                </div>
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.transform = 'translate(-50%, -100px)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        }

        function updateCartCounter() {
            const counters = document.querySelectorAll('.animate-bounce');
            counters.forEach(counter => {
                if (counter.textContent && !isNaN(counter.textContent)) {
                    counter.textContent = parseInt(counter.textContent) + 1;
                    counter.classList.add('animate-pulse');
                    setTimeout(() => {
                        counter.classList.remove('animate-pulse');
                    }, 1000);
                }
            });
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Parallax scroll effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.morphing-blob, .animate-float');

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Apply fade-in animation to elements
        document.querySelectorAll('.hover-lift').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });