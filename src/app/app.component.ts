import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UserDialogService } from "./components/user-dialog/user-dialog.service";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { User } from "./models/user";
import { FloatIconButtonComponent } from "./shared/float-icon-button/float-icon-button.component";
import { UsersService } from "./services/users.service";
import { filter, Observable, Subject, switchMap, takeUntil, tap } from "rxjs";
import { UserTableComponent } from "./components/user-table/user-table.component";

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
  #dialogService = inject(UserDialogService);

  #userService = inject(UsersService);

  users$ = this.#userService.getUsers$();

  addSubject = new Subject<void>();

  addEvent$: Observable<User>;

  columns = [
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "gender", header: "Gender" },
    { key: "age", header: "Age" },
    { key: "country", header: "Country" },
    { key: "city", header: "City" },
  ];

  constructor() {
    this.addEvent$ = this.#onAddEvent();
  }

  #onAddEvent() {
    return this.addSubject.asObservable().pipe(
      switchMap(() =>
        this.#dialogService
          .open({ mode: "add", user: null })
          .afterClosed()
          .pipe(
            filter((user) => user !== null),
            tap((user: User) => this.#userService.editUser(user.id, user))
          )
      )
    );
  }

  onClickEvent(): void {
    this.addSubject.next();
  }
}
