import { Component, inject } from "@angular/core";
import { UserDialogService } from "./components/user-dialog/user-dialog.service";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { FloatIconButtonComponent } from "./shared/float-icon-button/float-icon-button.component";
import { User } from "./models/user";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FloatIconButtonComponent, UserFormComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  user: User[] = [{
    age: 10,
    city: "Tek aviv",
    country: "hungary",
    firstName: "Dvir",
    gender: "female",
    lastName: "Dom",
  }];

  #dialogService = inject(UserDialogService);

  onClickEvent(): void {
    this.#dialogService.open({ mode: "add", user: null });
  }
}
