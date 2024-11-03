import { Component, inject } from "@angular/core";
import { UserDialogService } from "./components/user-dialog/user-dialog.service";
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

  #dialogService = inject(UserDialogService);

  onClickEvent(): void {
    this.#dialogService.open({ mode: "add", user: null });
  }
}
