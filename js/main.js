document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
 });
 
 // Основные частицы
 function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particlesCount = 50;
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
 
    for (let i = 0; i < particlesCount; i++) {
        createParticle(particlesContainer);
    }
 }
 
 function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Рандомные параметры
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${10 + Math.random() * 10}s`;
    
    container.appendChild(particle);
 }
 
 // Баскетбольная игра
 class BasketballGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.isPlaying = false;
        this.isDragging = false;
        
        // Инициализация мяча
        this.ball = {
            x: 0,
            y: 0,
            radius: 15,
            speed: { x: 0, y: 0 },
            gravity: 0.5,
            friction: 0.99,
            isMoving: false
        };
 
        // Инициализация кольца
        this.hoop = {
            x: 0,
            y: 0,
            width: 60,
            height: 45,
            rimWidth: 5
        };
 
        this.init();
    }
 
    init() {
        this.setCanvasSize();
        this.resetBall();
        this.setupHoop();
        this.bindEvents();
        this.animate();
    }
 
    setCanvasSize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
 
    setupHoop() {
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
 
    bindEvents() {
        this.canvas.addEventListener('mousedown', (e) => this.startDrag(e));
        this.canvas.addEventListener('mousemove', (e) => this.drag(e));
        this.canvas.addEventListener('mouseup', () => this.shoot());
        window.addEventListener('resize', () => this.setCanvasSize());
    }
 
    startDrag(e) {
        if (!this.ball.isMoving) {
            this.isDragging = true;
            this.dragStart = {
                x: e.offsetX,
                y: e.offsetY
            };
        }
    }
 
    drag(e) {
        if (this.isDragging) {
            const rect = this.canvas.getBoundingClientRect();
            this.dragEnd = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
    }
 
    shoot() {
        if (this.isDragging) {
            this.isDragging = false;
            this.ball.isMoving = true;
 
            // Расчет силы броска
            const dx = this.dragStart.x - this.dragEnd.x;
            const dy = this.dragStart.y - this.dragEnd.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Ограничение максимальной силы
            const maxPower = 20;
            const power = Math.min(distance / 10, maxPower);
            
            this.ball.speed.x = (dx / distance) * power;
            this.ball.speed.y = (dy / distance) * power;
        }
    }
 
    update() {
        if (this.ball.isMoving) {
            // Физика
            this.ball.speed.y += this.ball.gravity;
            this.ball.x += this.ball.speed.x;
            this.ball.y += this.ball.speed.y;
 
            // Трение
            this.ball.speed.x *= this.ball.friction;
            this.ball.speed.y *= this.ball.friction;
 
            // Коллизии
            this.checkWallCollision();
            this.checkHoopCollision();
 
            // Сброс мяча если улетел
            if (this.ball.y > this.canvas.height + 50) {
                this.resetBall();
            }
        }
    }
 
    checkWallCollision() {
        // Боковые стены
        if (this.ball.x < this.ball.radius || 
            this.ball.x > this.canvas.width - this.ball.radius) {
            this.ball.speed.x *= -0.7;
        }
 
        // Пол и потолок
        if (this.ball.y < this.ball.radius || 
            this.ball.y > this.canvas.height - this.ball.radius) {
            this.ball.speed.y *= -0.7;
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
            this.showScoreAnimation();
        }
    }
 
    updateScore() {
        const scoreElement = document.querySelector('.score span');
        scoreElement.textContent = this.score;
    }
 
    showScoreAnimation() {
        const scoreAnim = document.createElement('div');
        scoreAnim.className = 'score-popup';
        scoreAnim.textContent = '+2';
        scoreAnim.style.left = `${this.ball.x}px`;
        scoreAnim.style.top = `${this.ball.y}px`;
        document.body.appendChild(scoreAnim);
        
        setTimeout(() => scoreAnim.remove(), 1000);
    }
 
    draw() {
        // Очистка канваса
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 
        // Рисуем кольцо
        this.drawHoop();
        
        // Рисуем мяч
        this.drawBall();
 
        // Рисуем линию прицеливания
        if (this.isDragging && this.dragEnd) {
            this.drawAimLine();
        }
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
    }
 
    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.ball.x,
            this.ball.y,
            this.ball.radius,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = '#ff0055';
        this.ctx.fill();
 
        // Линии на мяче
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
 
    drawAimLine() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.dragStart.x, this.dragStart.y);
        this.ctx.lineTo(this.dragEnd.x, this.dragEnd.y);
        this.ctx.strokeStyle = 'rgba(255,0,85,0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
 
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
 }
 
 // Инициализация всех компонентов
 function initBasketballGame() {
    new BasketballGame();
 }
 
 // NBA Widget
class NBAWidget {
    constructor() {
        this.container = document.querySelector('.scores-grid');
        this.teams = {
            'LAL': { name: 'Lakers', color: '#552583' },
            'BOS': { name: 'Celtics', color: '#008348' },
            'GSW': { name: 'Warriors', color: '#1D428A' },
            'MIA': { name: 'Heat', color: '#98002E' },
            'CHI': { name: 'Bulls', color: '#CE1141' }
        };
        this.init();
    }

    async init() {
        await this.fetchScores();
        this.startAutoRefresh();
    }

    async fetchScores() {
        // В реальном проекте здесь был бы API запрос
        const mockGames = [
            {
                homeTeam: 'LAL',
                awayTeam: 'BOS',
                homeScore: Math.floor(Math.random() * 30) + 90,
                awayScore: Math.floor(Math.random() * 30) + 90,
                quarter: 4,
                timeLeft: '2:45'
            },
            {
                homeTeam: 'GSW',
                awayTeam: 'MIA',
                homeScore: Math.floor(Math.random() * 30) + 90,
                awayScore: Math.floor(Math.random() * 30) + 90,
                quarter: 3,
                timeLeft: '5:18'
            }
        ];

        this.updateScores(mockGames);
    }

    updateScores(games) {
        this.container.innerHTML = games.map(game => this.createScoreCard(game)).join('');
    }

    createScoreCard(game) {
        return `
            <div class="game-score-card">
                <div class="team home" style="border-color: ${this.teams[game.homeTeam].color}">
                    <div class="team-info">
                        <span class="team-name">${this.teams[game.homeTeam].name}</span>
                        <span class="team-score">${game.homeScore}</span>
                    </div>
                </div>
                <div class="game-status">
                    <div class="quarter">Q${game.quarter}</div>
                    <div class="time">${game.timeLeft}</div>
                </div>
                <div class="team away" style="border-color: ${this.teams[game.awayTeam].color}">
                    <div class="team-info">
                        <span class="team-name">${this.teams[game.awayTeam].name}</span>
                        <span class="team-score">${game.awayScore}</span>
                    </div>
                </div>
            </div>
        `;
    }

    startAutoRefresh() {
        setInterval(() => this.fetchScores(), 30000);
    }
}

// Facts Game
class BasketballFacts {
    constructor() {
        this.facts = [
            "Баскетбол был изобретен в 1891 году Джеймсом Нейсмитом",
            "Первый профессиональный матч состоялся в 1896 году",
            "Высота кольца составляет 3.05 метра",
            "Мировой рекорд по трехочковым подряд: 193 попадания",
            "Карим Абдул-Джаббар набрал 38,387 очков за карьеру",
            "Уилт Чемберлен набрал 100 очков в одной игре",
            "Первоначально в баскетбол играли футбольным мячом",
            "NBA была основана 6 июня 1946 года",
            "Самая результативная игра в истории: 186-184",
            "Размер баскетбольной площадки в NBA: 28.65 × 15.24 метра"
        ];
        
        this.currentFact = '';
        this.box = document.querySelector('.mystery-box');
        this.factText = document.querySelector('.fact-text');
        this.button = document.querySelector('.fact-button');
        
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.revealFact());
    }

    revealFact() {
        if (this.button.disabled) return;
        
        this.button.disabled = true;
        
        // Выбираем новый факт
        let newFact;
        do {
            newFact = this.facts[Math.floor(Math.random() * this.facts.length)];
        } while (newFact === this.currentFact);
        
        this.currentFact = newFact;

        // Анимация открытия
        this.box.classList.add('opening');
        
        setTimeout(() => {
            this.factText.style.opacity = '0';
            
            setTimeout(() => {
                this.factText.textContent = this.currentFact;
                this.factText.style.opacity = '1';
                
                this.box.classList.add('opened');
                
                setTimeout(() => {
                    this.box.classList.remove('opening', 'opened');
                    this.button.disabled = false;
                }, 3000);
            }, 300);
        }, 500);
    }
}

// Визуальные эффекты
class VisualEffects {
    constructor() {
        this.initGlitchEffect();
        this.initParallaxEffect();
    }

    initGlitchEffect() {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        
        glitchTexts.forEach(text => {
            setInterval(() => {
                if (Math.random() < 0.1) {
                    text.style.textShadow = `
                        2px 2px var(--primary),
                        -2px -2px var(--secondary)
                    `;
                    
                    setTimeout(() => {
                        text.style.textShadow = '';
                    }, 100);
                }
            }, 2000);
        });
    }

    initParallaxEffect() {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            document.querySelectorAll('[data-parallax]').forEach(el => {
                const speed = el.dataset.parallax || 0.1;
                const x = (centerX - clientX) * speed;
                const y = (centerY - clientY) * speed;
                
                el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        });
    }
}

// Инициализация всего
document.addEventListener('DOMContentLoaded', () => {
    new BasketballGame();
    new BasketballFacts();
    new NBAWidget();
    new VisualEffects();
    
    // Дополнительные инициализации
    initParticles();
    initCategoryCards();
});

function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function initCategoryCards() {
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            const rotateX = (y - 0.5) * 20;
            const rotateY = (x - 0.5) * 20;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
