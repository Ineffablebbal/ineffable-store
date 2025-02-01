// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-menu');
    
    burger?.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Плавающие элементы при движении мыши
    document.addEventListener('mousemove', (e) => {
        const circles = document.querySelectorAll('.floating-circle');
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.03;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});