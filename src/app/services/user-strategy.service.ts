import { inject, Injectable } from "@angular/core";
import { filter, map, Observable, of, Subject, switchMap, tap } from "rxjs";
import { UserDialogService } from "../components/user-dialog/user-dialog.service";
import { User } from "../models/user";
import { UsersService } from "./users.service";

export enum ActionType {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
}
@Injectable({
  providedIn: "root",
})
export class UserStrategyService {
  #strategySubject = new Subject<{ type: ActionType; user: User | null }>();

  #strategyMap = new Map<ActionType, (user: User) => Observable<void>>();

  #userService = inject(UsersService);
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
      this.#userService.deleteUser(user.id);
      return of();
    });
  }

  getUsers$(): Observable<User[]> {
    return this.#userService.getUsers$();
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

  #execute(type: ActionType, user: User | null): Observable<void> {
    const strategy = this.#strategyMap.get(type);

    if (strategy) {
      return strategy(user!); // Call the strategy if it exists
    } else {
      console.warn(`No strategy found for action type: ${type}`);
      return of(); // Return a completed observable if no strategy is found
    }
  }

  emitStrategy(data: { type: ActionType; user: User | null }): void {
    const { type, user } = data;
    this.#strategySubject.next({ type, user });
  }

  getStrategy(): Observable<void> {
    return this.#strategySubject
      .asObservable()
      .pipe(switchMap(({ type, user }) => this.#execute(type, user)));
  }
}
