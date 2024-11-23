import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  OnInit,
  runInInjectionContext,
  Signal,
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
  shareReplay,
  Subject,
  switchMap,
} from "rxjs";
import { OptionValidationDirective } from "src/app/directives/option-validation.directive";
import { User } from "src/app/models/user";
import { FormErrorService } from "src/app/services/form/form-error.service";
import { CountriesService } from "src/app/services/utils/countries.service";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import { provideUserMessageManger } from "./user-form-error.service";
import { UserFormService } from "./user-form.service";
import { Sign } from "crypto";

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
  providers: [FormErrorService, provideUserMessageManger()],
})
export class UserFormComponent implements OnInit {
  @Input() user: Partial<User> | undefined = {};

  #injector = inject(Injector);

  #fbn = inject(NonNullableFormBuilder);

  #countriesService = inject(CountriesService);

  #userFormService = inject(UserFormService);

  #formErrorService = inject(FormErrorService);

  #dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);

  #countryValueSubject = new Subject<string>();

  userForm!: FormGroup;

  filteredCountries$!: Observable<string[]>;

  errors!: { [key: string]: Signal<string> };

  triggerValidCountries$!: Observable<string[]>;

  ngOnInit(): void {
    this.userForm = this.#userFormService.createUserForm(this.user, this.#fbn);

    this.filteredCountries$ = this.#getCountries();

    this.errors = this.#formErrorService.setErrors(this.userForm);
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
