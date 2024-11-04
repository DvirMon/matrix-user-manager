import { Injectable } from "@angular/core";
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { User } from "src/app/models/user";

export function countryMatchValidator(validCountries: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // Allow empty values

    const isValid = validCountries.includes(control.value);
    return isValid ? null : { countryMismatch: true };
  };
}

@Injectable({
  providedIn: "root",
})
export class UserFormService {
  createUserForm(
    user: Partial<User> = {},
    fbn: NonNullableFormBuilder
  ): FormGroup {
    return fbn.group({
      firstName: [
        user.firstName || "",
        [Validators.required, Validators.pattern(/^[a-zA-Z\u0590-\u05FF\s]*$/)],
      ],
      lastName: [
        user.lastName || "",
        [Validators.required, Validators.pattern(/^[a-zA-Z\u0590-\u05FF\s]*$/)],
      ],
      age: [
        user.age || null,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      city: [
        user.city || "",
        [Validators.required, Validators.pattern(/^[a-zA-Z\u0590-\u05FF\s]*$/)],
      ],
      gender: [user.gender || "", Validators.required],
      country: [user.country || "", Validators.required],
    });
  }
}
