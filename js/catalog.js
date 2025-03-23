// catalog.js - Функциональность каталога, корзины и оформления заказа

// Данные о товарах (в реальном проекте будет загружаться с сервера)
const productsData = [
    {
        id: 1,
        name: "Li Ning WOW 10 HIGH",
        category: "shoes",
        brand: "lining",
        price: 2500000,
        oldPrice: null,
        images: ["images/products/product1.jpg", "images/products/product1-2.jpg", "images/products/product1-3.jpg"],
        description: "Профессиональные баскетбольные кроссовки Li Ning WOW 10, созданы с использованием инновационных технологий для максимальной производительности на площадке.",
        sizes: ["40", "41", "42", "43", "44", "45"],
        colors: ["ELEMENT", "SOUTH BEACH", "CAUTION"],
        inStock: true,
        isNew: true,
        isBestseller: false,
        discount: null
    },
    {
        id: 2,
        name: "Wilson 3x3 Official FIBA Basketball",
        category: "balls",
        brand: "wilson",
        price: 535000,
        oldPrice: null,
        images: ["images/products/product2.jpg", "images/products/product2-2.jpg"],
        description: "Официальный баскетбольный мяч для соревнований 3x3 FIBA. Прочный и долговечный, обеспечивает отличное сцепление и контроль.",
        sizes: ["7"],
        colors: ["Оранжевый"],
        inStock: true,
        isNew: false,
        isBestseller: true,
        discount: null
    },
    {
        id: 3,
        name: "Nike Dri-FIT Elite",
        category: "uniform",
        brand: "nike",
        price: 850000,
        oldPrice: 999000,
        images: ["images/products/product3.jpg", "images/products/product3-2.jpg"],
        description: "Профессиональная баскетбольная форма с технологией Dri-FIT для максимального комфорта и производительности.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Фиолетовый/Желтый", "Черный/Белый", "Красный/Белый"],
        inStock: true,
        isNew: false,
        isBestseller: false,
        discount: 15
    },
    {
        id: 4,
        name: "Under Armour Compression Sleeve",
        category: "accessories",
        brand: "under-armour",
        price: 210000,
        oldPrice: null,
        images: ["images/products/product4.jpg"],
        description: "Компрессионный рукав Under Armour для защиты и поддержки руки во время игры.",
        sizes: ["S/M", "L/XL"],
        colors: ["Черный", "Белый", "Красный", "Синий"],
        inStock: true,
        isNew: false,
        isBestseller: false,
        discount: null
    },
    {
        id: 5,
        name: "Basketball Shaped Keychain",
        category: "merch",
        brand: "spalding",
        price: 65000,
        oldPrice: null,
        images: ["images/products/product5.jpg"],
        description: "Стильный брелок в форме баскетбольного мяча Spalding.",
        sizes: ["Универсальный"],
        colors: ["Оранжевый"],
        inStock: true,
        isNew: false,
        isBestseller: false,
        discount: null
    },
    {
        id: 6,
        name: "Jordan Zion 3",
        category: "shoes",
        brand: "jordan",
        price: 2100000,
        oldPrice: null,
        images: ["images/products/product6.jpg", "images/products/product6-2.jpg"],
        description: "Баскетбольные кроссовки Jordan Zion 3, разработанные специально для игроков, ценящих скорость и мощь.",
        sizes: ["40", "41", "42", "43", "44", "45", "46"],
        colors: ["Черный/Красный", "Белый/Красный", "Синий/Черный"],
        inStock: true,
        isNew: true,
        isBestseller: true,
        discount: null
    },
    {
        id: 7,
        name: "Spalding NBA Official Game Ball",
        category: "balls",
        brand: "spalding",
        price: 1500000,
        oldPrice: 1800000,
        images: ["images/products/product7.jpg"],
        description: "Официальный игровой мяч NBA. Высочайшее качество, используется в профессиональных играх.",
        sizes: ["7"],
        colors: ["Оранжевый"],
        inStock: true,
        isNew: false,
        isBestseller: true,
        discount: 17
    },
    {
        id: 8,
        name: "Adidas Reversible Practice Jersey",
        category: "uniform",
        brand: "adidas",
        price: 650000,
        oldPrice: null,
        images: ["images/products/product8.jpg"],
        description: "Двусторонняя тренировочная майка Adidas, идеально подходит для командных тренировок.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Черный/Белый", "Синий/Красный"],
        inStock: true,
        isNew: false,
        isBestseller: false,
        discount: null
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры URL для фильтрации
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // Обновляем заголовок и хлебные крошки на основе выбранной категории
    updateCategoryInfo(category);
    
    // Активируем соответствующую вкладку в навигации категорий
    activateCurrentCategoryTab(category);
    
    // Фильтруем товары по категории
    filterProductsByCategory(category);
    
    // Инициализация интерактивных элементов
    initModals();
    initProductCards();
    initFilters();
    initCart();
});

