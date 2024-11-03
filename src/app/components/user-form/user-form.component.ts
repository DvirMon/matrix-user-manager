import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from "@angular/core";
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { UserFormService } from "./user-form.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-user-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
  @Input() user: Partial<User> | undefined = {};
  @Input() isEditMode = false;
  userForm!: FormGroup;
  filteredCountries!: Observable<string[]>;

  #fbn = inject(NonNullableFormBuilder);

  #userFormService = inject(UserFormService);

  ngOnInit(): void {
    this.userForm = this.#userFormService.createUserForm(this.user, this.#fbn);
  }

  onSave(): void {}
}
