import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-float-icon-button",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `<button
    mat-fab
    (click)="clickEvent.emit()"
    [ngStyle]="buttonStyles"
    aria-label="Floating action button">
    <mat-icon [fontIcon]="icon"></mat-icon>
  </button> `,
  styleUrls: ["./float-icon-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatIconButtonComponent {
  @Input() icon: string = "add";
  @Input() verticalPosition: "top" | "bottom" = "bottom";
  @Input() horizontalPosition: "left" | "right" = "right";

  @Output() clickEvent = new EventEmitter<void>();

  get buttonStyles() {
    return {
      position: "fixed",
      [this.verticalPosition]: "20px",
      [this.horizontalPosition]: "20px",
    };
  }
}
