import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from "rxjs";
import { User } from "../../models/user";
import { CrudService } from "../utils/crud.service";
import { AbstractUsersService } from "./abstract-users.service";

@Injectable({
  providedIn: "root",
})
export class UsersRemoteService extends AbstractUsersService {
  readonly apiUrl = "http://localhost:3000/users";

  #crudService = inject(CrudService);

  #http = inject(HttpClient);


  getUsers$(): Observable<User[]> {
    return this.#http.get<User[]>(this.apiUrl).pipe(
      tap((users) => this.usersSubject.next(users)),
      switchMap(() => this.users$)
    );
  }

  addUser(user: User): Observable<void> {
    return this.#http.post<User>(this.apiUrl, user).pipe(
      switchMap((userWithId) =>
        this.usersSubject.asObservable().pipe(
          take(1),
          map((currentUsers) =>
            this.#crudService.addItem(currentUsers, userWithId)
          ),
          switchMap((updatedUsers) => this.#reload(updatedUsers))
        )
      )
    );
  }
  deleteUser(userId: string): Observable<void> {
    return this.#http.delete<void>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(() =>
        this.usersSubject.asObservable().pipe(
          take(1),
          map((currentUsers) =>
            this.#crudService.deleteItem(currentUsers, userId)
          ),
          switchMap((updatedUsers) => this.#reload(updatedUsers))
        )
      )
    );
  }

  editUser(partialUser: Partial<User>): Observable<void> {
    const url = `${this.apiUrl}/${partialUser.id}`;

    return this.#http.patch<User>(url, partialUser).pipe(
      switchMap((updatedUser) =>
        this.usersSubject.asObservable().pipe(
          take(1),
          map((currentUsers) =>
            this.#crudService.editItem(currentUsers, updatedUser)
          ),
          switchMap((updatedUsers) => this.#reload(updatedUsers))
        )
      )
    );
  }

  #reload(users: User[]): Observable<void> {
    return of(this.usersSubject.next(users)).pipe(
      tap(() => this.reloadTrigger$.next())
    );
  }
}
