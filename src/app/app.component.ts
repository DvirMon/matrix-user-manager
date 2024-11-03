import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  UserDialogComponent,
  UserDialogData,
} from "./components/user-dialog/user-dialog.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { FloatIconButtonComponent } from "./shared/float-icon-button/float-icon-button.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FloatIconButtonComponent, UserFormComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "matrix-user-manager";

  #dialog = inject(MatDialog);

  constructor() {}

  onClickEvent(): void {
    this.#dialog.open(UserDialogComponent, {
      data: { mode: "add" } as UserDialogData,
      autoFocus: true,
      hasBackdrop: true,
      disableClose: true,
    });
  }
}
