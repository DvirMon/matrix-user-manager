import { inject, Injectable } from "@angular/core";
import {
  FormControl,
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import { User } from "src/app/users/data-access/user";

type UserFormControls = {
  [K in keyof Omit<User, 'id'>]: FormControl<User[K]>;
};
@Injectable({
  providedIn: "root",
})
export class UserFormService {
  #nfb = inject(NonNullableFormBuilder);

  createUserForm(user: User) {
    return this.#nfb.group<UserFormControls>({
      firstName: this.#nfb.control(user.firstName || "", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\u0590-\u05FF\s]*$/),
      ]),
      lastName: this.#nfb.control(user.lastName || "", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\u0590-\u05FF\s]*$/),
      ]),
      age: this.#nfb.control(user.age || 0, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]),
      city: this.#nfb.control(user.city || "", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\u0590-\u05FF\s]*$/),
      ]),
      gender: this.#nfb.control(user.gender || "", Validators.required),
      country: this.#nfb.control(user.country || "", Validators.required),
    });
  }
}
