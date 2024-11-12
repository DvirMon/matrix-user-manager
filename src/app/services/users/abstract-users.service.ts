// users.service.token.ts
import { signal, WritableSignal } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { User } from "src/app/models/user";

export abstract class AbstractUsersService {
  protected reloadTrigger$ = new Subject<void>();

  protected users = signal<User[]>([]);
  protected usersSubject = new BehaviorSubject<User[]>([]);
  protected users$ = this.usersSubject.asObservable();

  abstract getUsers(): WritableSignal<User[]>;
  abstract getUsers$(): Observable<User[]>;
  abstract addUser(user: User): Observable<void>;
  abstract editUser(updatedUserData: Partial<User>): Observable<void>;
  abstract deleteUser(userId: string): Observable<void>;
}
