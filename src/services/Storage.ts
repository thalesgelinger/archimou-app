import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  constructor() {}

  static async setStorageItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  static async getStorageItem<T = any>(key: string) {
    try {
      const item: string | null = await AsyncStorage.getItem(key);
      return (!!item ? JSON.parse(item) : null) as T;
    } catch (e) {
      console.error(e);
    }
  }
}
