import { AsyncPipe, CommonModule, NgFor, NgIf } from "@angular/common";
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
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  Subject,
  switchMap,
} from "rxjs";
import { User } from "src/app/models/user";
import { CountriesService } from "src/app/services/countries.service";
import { FormErrorService } from "src/app/services/form-error.service";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import { provideUserMessageManger } from "./user-form-error.service";
import { UserFormService } from "./user-form.service";

@Component({
  selector: "app-user-form",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
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
  providers: [FormErrorService, provideUserMessageManger()],
})
export class UserFormComponent implements OnInit {
  @Input() user: Partial<User> | undefined = {};

  #fbn = inject(NonNullableFormBuilder);

  #countriesService = inject(CountriesService);

  #userFormService = inject(UserFormService);

  #formErrorService = inject(FormErrorService);

  #countryValueSubject = new Subject<string>();

  userForm!: FormGroup;

  filteredCountries$!: Observable<string[]>;

  dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);

  messages$!: Observable<{ [key: string]: string }>;

  ngOnInit(): void {
    this.userForm = this.#userFormService.createUserForm(this.user, this.#fbn);

    this.filteredCountries$ = this.#getCountries(this.user?.country);

    this.messages$ = this.#formErrorService.getMessages$(this.userForm);
  }

  #getCountries(initialCountry: string | undefined): Observable<string[]> {
    return this.#countryValueSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(initialCountry || ""),
      switchMap((query) => this.#countriesService.filterCountries(query))
    );
  }

  onSave(): void {
    const updateUser = { ...this.user, ...this.userForm.value };
    this.dialogRef.close(updateUser);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onCountryChanged(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.#countryValueSubject.next(input);
  }
}
