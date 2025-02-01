document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    if(!localStorage.getItem('adminAuth')) {
        window.location.href = 'login.html';
    }

    // Обработчики для кнопок секций
    document.querySelectorAll('.sidebar button').forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section;
            showSection(section);
        });
    });

    // Загрузка данных каталога
    loadCatalog();
    loadSlider();

    // Выход
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('adminAuth');
        window.location.href = 'login.html';
    });
});

function loadCatalog() {
    // Здесь будет загрузка товаров из базы данных
}

function loadSlider() {
    // Здесь будет загрузка слайдов из базы данных
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}