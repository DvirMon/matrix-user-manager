import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent  {
}
