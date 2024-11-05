// users.service.token.ts
import { Observable } from "rxjs";
import { User } from "src/app/models/user";

export abstract class UsersService {

    


  abstract addUser(user: User): Observable<void>;
  abstract editUser(updatedUserData: Partial<User>): Observable<void>;
  abstract deleteUser(userId: string): Observable<void>;
}
