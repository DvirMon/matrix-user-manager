import { inject, Injectable } from "@angular/core";
import { Observable, Subject, switchMap } from "rxjs";
import { User } from "../models/user";
import { ActionType, UserStrategyService } from "./user-strategy.service";
import { UsersService } from "./users.service";
import { HttpStorageService } from "./http-storage.service";

@Injectable({
  providedIn: "root",
})
export class UserManagerService {
  #strategySubject = new Subject<{ type: ActionType; user: User | null }>();

  #userStrategyService = inject(UserStrategyService);
  #userService = inject(HttpStorageService);

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
