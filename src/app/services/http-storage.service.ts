import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class HttpStorageService {
  readonly apiUrl = "http://localhost:3000/users";

  #http = inject(HttpClient);

  getUsers$(): Observable<User[]> {
    return this.#http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.#http.post<User>(this.apiUrl, user);
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
