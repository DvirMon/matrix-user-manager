import { Directive, Input } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { countryMatchValidator } from "../components/user-form/user-form.service";

@Directive({
  selector: "[appOptionValidation]",
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: OptionValidationDirective,
      multi: true,
    },
  ],
})
export class OptionValidationDirective {
  #validator: ValidatorFn | null = null;

  @Input("list")
  set list(value: string[]) {
    this.#validator = countryMatchValidator(value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.#validator ? this.#validator(control) : null;
  }
}
