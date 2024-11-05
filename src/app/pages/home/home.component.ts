import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { UserFormComponent } from "src/app/components/user-form/user-form.component";
import { UserTableComponent } from "src/app/components/user-table/user-table.component";
import { User } from "src/app/models/user";
import { HttpStorageService } from "src/app/services/http-storage.service";
import { UserManagerService } from "src/app/services/user-manager.service";
import { ActionType } from "src/app/services/user-strategy.service";
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  #userManageService = inject(UserManagerService);

  #userHttp = inject(HttpStorageService);

  users$ = this.#userManageService.getUsers$();

  // trigger logic in the template
  strategyTrigger$: Observable<void>;

  columns = [
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "gender", header: "Gender" },
    { key: "age", header: "Age" },
    { key: "country", header: "Country" },
    { key: "city", header: "City" },
  ];

  constructor() {
    this.strategyTrigger$ = this.#userManageService.executeStrategy();
  }

  onClickEvent(): void {
    this.#userManageService.emitStrategy({
      type: ActionType.ADD,
      user: null,
    });


  }

  onEditTableEvent(user: User): void {
    this.#userManageService.emitStrategy({ type: ActionType.EDIT, user });
  }

  onDeleteEditEvent(user: User): void {
    this.#userManageService.emitStrategy({ type: ActionType.DELETE, user });


  }
}
