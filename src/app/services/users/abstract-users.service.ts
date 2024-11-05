// users.service.token.ts
import { Observable, of, Subject } from "rxjs";
import { User } from "src/app/models/user";


export abstract class AbstractUsersService {
  protected reloadTrigger$ = new Subject<void>();

  protected users$: Observable<User[]> = of([]);

  abstract getUsers$(): Observable<User[]>;
  abstract addUser(user: User): Observable<void>;
  abstract editUser(updatedUserData: Partial<User>): Observable<void>;
  abstract deleteUser(userId: string): Observable<void>;
}
