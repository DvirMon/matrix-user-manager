import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  saveUsers(key: string, users: User[]): Observable<void> {
    return of(null).pipe(
      map(() => {
        localStorage.setItem(key, JSON.stringify(users));
      }),
      catchError((error) => {
        console.error("Error saving to localStorage:", error);
        throw error;
      })
    );
  }
  loadUsers(key: string): Observable<unknown> {
    return of(null).pipe(
      map(() => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      }),
      catchError((error) => {
        console.error("Error loading from localStorage:", error);
        throw error;
      })
    );
  }

  clearUsers(key: string): void {
    localStorage.removeItem(key);
  }
}
