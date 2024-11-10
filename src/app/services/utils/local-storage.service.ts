import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { User } from "src/app/models/user";
import superjson from "superjson";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {

  set(key: string, users: User[]): Observable<void> {
    return of(null).pipe(
      map(() => {
        localStorage.setItem(key, superjson.stringify(users));
      }),
      catchError((error) => {
        console.error("Error saving to localStorage:", error);
        throw error;
      })
    );
  }
  load(key: string): Observable<unknown> {
    return of(null).pipe(
      map(() => {
        const data = localStorage.getItem(key);
        return data ? superjson.parse(data) : null;
      }),
      catchError((error) => {
        console.error("Error loading from localStorage:", error);
        throw error;
      })
    );
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }
}
