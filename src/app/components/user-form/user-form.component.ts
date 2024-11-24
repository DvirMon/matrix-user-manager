import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  OnInit,
  ResourceRef,
  Signal,
} from "@angular/core";
import {
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
  shareReplay,
  Subject,
  switchMap,
} from "rxjs";
import { OptionValidationDirective } from "src/app/directives/option-validation.directive";
import { User, UserForm } from "src/app/models/user";
import { FormErrorService } from "src/app/services/form/form-error.service";
import { provideFormErrorService } from "src/app/services/form/providers";
import { CountriesService } from "src/app/services/utils/countries.service";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import { UserFormService } from "./user-form.service";
import { messagesMap } from "./utils";

@Component({
  selector: "app-user-form",
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    OptionValidationDirective,
  ],
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [FormErrorService, provideUserMessageManger()],
  providers: [
    provideFormErrorService([
      [
        "pattern",
        (field: string) => {
          return "pattern";
        },
      ],
    ]),
  ],
})
export class UserFormComponent implements OnInit {
  user = input.required<User | null>();

  #fbn = inject(NonNullableFormBuilder);

  #countriesService = inject(CountriesService);

  #userFormService = inject(UserFormService);

  #formErrorService = inject(FormErrorService);

  #dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);

  #countryValueSubject = new Subject<string>();

  userForm = linkedSignal({
    source: () => this.user,
    computation: () =>
      this.#userFormService.createUserForm(
        this.user() || ({} as User),
        this.#fbn
      ),
  });

  filteredCountries$!: Observable<string[]>;

  errors!: { [K in keyof UserForm]: Signal<string> };

  triggerValidCountries$!: Observable<string[]>;

  countriesResource: ResourceRef<string[]> =
    this.#countriesService.getCountriesResource();

  ngOnInit(): void {
    this.filteredCountries$ = this.#getCountries();

    this.errors = this.#formErrorService.getErrors(this.userForm());
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
    const updateUser = { ...this.user, ...this.userForm().value };
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
