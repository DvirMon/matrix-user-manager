import { inject, Injectable } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/users/data-access/user";

@Injectable({
  providedIn: "root",
})
export class UserFormService {
  #fbn = inject(NonNullableFormBuilder);

  createUserForm(user: User) {
    return this.#fbn.group({
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
        [Validators.required, Validators.pattern(/^[0-9]*$/)],
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
