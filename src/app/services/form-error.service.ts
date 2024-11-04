import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map, shareReplay, startWith } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FormErrorService {
  messages$!: Observable<{ [key: string]: string }>;

  #errorMessagesLookup = new Map<string, (field: string, error: any) => string>(
    [
      ["required", (field) => `${this.formatKey(field)} is required.`],
      ["pattern", (field) => this.getPatternErrorMessage(field)],
      [
        "min",
        (field, error) =>
          `${this.formatKey(field)} must be at least ${error.min}.`,
      ],
    ]
  );

  initializeErrorHandling(form: FormGroup): void {
    const errors$ = form.statusChanges.pipe(startWith(form.status)).pipe(
      map(() => this.#getFormErrors(form)),
      shareReplay(1)
    );

    this.messages$ = errors$.pipe(
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
      const messageFn = this.#errorMessagesLookup.get(firstErrorKey);

      // Generate message if a function exists in the lookup
      if (messageFn) {
        messages[key] = messageFn(key, controlErrors[firstErrorKey]);
      }
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
