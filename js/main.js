// main.js
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initBasketballGame();
    initTickerAnimation();
    initGlitchEffects();
});

// Создание частиц для фона
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particlesCount = 50;

    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Рандомное позиционирование
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.opacity = Math.random();
        
        particlesContainer.appendChild(particle);
    }
}

// Баскетбольная игра
class BasketballGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.isPlaying = false;
        this.ball = {
            x: 0,
            y: 0,
            radius: 15,
            speed: { x: 0, y: 0 },
            gravity: 0.5,
            friction: 0.99
        };
        this.hoop = {
            x: 0,
            y: 0,
            width: 60,
            height: 45
        };

        this.init();
    }

    init() {
        // Установка размеров канваса
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Начальная позиция мяча
        this.resetBall();

        // Позиция кольца
        this.hoop.x = this.canvas.width - 100;
        this.hoop.y = 150;

        // События
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());

        // Старт анимации
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    resetBall() {
        this.ball.x = 100;
        this.ball.y = this.canvas.height - 50;
        this.ball.speed.x = 0;
        this.ball.speed.y = 0;
    }

    handleMouseDown(e) {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.isDragging = true;
            this.dragStart = {
                x: e.offsetX,
                y: e.offsetY
            };
        }
    }

    handleMouseMove(e) {
        if (this.isDragging) {
            this.dragEnd = {
                x: e.offsetX,
                y: e.offsetY
            };
            this.drawAimLine();
        }
    }

    handleMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            this.shoot();
        }
    }

    shoot() {
        const power = 0.15;
        const dx = this.dragStart.x - this.dragEnd.x;
        const dy = this.dragStart.y - this.dragEnd.y;
        
        this.ball.speed.x = dx * power;
        this.ball.speed.y = dy * power;
    }

    update() {
        if (this.isPlaying) {
            // Применяем гравитацию
            this.ball.speed.y += this.ball.gravity;
            
            // Применяем трение
            this.ball.speed.x *= this.ball.friction;
            this.ball.speed.y *= this.ball.friction;
            
            // Обновляем позицию
            this.ball.x += this.ball.speed.x;
            this.ball.y += this.ball.speed.y;
            
            // Проверяем столкновения со стенами
            this.checkWallCollision();
            
            // Проверяем попадание в кольцо
            this.checkHoopCollision();
        }
    }

    checkWallCollision() {
        // Столкновение с полом
        if (this.ball.y + this.ball.radius > this.canvas.height) {
            this.ball.y = this.canvas.height - this.ball.radius;
            this.ball.speed.y *= -0.6;
        }
        
        // Столкновение со стенами
        if (this.ball.x + this.ball.radius > this.canvas.width || 
            this.ball.x - this.ball.radius < 0) {
            this.ball.speed.x *= -0.6;
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
        document.querySelector('.score span').textContent = this.score;
    }

    createScoreAnimation() {
        const anim = document.createElement('div');
        anim.className = 'score-popup';
        anim.textContent = '+2';
        document.body.appendChild(anim);
        setTimeout(() => anim.remove(), 1000);
    }

    drawAimLine() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.dragStart.x, this.dragStart.y);
        this.ctx.lineTo(this.dragEnd.x, this.dragEnd.y);
        this.ctx.strokeStyle = '#ff0055';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    draw() {
        // Очищаем канвас
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Рисуем кольцо
        this.ctx.beginPath();
        this.ctx.rect(this.hoop.x, this.hoop.y, this.hoop.width, this.hoop.height);
        this.ctx.strokeStyle = '#ff0055';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Рисуем мяч
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ff0055';
        this.ctx.fill();
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

function initBasketballGame() {
    new BasketballGame();
}

// Эффекты текста и анимации
function initGlitchEffects() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        setInterval(() => {
            if (Math.random() < 0.1) {
                text.style.textShadow = `
                    2px 2px var(--primary),
                    -2px -2px var(--secondary)
                `;
                
                setTimeout(() => {
                    text.style.textShadow = 'none';
                }, 100);
            }
        }, 2000);
    });
}

function initTickerAnimation() {
    const ticker = document.querySelector('.ticker-content');
    const clone = ticker.cloneNode(true);
    ticker.parentNode.appendChild(clone);
}
