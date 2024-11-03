import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from "@angular/core";
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { User } from "src/app/models/user";
import { CountriesService } from "src/app/services/countries.service";
import { UserFormService } from "./user-form.service";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  Subject,
  switchMap,
} from "rxjs";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  @Input() user: Partial<User> | undefined = {};
  userForm!: FormGroup;

  #inputSubject = new Subject<string>();

  #fbn = inject(NonNullableFormBuilder);

  #countriesService = inject(CountriesService);

  // dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);
  #userFormService = inject(UserFormService);

  filteredCountries$!: Observable<string[]>;

  ngOnInit(): void {
    this.userForm = this.#userFormService.createUserForm(this.user, this.#fbn);

    this.filteredCountries$ = this.#setCountries(this.user?.country);
  }

  #setCountries(initialCountry: string | undefined): Observable<string[]> {
    return this.#inputSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(initialCountry || ""),
      switchMap((query) => this.#countriesService.filterCountries(query))
    );
  }

  onSave(): void {
    // Logic for handling save
    // this.dialogRef.close(true);
  }

  onCancel(): void {
    // this.dialogRef.close(false);
  }

  onInputChanged(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.#inputSubject.next(input);
  }
}
