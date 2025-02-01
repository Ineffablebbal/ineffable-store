class ProductManager {
    static async addProduct(product) {
      const products = await DataManager.loadData('products');
      product.id = Date.now();
      products.push(product);
      await DataManager.saveData('products', products);
    }
  
    static async updateProduct(id, data) {
      const products = await DataManager.loadData('products');
      const index = products.findIndex(p => p.id === id);
      products[index] = { ...products[index], ...data };
      await DataManager.saveData('products', products);
    }
  
    static async deleteProduct(id) {
      const products = await DataManager.loadData('products');
      const filtered = products.filter(p => p.id !== id);
      await DataManager.saveData('products', filtered);
    }
  }