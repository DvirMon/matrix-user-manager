import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-table",
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  editEvent = output<User>();
  deleteEvent = output<User>();

  data = input.required<User[] | undefined>();

  dataSource = computed(() =>
    this.data() !== undefined ? (this.data() as User[]) : []
  );
  hasUsers = computed(() => this.dataSource().length > 0);

  columns = input.required<{ key: string; header: string }[]>();

  hasActions = input<boolean>(true);

  displayedColumns = computed(() => {
    const columnKeys = this.columns().map((col) => col.key);
    return this.hasActions() ? [...columnKeys, "actions"] : columnKeys;
  });

  onEdit(row: User): void {
    this.editEvent.emit(row);
  }

  onDelete(row: User): void {
    this.deleteEvent.emit(row);
  }
}
