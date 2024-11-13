// users.service.token.ts
import { signal, WritableSignal } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";

export abstract class AbstractUsersService {

  protected users = signal<User[]>([]);

  abstract getUsers(): WritableSignal<User[]>;
  abstract getUsers$(): Observable<User[]>;
  abstract addUser(user: User): Observable<void>;
  abstract editUser(updatedUserData: Partial<User>): Observable<void>;
  abstract deleteUser(userId: string): Observable<void>;
}
