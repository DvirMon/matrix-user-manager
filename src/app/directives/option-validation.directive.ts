import { Directive, inject, Input } from "@angular/core";
import {
  AbstractControl,
  NgControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";

export function matchValidator<T>(validOptions: Set<T> | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || !validOptions) return null;

    const isValid = validOptions.has(control.value);
    return isValid ? null : { optionMismatch: true };
  };
}
@Directive({
  selector: "[appOptionValidation]",
  standalone: true,
})
export class OptionValidationDirective {
  #list: Set<string | number | boolean> | null = null;
  #validator: ValidatorFn | null = null;

  #ngControl = inject(NgControl, { optional: true });

  @Input("list")
  set list(value: Array<string | number | boolean> | null) {
    this.#list = new Set(value);
    this.#validator = matchValidator(this.#list);
    this.#applyValidator();
  }

  #applyValidator() {
    if (this.#ngControl?.control && this.#validator) {
      this.#ngControl.control.setValidators([
        Validators.required,
        this.#validator,
      ]);
      this.#ngControl.control.updateValueAndValidity();
    }
  }
}
