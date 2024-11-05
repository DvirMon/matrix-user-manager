import { inject, Injectable } from "@angular/core";
import { filter, map, Observable, of, switchMap } from "rxjs";
import { UserDialogService } from "../../components/user-dialog/user-dialog.service";
import { User } from "../../models/user";
import { UsersLocalService } from "./users-local.service";
import { UsersRemoteService } from "./users-remote.service";

export enum ActionType {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
}
@Injectable({
  providedIn: "root",
})
export class UserStrategyService {
  #strategyMap = new Map<ActionType, (user: User) => Observable<void>>();

  #userService = inject(UsersRemoteService);
  #dialogService = inject(UserDialogService);

  constructor() {
    this.#strategyMap.set(ActionType.ADD, (user: User) =>
      this.#openDialogThenExecute(
        { mode: ActionType.ADD, user },
        (user: User) => this.#userService.addUser(user).pipe(map(() => void 0))
      )
    );
    this.#strategyMap.set(ActionType.EDIT, (user: User) =>
      this.#openDialogThenExecute(
        { mode: ActionType.EDIT, user },
        (user: User) => this.#userService.editUser(user).pipe(map(() => void 0))
      )
    );
    this.#strategyMap.set(ActionType.DELETE, (user: User) => {
      return this.#userService.deleteUser(user.id);
    });
  }

  execute(type: ActionType, user: User): Observable<void> {
    const strategy = this.#strategyMap.get(type);
    if (strategy) {
      return strategy(user);
    } else {
      console.warn(`No strategy found for action type: ${type}`);
      return of();
    }
  }

  #openDialogThenExecute(
    dialogConfig: { mode: ActionType; user: User },
    action: (user: User) => Observable<void>
  ): Observable<void> {
    const dialogRef = this.#dialogService.open(dialogConfig);
    return dialogRef.afterClosed().pipe(
      filter((result) => result !== null),
      switchMap((result: User) => action(result)) // Use switchMap to handle the Observable<void> from action
    );
  }
}
