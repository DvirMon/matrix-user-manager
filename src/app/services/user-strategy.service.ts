import { inject, Injectable } from "@angular/core";
import { filter, map, Observable, of } from "rxjs";
import { UserDialogService } from "../components/user-dialog/user-dialog.service";
import { User } from "../models/user";
import { UsersService } from "./users.service";
import { HttpStorageService } from "./http-storage.service";

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

  #userService = inject(HttpStorageService);
  #dialogService = inject(UserDialogService);

  constructor() {
    this.#strategyMap.set(ActionType.ADD, (user: User) =>
      this.#openDialogThenExecute(
        { mode: ActionType.ADD, user },
        this.#userService.addUser.bind(this.#userService)
      )
    );
    this.#strategyMap.set(ActionType.EDIT, (user: User) =>
      this.#openDialogThenExecute(
        { mode: ActionType.EDIT, user },
        this.#userService.editUser.bind(this.#userService)
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
    action: (user: User) => void
  ): Observable<void> {
    const dialogRef = this.#dialogService.open(dialogConfig);
    return dialogRef.afterClosed().pipe(
      filter((result) => result !== null),
      map((result: User) => action(result))
    );
  }
}
