import { HttpClient } from "@angular/common/http";
import { inject, Injectable, WritableSignal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { map, Observable, of, switchMap, take, tap } from "rxjs";
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

  override getUsers(): WritableSignal<User[]> {
    return this.users;
  }

  getUsers$(): Observable<User[]> {
    return this.#http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<void> {

    console.log('remote called')

    return this.#http.post<User>(this.apiUrl, user).pipe(
      map((userWithId) => {
        const currentUsers = this.users();
        const updatedUsers = this.#crudService.addItem(
          currentUsers,
          userWithId
        );
        this.users.set(updatedUsers);
      })
    );
  }

  deleteUser(userId: string): Observable<void> {
    return this.#http.delete<void>(`${this.apiUrl}/${userId}`).pipe(
      map((_) => {
        const currentUsers = this.users();
        const updatedUsers = this.#crudService.deleteItem(currentUsers, userId);
        this.users.set(updatedUsers);
      })
    );
  }

  editUser(partialUser: Partial<User>): Observable<void> {
    const url = `${this.apiUrl}/${partialUser.id}`;

    return this.#http.patch<User>(url, partialUser).pipe(
      map((updatedUser) => {
        const currentUsers = this.users();
        const updatedUsers = this.#crudService.editItem(
          currentUsers,
          updatedUser
        );
        this.users.set(updatedUsers);
      })
    );
  }
}
