import { inject, Injectable, WritableSignal } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { AbstractUsersService } from "./abstract-users.service";
import { ActionType, UserStrategyService } from "./user-strategy.service";

export interface UserAction {
  type: ActionType;
  user: User | null;
}

@Injectable({
  providedIn: "root",
})
export class UsersManagerService {
  #userStrategyService = inject(UserStrategyService);
  #userService = inject(AbstractUsersService);

  getUsers(): WritableSignal<User[]> {
    return this.#userService.getUsers();
  }

  getUsers$(): Observable<User[]> {
    return this.#userService.getUsers$();
  }

  execute(action: UserAction): Observable<void> {
    return this.#userStrategyService.execute(action.type, action.user);
  }
}
