import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { UserTableService } from "./user-table.service";

@Component({
  selector: "app-user-table",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserTableService],
})
export class UserTableComponent {
  #tableService = inject(UserTableService);

  @Output() editEvent = new EventEmitter<User>();
  @Output() deleteEvent = new EventEmitter<User>();

  data$: Observable<User[]> = this.#tableService.data$;
  columns$: Observable<{ key: string; header: string }[]> =
    this.#tableService.columns$;
  displayedColumns$: Observable<string[]> =
    this.#tableService.displayedColumns$;
  hasActions$: Observable<boolean> = this.#tableService.hasActions$;

  // Input setters call the service methods to update state
  @Input() set data(value: User[] | null) {
    this.#tableService.setData(value || []);
  }

  @Input() set columns(value: { key: string; header: string }[]) {
    this.#tableService.setColumns(value || []);
  }

  @Input() set hasActions(value: boolean) {
    this.#tableService.setHasActions(value);
  }

  onEdit(row: User): void {
    this.editEvent.emit(row);
  }

  onDelete(row: User): void {
    this.deleteEvent.emit(row);
  }
}
