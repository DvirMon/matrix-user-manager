import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { User } from "src/app/models/user";
import { UserFormComponent } from "../user-form/user-form.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface UserDialogData {
  user: User | null;
  // mode: "add" | "edit";
  mode: string;
}

@Component({
    selector: "app-user-dialog",
    imports: [UserFormComponent],
    templateUrl: "./user-dialog.component.html",
    styleUrls: ["./user-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent {
  dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);

  data: UserDialogData = inject(MAT_DIALOG_DATA);

  isEditMode: boolean;

  constructor() {
    this.isEditMode = this.data.mode === "edit";
  }
}
