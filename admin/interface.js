class AdminInterface {
    static init() {
      this.bindEvents();
      this.loadProducts();
      this.loadSlider();
    }
  
    static bindEvents() {
      document.getElementById('addProduct').onclick = () => this.showAddProductModal();
      document.getElementById('addSlide').onclick = () => this.showAddSlideModal();
    }
  
    static async loadProducts() {
      const products = await DataManager.loadData('products');
      // Рендер таблицы продуктов
    }
  
    static async loadSlider() {
      const slides = await DataManager.loadData('slider');
      // Рендер слайдов
    }
  }
  
  // Инициализация при загрузке
  document.addEventListener('DOMContentLoaded', () => AdminInterface.init());