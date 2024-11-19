import { inject, Injectable } from "@angular/core";
import { filter, map, Observable, of, switchMap, tap } from "rxjs";
import { UserDialogService } from "../../components/user-dialog/user-dialog.service";
import { User } from "../../models/user";
import { AbstractUsersService } from "./abstract-users.service";

export enum ActionType {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
}
@Injectable({
  providedIn: "root",
})
export class UserStrategyService {
  #strategyMap = new Map<
    ActionType,
    (user: User | null) => Observable<User[]>
  >();

  #userService = inject(AbstractUsersService);
  #dialogService = inject(UserDialogService);

  constructor() {
    this.#strategyMap.set(ActionType.ADD, (user: User | null) =>
      this.#openDialogThenExecute(
        { mode: ActionType.ADD, user },
        (userData: User) => this.#userService.addUser(userData)
      )
    );
    this.#strategyMap.set(ActionType.EDIT, (user: User | null) =>
      this.#openDialogThenExecute(
        { mode: ActionType.EDIT, user },
        (userData: User) => this.#userService.editUser(userData)
      )
    );
    this.#strategyMap.set(ActionType.DELETE, (user: User | null) => {
      if (user) {
        return this.#userService.deleteUser(user.id);
      }

      return of([] as User[]);
    });
  }

  execute(type: ActionType, user: User | null): Observable<User[]> {
    const strategy = this.#strategyMap.get(type);
    if (strategy) {
      return strategy(user);
    } else {
      console.warn(`No strategy found for action type: ${type}`);
      return of();
    }
  }

  #openDialogThenExecute(
    dialogConfig: { mode: ActionType; user: User | null },
    action: (user: User) => Observable<User[]>
  ): Observable<User[]> {
    const dialogRef = this.#dialogService.open(dialogConfig);
    return dialogRef.afterClosed().pipe(
      filter((result: unknown | undefined) => !!result),
      switchMap((result: unknown) => action(result as User))
    );
  }
}
