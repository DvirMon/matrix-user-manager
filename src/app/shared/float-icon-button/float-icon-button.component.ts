import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
export class FloatIconButtonComponent implements OnInit {
  #icon: string = "add";
  #verticalPosition: "top" | "bottom" = "bottom";
  #horizontalPosition: "left" | "right" = "right";

  @Output() clickEvent = new EventEmitter<void>();

  buttonStyles!: { [key: string]: string };

  @Input() set icon(value: string) {
    this.#icon = value;
    this.updateButtonStyles();
  }
  get icon(): string {
    return this.#icon;
  }

  @Input() set verticalPosition(value: "top" | "bottom") {
    this.#verticalPosition = value;
    this.updateButtonStyles();
  }
  get verticalPosition(): "top" | "bottom" {
    return this.#verticalPosition;
  }

  @Input() set horizontalPosition(value: "left" | "right") {
    this.#horizontalPosition = value;
    this.updateButtonStyles();
  }
  get horizontalPosition(): "left" | "right" {
    return this.#horizontalPosition;
  }

  ngOnInit() {
    this.updateButtonStyles();
  }

  private updateButtonStyles(): void {
    this.buttonStyles = {
      position: "fixed",
      [this.#verticalPosition]: "20px",
      [this.#horizontalPosition]: "20px",
    };
  }

  onClick(): void {
    this.clickEvent.emit();
  }
}
