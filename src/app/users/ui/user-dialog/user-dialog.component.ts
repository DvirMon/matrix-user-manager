import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { User } from "src/app/users/data-access/user";
import { UserFormComponent } from "../user-form/user-form.component";

export interface UserDialogData {
  user: User | null;
  // mode: "add" | "edit";
  mode: string;
}

@Component({
  selector: "app-user-dialog",
  imports: [MatDialogTitle, MatDialogContent, UserFormComponent],
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
  dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);

  data: UserDialogData = inject(MAT_DIALOG_DATA);

  isEditMode: boolean;

  constructor() {
    this.isEditMode = this.data.mode === "edit";
  }
}
