class DataManager {
    static async loadData(type) {
      const response = await fetch(API_ROUTES[type]);
      return await response.json();
    }
  
    static async saveData(type, data) {
      localStorage.setItem(type, JSON.stringify(data));
    }
  }