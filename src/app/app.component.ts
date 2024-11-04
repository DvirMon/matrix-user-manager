import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UserDialogService } from "./components/user-dialog/user-dialog.service";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { User } from "./models/user";
import { FloatIconButtonComponent } from "./shared/float-icon-button/float-icon-button.component";
import { UsersService } from "./services/users.service";
import { filter, Observable, Subject, switchMap, takeUntil, tap } from "rxjs";
import { UserTableComponent } from "./components/user-table/user-table.component";
import {
  ActionType,
  UserStrategyService,
} from "./services/user-strategy.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FloatIconButtonComponent,
    UserFormComponent,
    UserTableComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  #userService = inject(UsersService);
  #userStrategyService = inject(UserStrategyService);

  users$ = this.#userService.getUsers$();

  strategyEvent$: Observable<void>;

  columns = [
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "gender", header: "Gender" },
    { key: "age", header: "Age" },
    { key: "country", header: "Country" },
    { key: "city", header: "City" },
  ];

  constructor() {
    this.strategyEvent$ = this.#userStrategyService.getStrategy();
  }

  onClickEvent(): void {
    this.#userStrategyService.emitStrategy({
      type: ActionType.ADD,
      user: null,
    });
  }

  onEditTableEvent(user: User): void {
    this.#userStrategyService.emitStrategy({ type: ActionType.EDIT, user });
  }

  onDeleteEditEvent(user: User): void {
    this.#userService.deleteUser(user.id);
  }
}
