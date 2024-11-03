import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
  selector: "app-user-dialog",
  standalone: true,
  imports: [CommonModule, MatDialogModule, UserFormComponent],
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent  {

  data = inject(MAT_DIALOG_DATA);

}
