import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  #usersSubject = new BehaviorSubject<User[]>([
    {
      id: 1,
      age: 10,
      city: "Tek aviv",
      country: "hungary",
      firstName: "Dvir",
      gender: "female",
      lastName: "Dom",
    },
    {
      id: 2,
      age: 22,
      city: "Tek aviv",
      country: "Isreal",
      firstName: "Dvir",
      gender: "female",
      lastName: "Dom",
    },
  ]);
  #users$ = this.#usersSubject.asObservable();

  constructor() {}

  getUsers$(): Observable<User[]> {
    return this.#users$;
  }
  getUsers(): User[] {
    return this.#usersSubject.value;
  }

  addUser(user: User): void {
    const currentUsers = this.#usersSubject.getValue();
    const updatedUsers = [...currentUsers, user];
    this.#usersSubject.next(updatedUsers);
  }

  deleteUser(userId: number): void {
    const currentUsers = this.#usersSubject.getValue();
    const index = currentUsers.findIndex((user) => user.id === userId);

    if (index !== -1) {
      currentUsers.splice(index, 1);
      this.#usersSubject.next([...currentUsers]);
    }
  }

  editUser(userId: number, updatedUserData: Partial<User>): void {
    const currentUsers = this.#usersSubject.getValue();
    const index = currentUsers.findIndex((user) => user.id === userId);


    if (index !== -1) {
      currentUsers[index] = { ...currentUsers[index], ...updatedUserData };
      this.#usersSubject.next([...currentUsers]);
    }
  }

  getUserById(userId: number): Observable<User | undefined> {
    return this.#users$.pipe(
      map((users) => users.find((user) => user.id === userId))
    );
  }
}
