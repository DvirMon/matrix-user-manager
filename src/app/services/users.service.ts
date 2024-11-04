import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  #usersSubject = new BehaviorSubject<User[]>([]);
  #users$ = this.#usersSubject.asObservable();

  constructor() {}

  getUsers$(): Observable<User[]> {
    return this.#users$;
  }

  addUser(user: User): void {
    const currentUsers = this.#usersSubject.getValue();
    const userWithId = { ...user, id: uuidv4() }; // Generate a unique UUID
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

  editUser(userId: string, updatedUserData: Partial<User>): void {
    const currentUsers = this.#usersSubject.getValue();
    const index = currentUsers.findIndex((user) => user.id === userId);

    if (index !== -1) {
      currentUsers[index] = { ...currentUsers[index], ...updatedUserData };
      this.#usersSubject.next([...currentUsers]);
    }
  }

  getUserById(userId: string): Observable<User | undefined> {
    return this.#users$.pipe(
      map((users) => users.find((user) => user.id === userId))
    );
  }
}
