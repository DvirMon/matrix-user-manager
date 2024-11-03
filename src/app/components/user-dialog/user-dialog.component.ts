import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { UserFormComponent } from "../user-form/user-form.component";
import { User } from "src/app/models/user";

export interface UserDialogData {
  user?: User; // Optional user data for editing
  mode?: "add" | "edit"; // Mode can be 'add' or 'edit'
}

@Component({
  selector: "app-user-dialog",
  standalone: true,
  imports: [CommonModule, MatDialogModule, UserFormComponent],
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
  dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);

  data: UserDialogData = inject(MAT_DIALOG_DATA);

  onSave(): void {
    // Logic for handling save
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
