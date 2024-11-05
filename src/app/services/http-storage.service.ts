import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class HttpStorageService {
  readonly apiUrl = "http://localhost:3000/users";
  #reloadTrigger$ = new Subject<void>();

  #users$: Observable<User[]> = this.#reloadTrigger$.asObservable().pipe(
    startWith(void 0),
    switchMap(() => this.#http.get<User[]>(this.apiUrl)),
    shareReplay(1)
  );

  #http = inject(HttpClient);

  getUsers$(): Observable<User[]> {
    return this.#users$;
  }

  addUser(user: User): Observable<void> {
    return this.#http
      .post<User>(this.apiUrl, user)
      .pipe(switchMap(() => this.#triggerReload()));
  }

  deleteUser(userId: string): Observable<void> {
    return this.#http
      .delete<void>(`${this.apiUrl}/${userId}`)
      .pipe(switchMap(() => this.#triggerReload()));
  }

  editUser(updatedUserData: Partial<User>): Observable<void> {
    return this.#http
      .patch<User>(`${this.apiUrl}/${updatedUserData.id}`, updatedUserData)
      .pipe(switchMap(() => this.#triggerReload()));
  }

  #triggerReload(): Observable<void> {
    this.#reloadTrigger$.next(); // Trigger the reload
    return of();
  }
}
