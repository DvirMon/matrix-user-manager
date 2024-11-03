import { Component } from "@angular/core";
import { FloatIconButtonComponent } from "./shared/float-icon-button/float-icon-button.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FloatIconButtonComponent, UserFormComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "matrix-user-manager";


  onClickEvent(): void {
    alert('works')
  }
}
