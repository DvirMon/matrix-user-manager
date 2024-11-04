import { AsyncPipe, CommonModule, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { filter, Observable, Subject, switchMap, tap } from "rxjs";
import { UserDialogService } from "src/app/components/user-dialog/user-dialog.service";
import { UserFormComponent } from "src/app/components/user-form/user-form.component";
import { UserTableComponent } from "src/app/components/user-table/user-table.component";
import { User } from "src/app/models/user";
import { UsersService } from "src/app/services/users.service";
import { FloatIconButtonComponent } from "src/app/shared/float-icon-button/float-icon-button.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterModule,
    FloatIconButtonComponent,
    UserFormComponent,
    UserTableComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  #dialogService = inject(UserDialogService);

  #userService = inject(UsersService);

  users$ = this.#userService.getUsers$();

  addSubject = new Subject<void>();
  editSubject = new Subject<User>();

  addEvent$: Observable<User>;
  editEvent$: Observable<User>;

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
    this.editEvent$ = this.#onEditEvent();
  }

  #onAddEvent() {
    return this.addSubject.asObservable().pipe(
      switchMap(() =>
        this.#dialogService
          .open({ mode: "add", user: null })
          .afterClosed()
          .pipe(
            filter((user) => user !== null),
            tap((user: User) => this.#userService.addUser(user))
          )
      )
    );
  }

  #onEditEvent() {
    return this.editSubject.asObservable().pipe(
      switchMap((user) =>
        this.#dialogService
          .open({ mode: "edit", user })
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

  onEditTableEvent(user: User): void {
    this.editSubject.next(user);
  }

  onDeleteEditEvent(user: User): void {
    this.#userService.deleteUser(user.id);
  }
}
