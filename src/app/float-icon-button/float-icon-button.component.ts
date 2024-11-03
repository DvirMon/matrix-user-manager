import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-float-icon-button",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: "./float-icon-button.component.html",
  styleUrls: ["./float-icon-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatIconButtonComponent {
  @Input() icon: string = "add";
  @Input() verticalPosition: "top" | "bottom" = "bottom";
  @Input() horizontalPosition: "left" | "right" = "right";

  get buttonStyles() {
    return {
      position: "fixed",
      [this.verticalPosition]: "20px",
      [this.horizontalPosition]: "20px",
    };
  }
}
