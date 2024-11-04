import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  #usersSubject = new BehaviorSubject<User[]>([]);
  #users$ = this.#usersSubject.asObservable();

  getUsers$(): Observable<User[]> {
    return this.#users$;
  }

  addUser(user: User): void {
    const currentUsers = this.#usersSubject.getValue();
    const userWithId = { ...user, id: uuidv4() };
    const updatedUsers = [userWithId, ...currentUsers];
    this.#usersSubject.next(updatedUsers);
  }

  deleteUser(userId: string): void {
    const currentUsers = this.#usersSubject.getValue();
    const index = currentUsers.findIndex((user) => user.id === userId);

    if (index !== -1) {
      currentUsers.splice(index, 1);
      this.#usersSubject.next([...currentUsers]);
    }
  }

  editUser(updatedUserData: Partial<User>): void {
    const currentUsers = this.#usersSubject.getValue();
    const index = currentUsers.findIndex(
      (user) => user.id === updatedUserData.id
    );

    if (index !== -1) {
      currentUsers[index] = { ...currentUsers[index], ...updatedUserData };
      this.#usersSubject.next([...currentUsers]);
    }
  }
}
