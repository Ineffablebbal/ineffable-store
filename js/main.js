// main.js
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundEffects();
    initHeroAnimations();
    initGameEffects();
    initMobileMenu();
    initParallaxEffect();
 });
 
 // Фоновые эффекты
 function initBackgroundEffects() {
    // Создаем частицы
    const particlesContainer = document.querySelector('.particles');
    const particlesCount = 50;
 
    for (let i = 0; i < particlesCount; i++) {
        createParticle(particlesContainer);
    }
 
    // Глитч эффект
    setInterval(() => {
        const glitchOverlay = document.querySelector('.glitch-overlay');
        if (Math.random() < 0.1) {
            glitchOverlay.style.display = 'block';
            setTimeout(() => {
                glitchOverlay.style.display = 'none';
            }, 100);
        }
    }, 2000);
 }
 
 function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Случайное позиционирование и анимация
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${10 + Math.random() * 10}s`;
    
    container.appendChild(particle);
 }
 
 // Эффекты для основного заголовка
 function initHeroAnimations() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
 
    // Глитч эффект для текста
    setInterval(() => {
        if (Math.random() < 0.1) {
            const originalText = title.getAttribute('data-text');
            const glitchedText = createGlitchedText(originalText);
            title.textContent = glitchedText;
            
            setTimeout(() => {
                title.textContent = originalText;
            }, 100);
        }
    }, 2000);
 }
 
 function createGlitchedText(text) {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    return text.split('').map(char => 
        Math.random() < 0.3 ? 
        glitchChars[Math.floor(Math.random() * glitchChars.length)] : 
        char
    ).join('');
 }
 
 // Эффекты для игры
 function initGameEffects() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
 
    const ctx = canvas.getContext('2d');
    const game = new BasketballGame(canvas, ctx);
    game.init();
 }
 
 class BasketballGame {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.score = 0;
        this.isPlaying = false;
        this.ball = {
            x: 0,
            y: 0,
            radius: 15,
            speed: { x: 0, y: 0 },
            isMoving: false
        };
        this.hoop = {
            x: 0,
            y: 0,
            width: 60,
            height: 45
        };
    }
 
    init() {
        this.setCanvasSize();
        this.resetBall();
        this.setupEvents();
        this.animate();
    }
 
    setCanvasSize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        // Обновляем позицию кольца
        this.hoop.x = this.canvas.width - 100;
        this.hoop.y = 150;
    }
 
    resetBall() {
        this.ball.x = 100;
        this.ball.y = this.canvas.height - 50;
        this.ball.speed.x = 0;
        this.ball.speed.y = 0;
        this.ball.isMoving = false;
    }
 
    setupEvents() {
        this.canvas.addEventListener('mousedown', this.startDrag.bind(this));
        this.canvas.addEventListener('mousemove', this.drag.bind(this));
        this.canvas.addEventListener('mouseup', this.shoot.bind(this));
        this.canvas.addEventListener('touchstart', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchend', this.shoot.bind(this));
        window.addEventListener('resize', this.setCanvasSize.bind(this));
    }
 
    startDrag(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.isPointInBall(x, y) && !this.ball.isMoving) {
            this.isDragging = true;
            this.dragStart = { x, y };
        }
    }
 
    drag(e) {
        if (!this.isDragging) return;
        
        const rect = this.canvas.getBoundingClientRect();
        this.dragEnd = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
 
    shoot() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.ball.isMoving = true;
        
        const power = 0.15;
        const dx = this.dragStart.x - this.dragEnd.x;
        const dy = this.dragStart.y - this.dragEnd.y;
        
        this.ball.speed.x = dx * power;
        this.ball.speed.y = dy * power;
    }
 
    handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        if (e.type === 'touchstart') {
            this.startDrag({ clientX: touch.clientX, clientY: touch.clientY });
        } else if (e.type === 'touchmove') {
            this.drag({ clientX: touch.clientX, clientY: touch.clientY });
        }
    }
 
 isPointInBall(x, y) {
    const dx = this.ball.x - x;
    const dy = this.ball.y - y;
    return Math.sqrt(dx * dx + dy * dy) <= this.ball.radius;
}

update() {
    if (this.ball.isMoving) {
        // Гравитация
        this.ball.speed.y += 0.5;
        
        // Обновление позиции
        this.ball.x += this.ball.speed.x;
        this.ball.y += this.ball.speed.y;
        
        // Трение
        this.ball.speed.x *= 0.99;
        this.ball.speed.y *= 0.99;
        
        // Проверка столкновений
        this.checkCollisions();
        
        // Проверка попадания
        this.checkHoopCollision();
    }
}

checkCollisions() {
    // Столкновение со стенами
    if (this.ball.x < this.ball.radius) {
        this.ball.x = this.ball.radius;
        this.ball.speed.x *= -0.8;
    }
    if (this.ball.x > this.canvas.width - this.ball.radius) {
        this.ball.x = this.canvas.width - this.ball.radius;
        this.ball.speed.x *= -0.8;
    }
    
    // Столкновение с полом и потолком
    if (this.ball.y < this.ball.radius) {
        this.ball.y = this.ball.radius;
        this.ball.speed.y *= -0.8;
    }
    if (this.ball.y > this.canvas.height - this.ball.radius) {
        this.ball.y = this.canvas.height - this.ball.radius;
        this.ball.speed.y *= -0.8;
        
        // Остановка мяча при малой скорости
        if (Math.abs(this.ball.speed.y) < 0.5) {
            this.ball.isMoving = false;
            this.resetBall();
        }
    }
}

checkHoopCollision() {
    const ballInHoopArea = 
        this.ball.x > this.hoop.x &&
        this.ball.x < this.hoop.x + this.hoop.width &&
        this.ball.y > this.hoop.y &&
        this.ball.y < this.hoop.y + this.hoop.height;
        
    if (ballInHoopArea && this.ball.speed.y > 0) {
        this.score += 2;
        this.updateScore();
        this.createScoreAnimation();
        this.resetBall();
    }
}

updateScore() {
    const scoreElement = document.querySelector('.score-value');
    if (scoreElement) {
        scoreElement.textContent = this.score;
        scoreElement.classList.add('score-updated');
        setTimeout(() => {
            scoreElement.classList.remove('score-updated');
        }, 300);
    }
}

createScoreAnimation() {
    const animation = document.createElement('div');
    animation.className = 'score-animation';
    animation.textContent = '+2';
    animation.style.left = `${this.ball.x}px`;
    animation.style.top = `${this.ball.y}px`;
    
    this.canvas.parentElement.appendChild(animation);
    setTimeout(() => animation.remove(), 1000);
}

drawAimLine() {
    if (this.isDragging && this.dragEnd) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.dragStart.x, this.dragStart.y);
        this.ctx.lineTo(this.dragEnd.x, this.dragEnd.y);
        this.ctx.strokeStyle = '#ff0055';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }
}

draw() {
    // Очистка канваса
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Рисуем кольцо
    this.drawHoop();
    
    // Рисуем мяч
    this.drawBall();
    
    // Рисуем линию прицеливания
    this.drawAimLine();
}

drawHoop() {
    // Щит
    this.ctx.fillStyle = 'rgba(255,255,255,0.1)';
    this.ctx.fillRect(
        this.hoop.x + this.hoop.width,
        this.hoop.y - 30,
        10,
        100
    );
    
    // Кольцо
    this.ctx.beginPath();
    this.ctx.arc(
        this.hoop.x + this.hoop.width / 2,
        this.hoop.y + this.hoop.height / 2,
        this.hoop.width / 2,
        0,
        Math.PI * 2
    );
    this.ctx.strokeStyle = '#ff0055';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    
    // Сетка
    this.drawNet();
}

drawNet() {
    const netStartX = this.hoop.x + this.hoop.width / 2;
    const netStartY = this.hoop.y + this.hoop.height / 2;
    const netLength = 40;
    const segments = 8;
    
    for (let i = 0; i < segments; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(
            netStartX - 20 + (40 / segments) * i,
            netStartY
        );
        this.ctx.lineTo(
            netStartX - 15 + (30 / segments) * i,
            netStartY + netLength
        );
        this.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
}

drawBall() {
    // Мяч
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ff0055';
    this.ctx.fill();
    
    // Линии на мяче
    this.drawBallLines();
}

drawBallLines() {
    const rotation = this.ball.speed.x * 0.1;
    
    // Сохраняем текущее состояние контекста
    this.ctx.save();
    
    // Перемещаем и вращаем контекст
    this.ctx.translate(this.ball.x, this.ball.y);
    this.ctx.rotate(rotation);
    
    // Горизонтальная линия
    this.ctx.beginPath();
    this.ctx.moveTo(-this.ball.radius, 0);
    this.ctx.lineTo(this.ball.radius, 0);
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Вертикальная линия
    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.ball.radius);
    this.ctx.lineTo(0, this.ball.radius);
    this.ctx.stroke();
    
    // Восстанавливаем состояние контекста
    this.ctx.restore();
}

// Метод анимации
animate() {
    // Обновляем состояние
    this.update();
    // Отрисовываем
    this.draw();
    // Запрашиваем следующий кадр
    requestAnimationFrame(() => this.animate());
}
}
