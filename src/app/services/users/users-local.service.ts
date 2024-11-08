import { inject, Injectable } from "@angular/core";
import {
  map,
  Observable,
  switchMap,
  tap
} from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/user";
import { CrudService } from "../utils/crud.service";
import { LocalStorageService } from "../utils/local-storage.service";
import { AbstractUsersService } from "./abstract-users.service";

@Injectable({
  providedIn: "root",
})
export class UsersLocalService extends AbstractUsersService {
  readonly STORAGE_KEY = "users";

  #localStorageService = inject(LocalStorageService);


  #crudService = inject(CrudService);

  loadUsers(): Observable<User[]> {
    return this.#localStorageService.loadUsers(this.STORAGE_KEY) as Observable<
      User[]
    >;
  }

  getUsers$(): Observable<User[]> {
    return this.loadUsers().pipe(
      tap((users) => this.usersSubject.next(users)),
      switchMap(() => this.users$)
    );
  }

  addUser(user: User): Observable<void> {
    const userWithId = { ...user, id: uuidv4() };

    return this.loadUsers().pipe(
      map((currentUsers) =>
        this.#crudService.addItem(currentUsers, userWithId)
      ),
      switchMap((updatedUsers) => this.#reload(updatedUsers))
    );
  }

  deleteUser(userId: string): Observable<void> {
    return this.loadUsers().pipe(
      map((currentUsers) => this.#crudService.deleteItem(currentUsers, userId)),
      switchMap((updatedUsers) => this.#reload(updatedUsers))
    );
  }
  editUser(updatedUserData: Partial<User>): Observable<void> {
    const currentUsers$ = this.loadUsers();

    return currentUsers$.pipe(
      map((currentUsers) =>
        this.#crudService.editItem(currentUsers, updatedUserData)
      ),
      switchMap((currentUsers) => {
        return this.#reload(currentUsers);
      })
    );
  }

  #reload(users: User[]): Observable<void> {
    return this.#localStorageService
      .saveUsers(this.STORAGE_KEY, users)
      .pipe(tap(() => this.reloadTrigger$.next()));
  }
}
