import { Directive, inject, Input } from "@angular/core";
import {
  AbstractControl,
  NgControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

export function matchValidator<T>(validOptions: T[] | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || !validOptions) return null; // Allow empty values

    const isValid = validOptions.includes(control.value as T);
    return isValid ? null : { optionMismatch: true };
  };
}
@Directive({
  selector: "[appOptionValidation]",
  standalone: true,
})
export class OptionValidationDirective {
  #list: Array<string | number | boolean> | null = null;
  #validator: ValidatorFn | null = null;

  #ngControl = inject(NgControl, { optional: true });

  @Input("list")
  set list(value: Array<string | number | boolean> | null) {
    this.#list = value;
    this.#validator = matchValidator(this.#list);
    this.applyValidator();
  }

  private applyValidator() {
    if (this.#ngControl?.control && this.#validator) {
      this.#ngControl.control.setValidators([
        Validators.required,
        this.#validator,
      ]);
      this.#ngControl.control.updateValueAndValidity();
    }
  }
}
