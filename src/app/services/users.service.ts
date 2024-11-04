import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  readonly STORAGE_KEY = "users";

  #localStorageService = inject(LocalStorageService);

  #usersSubject = new BehaviorSubject<User[]>(
    (this.#localStorageService.loadUsers(this.STORAGE_KEY) as User[]) || []
  );

  #users$ = this.#usersSubject.asObservable();

  getUsers$(): Observable<User[]> {
    return this.#users$;
  }

/*************  ✨ Codeium Command ⭐  *************/
/******  ab96abba-96de-4e6b-9a4d-e6d8bf645c40  *******/
  addUser(user: User): void {
    const currentUsers = this.#usersSubject.getValue();
    const userWithId = { ...user, id: uuidv4() };
    const updatedUsers = [userWithId, ...currentUsers];
    this.#updateUsers([...updatedUsers]);
  }

  deleteUser(userId: string): void {
    const currentUsers = this.#usersSubject.getValue();
    const index = currentUsers.findIndex((user) => user.id === userId);

    if (index !== -1) {
      currentUsers.splice(index, 1);
      this.#updateUsers([...currentUsers]);
    }
  }

  editUser(updatedUserData: Partial<User>): void {
    const currentUsers = this.#usersSubject.getValue();
    const index = currentUsers.findIndex(
      (user) => user.id === updatedUserData.id
    );

    if (index !== -1) {
      currentUsers[index] = { ...currentUsers[index], ...updatedUserData };
      this.#updateUsers([...currentUsers]);
    }
  }

  #updateUsers(users: User[]): void {
    this.#usersSubject.next(users);
    this.#localStorageService.saveUsers(this.STORAGE_KEY, users);
  }
}
