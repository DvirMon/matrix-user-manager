import { AsyncPipe, NgFor, NgIf } from "@angular/common";
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
  Validators,
} from "@angular/forms";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { User } from "src/app/models/user";
import { CountriesService } from "src/app/services/utils/countries.service";
import { FormErrorService } from "src/app/services/form/form-error.service";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import { provideUserMessageManger } from "./user-form-error.service";
import { countryMatchValidator, UserFormService } from "./user-form.service";
import { OptionValidationDirective } from "src/app/directives/option-validation.directive";

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
    OptionValidationDirective
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

  #dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);

  #countryValueSubject = new Subject<string>();

  userForm!: FormGroup;

  filteredCountries$!: Observable<string[]>;

  messages$!: Observable<{ [key: string]: string }>;

  triggerValidCountries$!: Observable<string[]>;

  ngOnInit(): void {
    this.userForm = this.#userFormService.createUserForm(this.user, this.#fbn);

    this.filteredCountries$ = this.#getCountries();

    this.messages$ = this.#formErrorService.getMessages$(this.userForm);
  }


  #getCountries(): Observable<string[]> {
    return this.#countryValueSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.#countriesService.filterCountries(query)),
      shareReplay(1)
    );
  }

  onSave(): void {
    const updateUser = { ...this.user, ...this.userForm.value };
    this.#dialogRef.close(updateUser);
  }

  onCancel(): void {
    this.#dialogRef.close(null);
  }

  onCountryChanged(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.#countryValueSubject.next(input);
  }
}
