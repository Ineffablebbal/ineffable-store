document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация по цене
    const applyPriceBtn = document.querySelector('.apply-price');
    if (applyPriceBtn) {
        applyPriceBtn.addEventListener('click', function() {
            const minPrice = document.querySelector('.price-inputs input:first-child');
            const maxPrice = document.querySelector('.price-inputs input:last-child');
            if (minPrice && maxPrice) {
                console.log(`Filtering prices between ${minPrice.value} and ${maxPrice.value}`);
            }
        });
    }

    // Сортировка
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log(`Sorting by ${this.value}`);
        });
    }

    // Добавление в корзину
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                if (productCard) {
                    const productName = productCard.querySelector('h3');
                    if (productName) {
                        console.log(`Added to cart: ${productName.textContent}`);
                    }
                }
            });
        });
    }
});