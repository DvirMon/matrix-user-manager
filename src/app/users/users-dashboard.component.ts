import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterModule } from "@angular/router";
import { filter, Subject, switchMap } from "rxjs";
import { UserTableComponent } from "src/app/users/ui/user-table/user-table.component";
import { User } from "src/app/users/data-access/user";
import { ActionType } from "src/app/users/data-access/services/user-strategy.service";
import {
  UserAction,
  UsersManagerService,
} from "src/app/users/data-access/services/users-manager.service";
import { FloatIconButtonComponent } from "src/app/shared/ui/float-icon-button/float-icon-button.component";

@Component({
  selector: "app-users-dashboard",
  imports: [RouterModule, FloatIconButtonComponent, UserTableComponent],
  templateUrl: "./users-dashboard.component.html",
  styleUrls: ["./users-dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDashboardComponent {
  #userManageService = inject(UsersManagerService);

  users = this.#userManageService.getUsers();

  strategySubject = new Subject<UserAction | null>();

  strategy$ = this.#setStrategy();

  columns = [
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "gender", header: "Gender" },
    { key: "age", header: "Age" },
    { key: "country", header: "Country" },
    { key: "city", header: "City" },
  ];

  constructor() {
    this.strategy$
      .pipe(takeUntilDestroyed())
      .subscribe((users) => this.users.set(users));
  }

  #setStrategy() {
    return this.strategySubject.asObservable().pipe(
      filter((action): action is UserAction => !!action),
      switchMap((action: UserAction) =>
        this.#userManageService.execute(action as UserAction)
      )
    );
  }

  onAddUserEvent(): void {
    const strategy = {
      type: ActionType.ADD,
      user: null,
    };

    this.strategySubject.next(strategy);
  }

  onEditUserEvent(user: User): void {
    const strategy = {
      type: ActionType.EDIT,
      user,
    };
    this.strategySubject.next(strategy);
  }

  onDeleteUserEvent(user: User): void {
    const strategy = {
      type: ActionType.DELETE,
      user,
    };
    this.strategySubject.next(strategy);
  }
}
