import { Injectable } from "@angular/core";
import { catchError, filter, map, Observable, of } from "rxjs";
import { User } from "src/app/models/user";
import superjson from "superjson";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  set$(key: string, users: User[]): Observable<void> {
    return of(null).pipe(
      map(() => {
        console.log(users);
        console.log(superjson.stringify(users));
        localStorage.setItem(key, superjson.stringify(users));
      }),
      catchError((error) => {
        console.error("Error saving to localStorage:", error);
        throw error;
      })
    );
  }
  set(key: string, users: User[]): void {
    localStorage.setItem(key, superjson.stringify(users));
  }

  
  load$(key: string): Observable<unknown> {
    return of(null).pipe(
      map(() => {
        const data = localStorage.getItem(key);
        console.log(data);
        // console.log(superjson.parse(data as string))
        return data ? superjson.parse(data) : null;
      }),
      filter((data) => data !== null)
      // catchError((error) => {
      //   console.error("Error loading from localStorage:", error);
      //   throw error;
      // })
    );
  }

  load(key: string): unknown | null {
    const data = localStorage.getItem(key);
    return data ? superjson.parse(data) : null;
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }
}
