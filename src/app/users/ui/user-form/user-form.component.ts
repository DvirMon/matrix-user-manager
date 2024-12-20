import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  OnInit,
  ResourceRef,
  Signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { OptionValidationDirective } from "src/app/shared/directives/option-validation.directive";
import { User, UserForm } from "src/app/users/data-access/user";
import { FormErrorService } from "src/app/shared/services/form/form-error.service";
import { provideFormErrorService } from "src/app/shared/services/form/providers";
import { CountriesService } from "src/app/shared/services/utils/countries.service";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import { UserFormService } from "./user-form.service";
import { messagesMap } from "./utils";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";

@Component({
  selector: "app-user-form",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    OptionValidationDirective,
    InfiniteScrollDirective,
  ],
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideFormErrorService({ errorMessages: messagesMap })],
})
export class UserFormComponent implements OnInit {
  selector = ".country-list";

  user = input.required<User | null>();

  #countriesService = inject(CountriesService);

  #userFormService = inject(UserFormService);

  #formErrorService = inject(FormErrorService);

  #dialogRef: MatDialogRef<UserDialogComponent> = inject(MatDialogRef);

  #countryValueSubject = new Subject<string>();

  userForm = linkedSignal({
    source: () => this.user,
    computation: () =>
      this.#userFormService.createUserForm(this.user() || ({} as User)),
  });

  errors!: { [K in keyof UserForm]: Signal<string> };

  query = this.#setQueryChanged();

  options = linkedSignal({
    source: () => this.query(),
    computation: (query: string) =>
      this.#countriesService.filterCountries(query),
  });
  ngOnInit(): void {
    this.errors = this.#formErrorService.getErrors(this.userForm());
  }

  #setQueryChanged() {
    const source$ = this.#countryValueSubject
      .asObservable()
      .pipe(debounceTime(300));

    return toSignal(source$, { initialValue: "" });
  }

  onSave(): void {
    const updateUser = { ...this.user(), ...this.userForm().value };
    this.#dialogRef.close(updateUser);
  }

  onCancel(): void {
    this.#dialogRef.close(null);
  }

  onCountryChanged(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.#countryValueSubject.next(input);
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    // this.#countriesService
    //   .getCountryDetails(event.option.value)
    //   .subscribe((country) => {
    //     console.log(country[0]);
    //   });
  }

  onScroll() {
    console.log("Scrolling...");
  }
}
