document.addEventListener('DOMContentLoaded', function() {
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
});
