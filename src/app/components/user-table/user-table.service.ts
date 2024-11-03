import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest, map } from "rxjs";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class UserTableService {
  #dataSubject = new BehaviorSubject<User[]>([]);
  #columnsSubject = new BehaviorSubject<{ key: string; header: string }[]>([]);
  #hasActionsSubject = new BehaviorSubject<boolean>(true);

  // Public observables for components to subscribe to
  data$: Observable<User[]> = this.#dataSubject.asObservable();
  columns$: Observable<{ key: string; header: string }[]> =
    this.#columnsSubject.asObservable();
  hasActions$: Observable<boolean> = this.#hasActionsSubject.asObservable();

  // Combined observable for dynamically calculated displayed columns
  displayedColumns$: Observable<string[]> = combineLatest([
    this.#columnsSubject,
    this.#hasActionsSubject,
  ]).pipe(
    map(([columns, hasActions]) => {
      const columnKeys = columns.map((col) => col.key);
      return hasActions ? [...columnKeys, "actions"] : columnKeys;
    })
  );

  setData(data: User[]): void {
    this.#dataSubject.next(data);
  }

  setColumns(columns: { key: string; header: string }[]): void {
    this.#columnsSubject.next(columns);
  }

  setHasActions(hasActions: boolean): void {
    this.#hasActionsSubject.next(hasActions);
  }
}
