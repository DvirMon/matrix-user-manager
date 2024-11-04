import { inject, Injectable } from "@angular/core";
import { User } from "../models/user";
import { UsersService } from "./users.service";
import { Subject, Observable, filter, switchMap, tap, map } from "rxjs";
import { UserDialogService } from "../components/user-dialog/user-dialog.service";

export enum ActionType {
  ADD = "add",
  EDIT = "edit",
  // DELETE = "delete",
}
@Injectable({
  providedIn: "root",
})
export class UserStrategyService {
  #strategySubject = new Subject<{ type: ActionType; user: User | null }>();

  #strategyMap = new Map<ActionType, (user: User) => void>();

  #userService = inject(UsersService);
  #dialogService = inject(UserDialogService);

  constructor() {
    this.#strategyMap.set(ActionType.ADD, (user: User) =>
      this.#userService.addUser(user)
    );
    this.#strategyMap.set(ActionType.EDIT, (user: User) =>
      this.#userService.editUser(user.id, user)
    );
    // this.#strategyMap.set(ActionType.DELETE, (user: User) =>
    //   this.#userService.deleteUser(user.id)
    // );
  }

  execute(action: ActionType, user: User): void {
    const strategy = this.#strategyMap.get(action);

    if (strategy) {
      strategy(user);
    } else {
      console.warn(`No strategy found for action type: ${action}`);
    }
  }

  emitStrategy(data: { type: ActionType; user: User | null }): void {
    const { type, user } = data;
    this.#strategySubject.next({ type, user });
  }

  getStrategy(): Observable<void> {
    return this.#strategySubject.asObservable().pipe(
      switchMap((action) => {
        const dialogRef = this.#dialogService.open({
          mode: action.type,
          user: action.user,
        });

        return dialogRef.afterClosed().pipe(
          filter((user) => user !== null),
          map((user: User) => this.execute(action.type, user))
        );
      })
    );
  }
  getStrategy2(): Observable<void> {
    return this.#strategySubject.asObservable().pipe(
      switchMap((action) => {
        const dialogRef = this.#dialogService.open({
          mode: action.type,
          user: action.user,
        });

        return dialogRef.afterClosed().pipe(
          filter((user) => user !== null),
          map((user: User) => this.execute(action.type, user))
        );
      })
    );
  }
}
