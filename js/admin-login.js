document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Здесь должна быть проверка через API
    if(username === 'admin' && password === 'password') {
        localStorage.setItem('adminAuth', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('Неверные данные');
    }
});