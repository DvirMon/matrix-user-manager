// users.service.token.ts
import { signal, WritableSignal } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/users/data-access/user";

export abstract class AbstractUsersService {
  abstract users: WritableSignal<User[]>;
  abstract loadUsers(): Observable<User[]>;
  abstract addUser(user: User): Observable<User[]>;
  abstract editUser(updatedUserData: Partial<User>): Observable<User[]>;
  abstract deleteUser(userId: string): Observable<User[]>;
}
