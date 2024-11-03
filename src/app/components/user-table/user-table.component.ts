import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { BehaviorSubject, Observable, combineLatest, map } from "rxjs";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-table",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent  {
  
  #dataSubject = new BehaviorSubject<User[]>([]);
  #columnsSubject = new BehaviorSubject<{ key: string; header: string }[]>([]);
  #hasActionsSubject = new BehaviorSubject<boolean>(false);

  // Public observables for the table template
  data$: Observable<any[]> = this.#dataSubject.asObservable();
  columns$: Observable<{ key: string; header: string }[]> =
    this.#columnsSubject.asObservable();
  hasActions$: Observable<boolean> = this.#hasActionsSubject.asObservable();

  displayedColumns$: Observable<string[]>;

  // Input setters with BehaviorSubjects
  @Input() set data(value: User[] | null) {
    this.#dataSubject.next(value || []);
  }

  @Input() set columns(value: { key: string; header: string }[]) {
    this.#columnsSubject.next(value || []);
  }

  @Input() set hasActions(value: boolean) {
    this.#hasActionsSubject.next(value || false);
  }

  

  constructor() {

    this.displayedColumns$ = combineLatest([
      this.#columnsSubject,
      this.#hasActionsSubject,
    ]).pipe(
      map(([columns, hasActions]) => {
        const columnKeys = columns.map((col) => col.key);
        return hasActions ? [...columnKeys, "actions"] : columnKeys;
      })
    );
  }

  

  onEdit(row: any): void {
    console.log("Edit:", row);
    // Trigger edit logic or emit an event
  }

  onDelete(row: any): void {
    console.log("Delete:", row);
    // Trigger delete logic or emit an event
  }
}
