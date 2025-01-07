import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  public async save(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify({ data: value }));
  }

  public async get(key: string): Promise<any> {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      try {
        return Promise.resolve(JSON.parse(storedValue));
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve(null);
  }

  public async remove(key: string): Promise<void> {
    return localStorage.removeItem(key);
  }

  public async clear(): Promise<void> {
    return localStorage.clear();
  }

}

