import { inject } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map, shareReplay, startWith } from "rxjs/operators";
import { MessageManager } from "./messages-manger.service";

export class FormErrorService {
  messages$!: Observable<{ [key: string]: string }>;

  #messageManager = inject(MessageManager);

  // initializeErrorHandling(form: FormGroup): void {
  //   const errors$ = form.statusChanges.pipe(startWith(form.status)).pipe(
  //     map(() => this.#getFormErrors(form)),
  //     shareReplay(1)
  //   );

  //   this.messages$ = errors$.pipe(
  //     map((errors) => this.#mapErrorsToMessages(errors)),
  //     shareReplay(1)
  //   );
  // }
  getMessages$(form: FormGroup): Observable<ValidationErrors> {
    const errors$ = form.statusChanges.pipe(startWith(form.status)).pipe(
      map(() => this.#getFormErrors(form)),
      shareReplay(1)
    );

    return errors$.pipe(
      map((errors) => this.#mapErrorsToMessages(errors)),
      shareReplay(1)
    );
  }

  #getFormErrors(form: FormGroup): { [key: string]: any } {
    const errors: { [key: string]: any } = {};
    Object.keys(form.controls).forEach((key) => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        errors[key] = controlErrors;
      }
    });
    return errors;
  }

  #mapErrorsToMessages(errors: { [key: string]: any }): {
    [key: string]: string;
  } {
    return Object.entries(errors).reduce((messages, [key, controlErrors]) => {
      const firstErrorKey = Object.keys(controlErrors)[0];
      messages[key] = this.#messageManager.getErrorMessage(
        key,
        firstErrorKey,
        controlErrors[firstErrorKey]
      );
      return messages;
    }, {} as { [key: string]: string });
  }
  formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  getPatternErrorMessage(field: string): string {
    const patternMessages: { [key: string]: string } = {
      firstName: "First Name can only contain letters and spaces.",
      lastName: "Last Name can only contain letters and spaces.",
      age: "Age must be a positive number.",
      city: "City can only contain letters and spaces.",
    };
    return patternMessages[field] || `${this.formatKey(field)} is invalid.`;
  }
}
