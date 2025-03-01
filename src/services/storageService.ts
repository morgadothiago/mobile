import * as store from 'expo-secure-store'

class StorageService {
  static instance: StorageService;

  async getItem(key: string) {
    return store.getItemAsync(key).catch(() => {
      return null;
    });
  }
  async setItem(key: string, value: any) {
    await store.setItemAsync(key, value).catch((error) => {
      console.error('setItem failed', error);
    });
  }
  async removeItem(key: string) {
    await store.deleteItemAsync(key).catch((error) => {
      console.error('removeItem failed', error);
    });
  }
  async clear() {
    throw new Error('not implemented');
  }
  static getInstance() {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance
  }
}

export default StorageService.getInstance(); 