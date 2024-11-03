import { Component, inject } from "@angular/core";
import { FloatIconButtonComponent } from "./shared/float-icon-button/float-icon-button.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UserDialogComponent } from "./components/user-dialog/user-dialog.component";

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

  constructor() {
    this.#dialog.open(UserDialogComponent, {
      data: {},
      autoFocus: true,
      hasBackdrop: true,
      disableClose: true,
    });
  }

  onClickEvent(): void {
    alert("works");
  }
}
