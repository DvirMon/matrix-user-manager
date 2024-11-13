import { inject, Injectable, WritableSignal } from "@angular/core";
import { map, Observable, of } from "rxjs";
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

  override getUsers(): WritableSignal<User[]> {
    return this.users;
  }

  override getUsers$(): Observable<User[]> {
    return of(this.#localStorageService.load(this.STORAGE_KEY)).pipe(
      map((users) => users || [])
    ) as Observable<User[]>;
  }

  addUser(user: User): Observable<void> {
    return of(user).pipe(
      map((user) => ({ ...user, id: uuidv4() })),
      map((userWithId) => {
        const currentUsers = this.users();
        const updatedUsers = this.#crudService.addItem(
          currentUsers,
          userWithId
        );
        this.#setData(updatedUsers);
      })
    );
  }

  deleteUser(userId: string): Observable<void> {
    const currentUsers = this.users();
    const updatedUsers = this.#crudService.deleteItem(currentUsers, userId);
    this.users.set(updatedUsers);
    return of();
  }
  editUser(updatedUser: Partial<User>): Observable<void> {
    const currentUsers = this.users();
    const updatedUsers = this.#crudService.editItem(currentUsers, updatedUser);
    this.users.set(updatedUsers);
    return of();
  }

  #setData(users: User[]): void {
    this.#localStorageService.set(this.STORAGE_KEY, users);
    this.users.set(users);
  }
}
