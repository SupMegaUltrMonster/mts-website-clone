document.addEventListener('DOMContentLoaded', function() {

    // Page load animation
    anime({
        targets: '.header',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 600,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.hero-content',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 300,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.esim-steps .container > *',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 700,
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.quick-actions-grid .quick-action-card',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 600,
        delay: anime.stagger(100, {start: 600}),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.quick-actions-banner',
        opacity: [0, 1],
        translateX: [60, 0],
        duration: 800,
        delay: 800,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.services-grid .service-card',
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 500,
        delay: anime.stagger(80, {start: 700}),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.promo-slider .container',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        delay: 900,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.quick-services-grid .quick-service-item',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 500,
        delay: anime.stagger(80, {start: 1000}),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.support .container > *',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100, {start: 1100}),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.tabs-section .container > *',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100, {start: 1200}),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.about-grid .about-card',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 600,
        delay: anime.stagger(100, {start: 1300}),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.news-grid .news-card',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 600,
        delay: anime.stagger(100, {start: 1400}),
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.app-download .container',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        delay: 1500,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.footer',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 1600,
        easing: 'easeOutQuad'
    });

    // Button animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        btn.addEventListener('mousedown', function() {
            anime({
                targets: this,
                scale: 0.97,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
        btn.addEventListener('mouseup', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
    });

    // Slider button animations
    const sliderBtns = document.querySelectorAll('.slider-btn');
    sliderBtns.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.15,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Tab button animations
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Search and profile button animations
    const actionBtns = document.querySelectorAll('.search-btn, .profile-btn');
    actionBtns.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Support link animations
    const supportLinks = document.querySelectorAll('.support-link');
    supportLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        link.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // App button animations
    const appBtns = document.querySelectorAll('.app-btn');
    appBtns.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    const slider = document.querySelector('.slider');
    if (slider) {
        const track = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('.promo-card');
        const prevBtn = slider.querySelector('.slider-btn-prev');
        const nextBtn = slider.querySelector('.slider-btn-next');
        let currentIndex = 0;

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            });
        }

        setInterval(function() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            tabPanes.forEach(function(pane) {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });

    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });

    const quickActionCards = document.querySelectorAll('.quick-action-card');
    quickActionCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const profileBtn = document.querySelector('.profile-btn');
    const registerModal = document.getElementById('registerModal');
    const modalClose = document.getElementById('modalClose');
    const registerForm = document.getElementById('registerForm');

    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            registerModal.classList.add('active');
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            registerModal.classList.remove('active');
        });
    }

    if (registerModal) {
        registerModal.addEventListener('click', function(e) {
            if (e.target === registerModal) {
                registerModal.classList.remove('active');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('regPassword').value;
            const passwordConfirm = document.getElementById('regPasswordConfirm').value;
            
            if (password !== passwordConfirm) {
                alert('Пароли не совпадают');
                return;
            }
            
            if (password.length < 8) {
                alert('Пароль должен содержать минимум 8 символов');
                return;
            }
            
            alert('Регистрация успешна!');
            registerModal.classList.remove('active');
            registerForm.reset();
        });
    }

    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(function() {
            if (cookieBanner) {
                cookieBanner.classList.remove('hidden');
            }
        }, 1000);
    } else {
        if (cookieBanner) {
            cookieBanner.classList.add('hidden');
        }
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) {
                cookieBanner.classList.add('hidden');
            }
        });
    }
});
