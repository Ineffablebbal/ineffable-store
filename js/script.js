document.addEventListener('DOMContentLoaded', function() {
    // Анимированные частицы
    const createParticles = () => {
        const particles = document.getElementById('particles');
        for(let i = 0; i < 50; i++) {
            let particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--move-x', `${Math.random() * 200 - 100}px`);
            particle.style.setProperty('--move-y', `${Math.random() * 200 - 100}px`);
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particles.appendChild(particle);
        }
    };

    // Параллакс эффект для фона
    const parallaxEffect = (e) => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 5;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    };

    // Неоновый текст
    const glowText = () => {
        const texts = document.querySelectorAll('.neon-text');
        texts.forEach(text => {
            text.style.textShadow = `
                0 0 5px #fff,
                0 0 10px #fff,
                0 0 20px #a855f7,
                0 0 40px #a855f7,
                0 0 80px #a855f7
            `;
        });
    };

    // Мобильное меню
    const initMobileMenu = () => {
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu li');

        burger?.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });
    };

    // Анимация появления элементов при скролле
    const scrollAnimation = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };

    // Корзина
    const initCart = () => {
        const cartIcon = document.querySelector('.cart-icon');
        const cartCount = document.querySelector('.cart-count');
        let count = localStorage.getItem('cartCount') || 0;
        cartCount.textContent = count;

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                count++;
                cartCount.textContent = count;
                localStorage.setItem('cartCount', count);
                
                // Анимация добавления в корзину
                button.classList.add('added');
                setTimeout(() => button.classList.remove('added'), 1000);
            });
        });
    };

    // Поиск
    const initSearch = () => {
        const searchIcon = document.querySelector('.search-icon');
        const searchModal = document.querySelector('.search-modal');
        
        searchIcon?.addEventListener('click', () => {
            searchModal?.classList.toggle('active');
        });
    };

    // Инициализация всех функций
    createParticles();
    document.addEventListener('mousemove', parallaxEffect);
    window.addEventListener('scroll', scrollAnimation);
    
    glowText();
    initMobileMenu();
    initCart();
    initSearch();
});

// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader?.classList.add('preloader-finish');
});