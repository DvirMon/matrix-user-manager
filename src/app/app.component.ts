import { Component } from "@angular/core";
import { FloatIconButtonComponent } from "./float-icon-button/float-icon-button.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FloatIconButtonComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "matrix-user-manager";


  onClickEvent(): void {
    alert('works')
  }
}
