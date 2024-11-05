import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { User } from "../../models/user";
import { AbstractUsersService } from "./abstract-users.service";

@Injectable({
  providedIn: "root",
})
export class UsersRemoteService extends AbstractUsersService {
  readonly apiUrl = "http://localhost:3000/users";

  #usersSubject = new BehaviorSubject<User[]>([]);

  override users$ = this.#usersSubject.asObservable();

  // #users$: Observable<User[]> = this.reloadTrigger$.asObservable().pipe(
  //   startWith(void 0),
  //   switchMap(() => this.loadUsers()),
  //   shareReplay(1)
  // );

  #http = inject(HttpClient);

  loadUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.apiUrl).pipe(
      tap((users) => this.#usersSubject.next(users)),
      switchMap(() => this.users$)
    );
  }

  getUsers$(): Observable<User[]> {
    return this.#http.get<User[]>(this.apiUrl).pipe(
      tap((users) => this.#usersSubject.next(users)),
      switchMap(() => this.users$)
    );
  }

  addUser(user: User): Observable<void> {
    return this.#http.post<User>(this.apiUrl, user).pipe(
      switchMap((userWithId) => {
        const currentUsers = this.#usersSubject.getValue();
        const updatedUsers = [userWithId, ...currentUsers];
        this.#usersSubject.next(updatedUsers);
        return this.#reload();
      })
    );
  }

  deleteUser(userId: string): Observable<void> {
    return this.#http
      .delete<void>(`${this.apiUrl}/${userId}`)
      .pipe(switchMap(() => this.#reload()));
  }

  editUser(updatedUserData: Partial<User>): Observable<void> {
    return this.#http
      .patch<User>(`${this.apiUrl}/${updatedUserData.id}`, updatedUserData)
      .pipe(switchMap(() => this.#reload()));
  }

  #reload(): Observable<void> {
    this.reloadTrigger$.next();
    return of();
  }
}
