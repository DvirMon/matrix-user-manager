import { inject, Injectable, WritableSignal } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "../user";
import { CrudService } from "../../../shared/services/utils/crud.service";
import { LocalStorageService } from "../../../shared/services/utils/local-storage.service";
import { AbstractUsersService } from "./abstract-users.service";
import { rxResource } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class UsersLocalService extends AbstractUsersService {
  readonly STORAGE_KEY = "users";

  #localStorageService = inject(LocalStorageService);

  #crudService = inject(CrudService);

  #usersResource = rxResource<User[], unknown>({
    loader: () => this.loadUsers(),
  });

  override users: WritableSignal<User[]> = this.#usersResource
    .value as WritableSignal<User[]>;

  override loadUsers(): Observable<User[]> {
    return of(this.#localStorageService.load(this.STORAGE_KEY)).pipe(
      map((users) => users || [])
    ) as Observable<User[]>;
  }

  addUser(user: User): Observable<User[]> {
    return of(user).pipe(
      map((user) => ({ ...user, id: uuidv4() })),
      switchMap((userWithId) => {
        const currentUsers = this.users();
        const updatedUsers = this.#crudService.addItem(
          currentUsers,
          userWithId
        );
        return this.#setData(updatedUsers);
      })
    );
  }

  deleteUser(userId: string): Observable<User[]> {
    const currentUsers = this.users();
    const updatedUsers = this.#crudService.deleteItem(currentUsers, userId);
    return this.#setData(updatedUsers);
  }
  editUser(updatedUser: Partial<User>): Observable<User[]> {
    const currentUsers = this.users();
    const updatedUsers = this.#crudService.editItem(currentUsers, updatedUser);
    return this.#setData(updatedUsers);
  }

  #setData(users: User[]): Observable<User[]> {
    this.#localStorageService.set(this.STORAGE_KEY, users);
    return of(users);
  }
}
