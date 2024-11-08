import { inject } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
} from "rxjs/operators";
import { MessageManager } from "../utils/messages-manger";

export class FormErrorService {
  #messageManager = inject(MessageManager);

  getMessages$(form: FormGroup): Observable<ValidationErrors> {
    const errors$ = form.statusChanges.pipe(startWith(form.status)).pipe(
      map(() => this.#getFormErrors(form)),
      distinctUntilChanged((prev, curr) => this.#areErrorsEqual(prev, curr))
    );

    return errors$.pipe(
      map((errors) => this.#mapErrorsToMessages(errors)),
      shareReplay(1)
    );
  }

  #areErrorsEqual(
    prevErrors: ValidationErrors,
    currErrors: ValidationErrors
  ): boolean {
    return JSON.stringify(prevErrors) === JSON.stringify(currErrors);
  }

  #getFormErrors(form: FormGroup): ValidationErrors {
    const errors: ValidationErrors = {};
    Object.keys(form.controls).forEach((key: string) => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        errors[key] = controlErrors;
      }
    });
    return errors;
  }

  #mapErrorsToMessages(errors: ValidationErrors): {
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
}
