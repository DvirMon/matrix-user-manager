import { inject, Injectable } from "@angular/core";
import { Observable, Subject, switchMap } from "rxjs";
import { User } from "../../models/user";
import { ActionType, UserStrategyService } from "./user-strategy.service";
import { AbstractUsersService } from "./abstract-users.service";

@Injectable({
  providedIn: "root",
})
export class UsersManagerService {
  #strategySubject = new Subject<{ type: ActionType; user: User | null }>();

  #userStrategyService = inject(UserStrategyService);
  #userService = inject(AbstractUsersService);

  getUsers$(): Observable<User[]> {
    return this.#userService.getUsers$();
  }

  emitStrategy(data: { type: ActionType; user: User | null }): void {
    this.#strategySubject.next(data);
  }

  executeStrategy(): Observable<void> {
    return this.#strategySubject
      .asObservable()
      .pipe(
        switchMap(({ type, user }) =>
          this.#userStrategyService.execute(type, user!)
        )
      );
  }
}
