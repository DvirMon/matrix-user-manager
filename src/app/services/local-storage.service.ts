import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {

  saveUsers(key: string, data: unknown): void {
    console.log(data)
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadUsers(key: string): unknown[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  clearUsers(key: string): void {
    localStorage.removeItem(key);
  }
}
