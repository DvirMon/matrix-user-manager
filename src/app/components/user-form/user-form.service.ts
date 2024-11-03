import { inject, Injectable } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";

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
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
      ],
      lastName: [
        user.lastName || "",
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
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
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
      ],
      gender: [user.gender || "", Validators.required],
      country: [user.country || "", Validators.required],
    });
  }
}
