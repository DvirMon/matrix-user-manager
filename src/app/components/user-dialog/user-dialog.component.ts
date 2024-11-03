import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "src/app/models/user";
import { UserFormComponent } from "../user-form/user-form.component";

export interface UserDialogData {
  user: User | undefined;
  mode: "add" | "edit";
}

@Component({
  selector: "app-user-dialog",
  standalone: true,
  imports: [CommonModule, UserFormComponent],
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