// Обновление информации о категории в заголовке
function updateCategoryInfo(category) {
    const categoryTitle = document.querySelector('.category-title');
    const currentCategory = document.querySelector('.current-category');
    
    if (!categoryTitle || !currentCategory) return;
    
    let title = 'КАТАЛОГ';
    let breadcrumb = 'Каталог';
    
    // Определяем название категории
    if (category) {
        switch(category) {
            case 'shoes':
                title = 'КРОССОВКИ';
                breadcrumb = 'Кроссовки';
                break;
            case 'balls':
                title = 'МЯЧИ';
                breadcrumb = 'Мячи';
                break;
            case 'uniform':
                title = 'ФОРМА';
                breadcrumb = 'Форма';
                break;
            case 'accessories':
                title = 'АКСЕССУАРЫ';
                breadcrumb = 'Аксессуары';
                break;
            case 'merch':
                title = 'ФИГНЯ';
                breadcrumb = 'Фигня';
                break;
        }
    }
    
    // Обновляем заголовок и хлебные крошки
    categoryTitle.textContent = title;
    categoryTitle.setAttribute('data-text', title);
    currentCategory.textContent = breadcrumb;
}

// Активация текущей вкладки категории
function activateCurrentCategoryTab(category) {
    const categoryTabs = document.querySelectorAll('.category-nav-item');
    
    categoryTabs.forEach(tab => {
        tab.classList.remove('active');
        
        if (!category && tab.dataset.category === 'all') {
            tab.classList.add('active');
        } else if (category && tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
}

// Фильтрация товаров по категории
function filterProductsByCategory(category) {
    let filteredProducts = [...productsData];
    
    // Если указана категория, фильтруем товары
    if (category) {
        filteredProducts = productsData.filter(product => product.category === category);
    }
    
    // Отображаем отфильтрованные товары
    renderProducts(filteredProducts);
}

// Отрисовка товаров в каталоге
function renderProducts(products) {
    const catalogContainer = document.querySelector('.catalog-container');
    if (!catalogContainer) return;
    
    // Очищаем контейнер
    catalogContainer.innerHTML = '';
    
    // Проверяем, есть ли товары
    if (products.length === 0) {
        catalogContainer.innerHTML = '<div class="no-products">По вашему запросу ничего не найдено</div>';
        return;
    }
    
    // Отрисовываем карточки товаров
    products.forEach(product => {
        // Формируем теги (новинка, хит продаж, скидка)
        let tags = '';
        if (product.isNew) {
            tags += '<span class="tag tag-new">NEW</span>';
        }
        if (product.isBestseller) {
            tags += '<span class="tag tag-bestseller">ХИТ</span>';
        }
        if (product.discount) {
            tags += `<span class="tag tag-sale">-${product.discount}%</span>`;
        }
        
        // Форматируем цены
        const price = formatPrice(product.price);
        const oldPrice = product.oldPrice ? formatPrice(product.oldPrice) : '';
        
        // Создаем карточку товара
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                ${tags ? `<div class="product-tags">${tags}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${getCategoryName(product.category)}</p>
                <div class="product-price">
                    ${product.oldPrice ? `<span class="old-price">${oldPrice} сум</span>` : ''}
                    <span class="current-price">${price} сум</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="view-product-btn" data-id="${product.id}">
                    <i class="fas fa-eye"></i>
                    <span>Подробнее</span>
                </button>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    <span>В корзину</span>
                </button>
            </div>
        `;
        
        catalogContainer.appendChild(productCard);
    });
}

// Форматирование цены
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Получение названия категории
function getCategoryName(category) {
    const categories = {
        'shoes': 'Кроссовки',
        'balls': 'Мячи',
        'uniform': 'Форма',
        'accessories': 'Аксессуары',
        'merch': 'Фигня'
    };
    return categories[category] || category;
}

// Инициализация карточек товаров
function initProductCards() {
    // Делегирование обработчика клика для кнопок просмотра товара
    document.addEventListener('click', function(e) {
        // Кнопка "Подробнее"
        if (e.target.closest('.view-product-btn')) {
            const button = e.target.closest('.view-product-btn');
            const productId = parseInt(button.dataset.id);
            openProductModal(productId);
        }
        
        // Кнопка "В корзину" на карточке товара
        if (e.target.closest('.add-to-cart-btn')) {
            const button = e.target.closest('.add-to-cart-btn');
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        }
    });
}

// Инициализация модальных окон
function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Закрытие модального окна по клику на кнопку закрытия
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
        
        // Закрытие модального окна по клику вне контента
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Открытие корзины по клику на иконку
    const cartButton = document.querySelector('.cart-btn');
    const cartModal = document.querySelector('.cart-modal');
    
    if (cartButton && cartModal) {
        cartButton.addEventListener('click', () => {
            cartModal.classList.add('active');
            renderCart();
        });
    }
}

// Функция открытия модального окна товара - доработанная версия
function openProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const productModal = document.querySelector('.product-modal');
    if (!productModal) return;
    
    const productDetails = productModal.querySelector('.product-details');
    
    // Создаем галерею изображений, если есть несколько фото
    let imagesGallery = '';
    if (product.images.length > 1) {
        imagesGallery = `
            <div class="product-thumbnails">
                ${product.images.map((img, index) => 
                    `<div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                        <img src="${img}" alt="${product.name} - изображение ${index + 1}">
                    </div>`
                ).join('')}
            </div>
        `;
    }
    
    // Формируем варианты размеров
    const sizeOptions = product.sizes.map(size => 
        `<button class="size-option" data-size="${size}">${size}</button>`
    ).join('');
    
    // Формируем варианты цветов
    const colorOptions = product.colors.map(color => 
        `<button class="color-option" data-color="${color}">${color}</button>`
    ).join('');
    
    // Определяем дисконтный тег
    let discountTag = '';
    if (product.discount) {
        discountTag = `<div class="product-discount">-${product.discount}%</div>`;
    }
    
    // Форматируем цены
    const price = formatPrice(product.price);
    const oldPrice = product.oldPrice ? formatPrice(product.oldPrice) : '';
    
    // Формируем HTML для модального окна товара
    productDetails.innerHTML = `
        <div class="product-modal-layout">
            <div class="product-modal-image">
                <div class="main-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                    ${discountTag}
                </div>
                ${imagesGallery}
            </div>
            <div class="product-modal-info">
                <h2 class="product-modal-title">${product.name}</h2>
                <p class="product-modal-category">${getCategoryName(product.category)}</p>
                <div class="product-modal-price">
                    ${product.oldPrice ? `<span class="old-price">${oldPrice} сум</span>` : ''}
                    <span class="current-price">${price} сум</span>
                </div>
                
                <div class="product-modal-description">
                    <p>${product.description}</p>
                </div>
                
                <div class="product-modal-options">
                    <div class="option-group">
                        <h4>Размер:</h4>
                        <div class="size-options">
                            ${sizeOptions}
                        </div>
                    </div>
                    
                    <div class="option-group">
                        <h4>Цвет:</h4>
                        <div class="color-options">
                            ${colorOptions}
                        </div>
                    </div>
                    
                    <div class="option-group">
                        <h4>Количество:</h4>
                        <div class="quantity-selector">
                            <button class="quantity-btn minus-btn">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="10">
                            <button class="quantity-btn plus-btn">+</button>
                        </div>
                    </div>
                </div>
                
                <div class="product-modal-actions">
                    <button class="modal-add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Добавить в корзину</span>
                    </button>
                </div>
                
                <div class="product-modal-info-additional">
                    <div class="info-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${product.inStock ? 'В наличии' : 'Нет в наличии'}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-truck"></i>
                        <span>Доставка: 1-3 недели</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>Гарантия подлинности</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем обработчики событий для опций товара
    
    // Обработчики для галереи изображений, если она есть
    const thumbnails = productDetails.querySelectorAll('.thumbnail');
    const mainImage = productDetails.querySelector('.main-image img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Убираем активный класс со всех миниатюр
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс на выбранную миниатюру
            thumb.classList.add('active');
            
            // Меняем основное изображение
            mainImage.src = thumb.dataset.image;
            
            // Добавляем анимацию
            mainImage.classList.add('image-change');
            setTimeout(() => {
                mainImage.classList.remove('image-change');
            }, 500);
        });
    });
    
    // Выбор размера
    const sizeOptionsElems = productDetails.querySelectorAll('.size-option');
    sizeOptionsElems.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptionsElems.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Выбор цвета
    const colorOptionsElems = productDetails.querySelectorAll('.color-option');
    colorOptionsElems.forEach(option => {
        option.addEventListener('click', () => {
            colorOptionsElems.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Изменение количества
    const quantityInput = productDetails.querySelector('.quantity-input');
    const minusBtn = productDetails.querySelector('.minus-btn');
    const plusBtn = productDetails.querySelector('.plus-btn');
    
    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Прямой ввод количества с валидацией
    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }
        quantityInput.value = value;
    });
    
    // Кнопка добавления в корзину из модального окна
    const addToCartBtn = productDetails.querySelector('.modal-add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        // Получаем выбранный размер и цвет
        const selectedSize = productDetails.querySelector('.size-option.selected')?.dataset.size || product.sizes[0];
        const selectedColor = productDetails.querySelector('.color-option.selected')?.dataset.color || product.colors[0];
        const quantity = parseInt(quantityInput.value) || 1;
        
        // Добавляем товар в корзину
        addToCart(product.id, quantity, selectedSize, selectedColor);
        
        // Закрываем модальное окно
        productModal.classList.remove('active');
        
        // Показываем уведомление
        showNotification(`Товар "${product.name}" добавлен в корзину`);
    });
    
    // Выбираем первые размер и цвет по умолчанию
    if (sizeOptionsElems.length > 0) {
        sizeOptionsElems[0].classList.add('selected');
    }
    
    if (colorOptionsElems.length > 0) {
        colorOptionsElems[0].classList.add('selected');
    }
    
    // Показываем модальное окно с анимацией
    productModal.classList.add('active');
    
    // Добавляем анимацию появления
    const modalContent = productModal.querySelector('.modal-content');
    modalContent.classList.add('modal-enter');
    setTimeout(() => {
        modalContent.classList.remove('modal-enter');
    }, 300);
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    const container = document.querySelector('.notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Выбор иконки в зависимости от типа уведомления
    let icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'info') icon = 'info-circle';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Добавляем уведомление в контейнер
    container.appendChild(notification);
    
    // Добавляем обработчик для закрытия уведомления по клику
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.add('fadeOut');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Автоматически скрываем уведомление через 5 секунд
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('fadeOut');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// ======== КОРЗИНА ========

// Инициализация корзины
function initCart() {
    // Создаем корзину в localStorage, если её нет
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Обновляем счетчик товаров в корзине
    updateCartCount();
    
    // Инициализация обработчиков для модального окна корзины
    const cartModal = document.querySelector('.cart-modal');
    if (!cartModal) return;
    
    // Делегирование обработчиков для кнопок в корзине
    cartModal.addEventListener('click', e => {
        // Кнопка удаления товара
        if (e.target.closest('.cart-item-remove')) {
            const button = e.target.closest('.cart-item-remove');
            const index = parseInt(button.dataset.index);
            removeFromCart(index);
        }
        
        // Кнопка уменьшения количества
        if (e.target.closest('.cart-minus-btn')) {
            const button = e.target.closest('.cart-minus-btn');
            const index = parseInt(button.dataset.index);
            decreaseQuantity(index);
        }
        
        // Кнопка увеличения количества
        if (e.target.closest('.cart-plus-btn')) {
            const button = e.target.closest('.cart-plus-btn');
            const index = parseInt(button.dataset.index);
            increaseQuantity(index);
        }
        
        // Кнопка оформления заказа
        if (e.target.closest('.checkout-btn')) {
            openCheckoutModal();
        }
    });
    
    // Инициализация обработчиков для модального окна оформления заказа
    initCheckoutModal();
}

// Обновление счетчика товаров в корзине
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Показываем/скрываем счетчик в зависимости от количества товаров
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Добавление товара в корзину
function addToCart(productId, quantity = 1, size = null, color = null) {
    // Находим товар по ID
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    // Получаем текущую корзину
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Если не указаны размер и цвет, берем первые значения из доступных
    if (!size) size = product.sizes[0];
    if (!color) color = product.colors[0];
    
    // Проверяем, есть ли такой товар уже в корзине
    const existingItemIndex = cart.findIndex(item => 
        item.productId === productId && item.size === size && item.color === color
    );
    
    if (existingItemIndex !== -1) {
        // Увеличиваем количество существующего товара
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Добавляем новый товар
        cart.push({
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
            size: size,
            color: color
        });
    }
    
    // Сохраняем корзину и обновляем интерфейс
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Показываем уведомление
    showNotification(`Товар "${product.name}" добавлен в корзину`);
}

// Отображение корзины
function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElem = document.querySelector('.cart-modal .total-price');
    const checkoutBtn = document.querySelector('.cart-modal .checkout-btn');
    
    if (!cartItems || !totalPriceElem || !checkoutBtn) return;
    
    // Получаем данные корзины
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Очищаем содержимое контейнера
    cartItems.innerHTML = '';
    
    // Если корзина пуста, показываем соответствующее сообщение
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Ваша корзина пуста</div>';
        totalPriceElem.textContent = '0 сум';
        checkoutBtn.disabled = true;
        return;
    }
    
    // Включаем кнопку оформления заказа
    checkoutBtn.disabled = false;
    
    // Считаем общую стоимость
    let totalPrice = 0;
    
    // Выводим товары
    cart.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;
        
        // Создаем элемент товара в корзине
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-params">
                    <span>Размер: ${item.size}</span>
                    <span>Цвет: ${item.color}</span>
                </div>
                <div class="cart-item-price">${formatPrice(item.price)} сум</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn cart-minus-btn" data-index="${index}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn cart-plus-btn" data-index="${index}">+</button>
            </div>
            <div class="cart-item-total">${formatPrice(itemTotalPrice)} сум</div>
            <button class="cart-item-remove" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Обновляем итоговую стоимость
    totalPriceElem.textContent = `${formatPrice(totalPrice)} сум`;
}

// Удаление товара из корзины
function removeFromCart(index) {
    // Получаем данные корзины
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Проверяем существование индекса
    if (index < 0 || index >= cart.length) return;
    
    // Сохраняем имя товара для уведомления
    const itemName = cart[index].name;
    
    // Удаляем товар из корзины
    cart.splice(index, 1);
    
    // Сохраняем обновленную корзину
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем отображение
    renderCart();
    updateCartCount();
    
    // Показываем уведомление
    showNotification(`Товар "${itemName}" удален из корзины`);
}

// Уменьшение количества товара
function decreaseQuantity(index) {
    // Получаем данные корзины
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Проверяем существование индекса
    if (index < 0 || index >= cart.length) return;
    
    // Если количество больше 1, уменьшаем
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        
        // Сохраняем обновленную корзину
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Обновляем отображение
        renderCart();
        updateCartCount();
    } else {
        // Если количество = 1, удаляем товар
        removeFromCart(index);
    }
}

// Увеличение количества товара
function increaseQuantity(index) {
    // Получаем данные корзины
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Проверяем существование индекса
    if (index < 0 || index >= cart.length) return;
    
    // Увеличиваем количество (максимум до 10)
    if (cart[index].quantity < 10) {
        cart[index].quantity += 1;
        
        // Сохраняем обновленную корзину
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Обновляем отображение
        renderCart();
        updateCartCount();
    }
}

// Инициализация модального окна оформления заказа
function initCheckoutModal() {
    const checkoutModal = document.querySelector('.checkout-modal');
    const checkoutForm = document.querySelector('#checkout-form');
    
    if (!checkoutModal || !checkoutForm) return;
    
    // Обработчик для выбора способа оплаты
    const paymentMethods = checkoutModal.querySelectorAll('.payment-method');
    const paymentInput = checkoutModal.querySelector('#payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            // Удаляем класс selected у всех методов
            paymentMethods.forEach(m => m.classList.remove('selected'));
            
            // Добавляем класс selected выбранному методу
            method.classList.add('selected');
            
            // Сохраняем значение в скрытом поле
            paymentInput.value = method.dataset.payment;
        });
    });
    
    // Обработчик отправки формы
    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Проверяем, что выбран способ оплаты
        if (!paymentInput.value) {
            showNotification('Пожалуйста, выберите способ оплаты', 'error');
            return;
        }
        
        // Получаем данные формы
        const formData = new FormData(checkoutForm);
        const orderData = {
            customer: {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email')
            },
            delivery: {
                address: formData.get('address'),
                method: formData.get('delivery')
            },
            payment: formData.get('payment'),
            comment: formData.get('comment'),
            cart: JSON.parse(localStorage.getItem('cart') || '[]'),
            total: calculateTotal(),
            date: new Date().toISOString(),
            id: generateOrderId()
        };
        
        // Отправляем заказ (в реальном проекте - на сервер)
        submitOrder(orderData);
    });
}

// Открытие модального окна оформления заказа
function openCheckoutModal() {
    const checkoutModal = document.querySelector('.checkout-modal');
    const cartModal = document.querySelector('.cart-modal');
    
    if (!checkoutModal) return;
    
    // Закрываем модальное окно корзины
    if (cartModal) {
        cartModal.classList.remove('active');
    }
    
    // Обновляем данные в оформлении заказа
    updateCheckoutData();
    
    // Показываем модальное окно оформления заказа
    checkoutModal.classList.add('active');
}

// Обновление данных в модальном окне оформления заказа
function updateCheckoutData() {
    const summaryItems = document.querySelector('.checkout-summary-items');
    const totalAmount = document.querySelector('.checkout-summary .total-amount');
    
    if (!summaryItems || !totalAmount) return;
    
    // Получаем данные корзины
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Очищаем содержимое
    summaryItems.innerHTML = '';
    
    // Добавляем товары
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        
        itemElement.innerHTML = `
            <span>${item.name} (${item.size}, ${item.color}) x${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)} сум</span>
        `;
        
        summaryItems.appendChild(itemElement);
    });
    
    // Обновляем итоговую сумму
    totalAmount.textContent = `${formatPrice(calculateTotal())} сум`;
}

// Расчет итоговой стоимости корзины
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Генерация ID заказа
function generateOrderId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Отправка заказа
function submitOrder(orderData) {
    // В реальном проекте здесь был бы AJAX-запрос на сервер
    console.log('Отправка заказа:', orderData);
    
    // Симулируем отправку
    setTimeout(() => {
        // Очищаем корзину
        localStorage.setItem('cart', JSON.stringify([]));
        
        // Обновляем счетчик корзины
        updateCartCount();
        
        // Закрываем модальное окно оформления заказа
        const checkoutModal = document.querySelector('.checkout-modal');
        if (checkoutModal) {
            checkoutModal.classList.remove('active');
        }
        
        // Показываем модальное окно успешного оформления заказа
        showSuccessModal(orderData.id);
        
        // Отправляем уведомление в Telegram (если настроено)
        sendTelegramNotification(orderData);
    }, 1500);
}

// Показ модального окна успешного оформления заказа
function showSuccessModal(orderId) {
    const successModal = document.querySelector('.success-modal');
    const orderNumber = successModal?.querySelector('.order-number');
    
    if (!successModal || !orderNumber) return;
    
    // Обновляем номер заказа
    orderNumber.textContent = `#${orderId}`;
    
    // Показываем модальное окно
    successModal.classList.add('active');
    
    // Добавляем обработчик для кнопки "Вернуться к покупкам"
    const continueButton = successModal.querySelector('.success-button');
    if (continueButton) {
        continueButton.addEventListener('click', () => {
            successModal.classList.remove('active');
            window.location.href = 'catalog.html';
        });
    }
}

// Отправка уведомления в Telegram
function sendTelegramNotification(orderData) {
    // Здесь должны быть ваши данные для отправки в Telegram
    const botToken = 'YOUR_BOT_TOKEN'; // Замените на свой токен
    const chatId = 'YOUR_CHAT_ID'; // Замените на свой ID чата
    
    // Формируем текст сообщения
    let message = `🆕 *Новый заказ #${orderData.id}*\n\n`;
    
    // Данные клиента
    message += `👤 *Клиент:* ${orderData.customer.name}\n`;
    message += `📱 *Телефон:* ${orderData.customer.phone}\n`;
    if (orderData.customer.email) {
        message += `📧 *Email:* ${orderData.customer.email}\n`;
    }
    
    // Данные доставки
    message += `\n🚚 *Доставка:* ${orderData.delivery.method === 'courier' ? 'Курьером' : 'Самовывоз'}\n`;
    message += `📍 *Адрес:* ${orderData.delivery.address}\n`;
    
    // Способ оплаты
    const paymentMethods = {
        'card': 'Карта Visa/Mastercard',
        'uzcard': 'UzCard',
        'humo': 'Humo',
        'cash': 'Наличными'
    };
    message += `\n💰 *Оплата:* ${paymentMethods[orderData.payment] || orderData.payment}\n`;
    
    // Товары
    message += '\n📦 *Товары:*\n';
    orderData.cart.forEach(item => {
        message += `• ${item.name} (${item.size}, ${item.color}) x${item.quantity} — ${formatPrice(item.price * item.quantity)} сум\n`;
    });
    
    // Итоговая сумма
    message += `\n💵 *Итого:* ${formatPrice(orderData.total)} сум\n`;
    
    // Комментарий
    if (orderData.comment) {
        message += `\n💬 *Комментарий:* ${orderData.comment}\n`;
    }
    
    // Дата и время
    const date = new Date(orderData.date);
    message += `\n⏰ *Дата:* ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    
    // В реальном проекте здесь был бы AJAX-запрос на API Telegram
    console.log('Отправка уведомления в Telegram:', message);
    
    // Пример отправки (раскомментируйте и замените данные)
    /*
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        }),
    })
    .then(response => response.json())
    .then(data => console.log('Уведомление отправлено:', data))
    .catch(error => console.error('Ошибка отправки уведомления:', error));
    */
}

// Показ уведомления
function showNotification(message, type = 'success') {
    const container = document.querySelector('.notification-container');
    if (!container) return;
    
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Определяем иконку в зависимости от типа
    let icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    else if (type === 'warning') icon = 'exclamation-triangle';
    else if (type === 'info') icon = 'info-circle';
    
    // Формируем содержимое
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Добавляем в контейнер
    container.appendChild(notification);
    
    // Добавляем обработчик закрытия
    const closeButton = notification.querySelector('.notification-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            notification.classList.add('fadeOut');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fadeOut');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}
