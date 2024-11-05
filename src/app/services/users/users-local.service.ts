import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/user";
import { LocalStorageService } from "../utils/local-storage.service";
import { AbstractUsersService } from "./abstract-users.service";

@Injectable({
  providedIn: "root",
})
export class UsersLocalService extends AbstractUsersService {
  readonly STORAGE_KEY = "users";

  #localStorageService = inject(LocalStorageService);

  override users$: Observable<User[]> = this.reloadTrigger$.pipe(
    startWith(void 0), //
    switchMap(() => of(this.#loadUsers())),
    shareReplay(1)
  );

  getUsers$(): Observable<User[]> {
    return this.users$;
  }

  addUser(user: User): Observable<void> {
    const currentUsers = this.#loadUsers();
    const userWithId = { ...user, id: uuidv4() };
    const updatedUsers = [userWithId, ...currentUsers];
    this.#reload(updatedUsers);
    return this.#reload(updatedUsers);
  }

  deleteUser(userId: string): Observable<void> {
    const currentUsers = this.#loadUsers();
    const updatedUsers = currentUsers.filter((user) => user.id !== userId);
    this.#reload(updatedUsers);
    return of();
  }

  editUser(updatedUserData: Partial<User>): Observable<void> {
    const currentUsers = this.#loadUsers();

    const index = currentUsers.findIndex(
      (user) => user.id === updatedUserData.id
    );

    if (index !== -1) {
      currentUsers[index] = { ...currentUsers[index], ...updatedUserData };
    }
    return this.#reload([...currentUsers]);
  }

  #loadUsers(): User[] {
    return (
      (this.#localStorageService.loadUsers(this.STORAGE_KEY) as User[]) || []
    );
  }

  #reload(users: User[]): Observable<void> {
    this.reloadTrigger$.next();
    this.#localStorageService.saveUsers(this.STORAGE_KEY, users);
    return of();
  }
}
