import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from "@angular/core/rxjs-interop";
import { RouterModule } from "@angular/router";
import { filter, Observable, switchMap } from "rxjs";
import { UserFormComponent } from "src/app/components/user-form/user-form.component";
import { UserTableComponent } from "src/app/components/user-table/user-table.component";
import { User } from "src/app/models/user";
import { ActionType } from "src/app/services/users/user-strategy.service";
import {
  UserAction,
  UsersManagerService,
} from "src/app/services/users/users-manager.service";
import { FloatIconButtonComponent } from "src/app/shared/float-icon-button/float-icon-button.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    FloatIconButtonComponent,
    UserFormComponent,
    UserTableComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  #userManageService = inject(UsersManagerService);

  users = this.#userManageService.getUsers();

  #strategy = signal<UserAction | null>(null);

  strategy$ = toObservable<UserAction | null>(this.#strategy).pipe(
    filter((action): action is UserAction => !!action),
    switchMap((action: UserAction) =>
      this.#userManageService.execute(action as UserAction)
    )
  );

  columns = [
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "gender", header: "Gender" },
    { key: "age", header: "Age" },
    { key: "country", header: "Country" },
    { key: "city", header: "City" },
  ];

  constructor() {
    this.#userManageService
      .getUsers$()
      .pipe(takeUntilDestroyed())
      .subscribe((users) => {
        console.log("users", users);
        this.users.set(users);
      });
  }
  ngOnInit() {
    this.strategy$.subscribe((data) => {
      console.log(data);
    });
  }

  onAddUserEvent(): void {
    const strategy = {
      type: ActionType.ADD,
      user: null,
    };

    this.#strategy.set(strategy);
  }

  onEditUserEvent(user: User): void {
    this.#strategy.set({ type: ActionType.EDIT, user });
  }

  onDeleteUserEvent(user: User): void {
    this.#strategy.set({ type: ActionType.DELETE, user });
  }
}
