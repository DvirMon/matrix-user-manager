import { inject, Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserDialogComponent, UserDialogData } from "./user-dialog.component";

@Injectable({
  providedIn: "root",
})
export class UserDialogService {
  #dialog = inject(MatDialog);

  open<T>(data?: UserDialogData): MatDialogRef<UserDialogComponent> {
    return this.#dialog.open(UserDialogComponent, {
      data,
      autoFocus: true,
      hasBackdrop: true,
      disableClose: true,
    });
  }
}
