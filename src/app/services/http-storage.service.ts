import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class HttpStorageService {
  readonly apiUrl = "http://localhost:3000/users";
  #usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.#usersSubject.asObservable();

  #http = inject(HttpClient);

  loadUsers(): void {
    this.#http.get<User[]>(this.apiUrl).subscribe(users => {
      this.#usersSubject.next(users);
    });
  }

  getUsers$(): Observable<User[]> {
    return this.#http.get<User[]>(this.apiUrl);
  }

  addUser(user: Partial< User>): Observable<User> {
    const userWithId = { ...user, id: uuidv4() };

    return this.#http.post<User>(this.apiUrl, userWithId);
  }

  deleteUser(userId: string): Observable<void> {
    return this.#http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  editUser(updatedUserData: Partial<User>): Observable<User> {
    return this.#http.patch<User>(
      `${this.apiUrl}/${updatedUserData.id}`,
      updatedUserData
    );
  }
}
