import { inject, Injector, runInInjectionContext, Signal } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
} from "rxjs/operators";
import { MessageManager } from "../utils/messages-manger";
import { toSignal } from "@angular/core/rxjs-interop";

export class FormErrorService {
  #messageManager = inject(MessageManager);

  #injector = inject(Injector);

  setErrors(form: FormGroup) {
    return runInInjectionContext(this.#injector, () => this.getErrors(form));
  }

  getErrors(form: FormGroup): { [key: string]: Signal<string> } {
    const controlErrorStreams: { [key: string]: Signal<string> } = {};

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control) {
        controlErrorStreams[key] = toSignal(
          this.#getControlMessageStream(control, key),
          { initialValue: "" }
        );
      }
    });

    return controlErrorStreams;
  }

  #getControlMessageStream(
    control: AbstractControl,
    controlName: string
  ): Observable<string> {
    return control.statusChanges.pipe(
      startWith(control.status),
      map(() => control.errors),
      filter((errors) => errors !== null),
      distinctUntilChanged((prev, curr) => this.#areErrorsEqual(prev, curr)),
      map((errors) => this.#getFirstErrorMessage(controlName, errors)),
      shareReplay(1)
    );
  }

  #areErrorsEqual(
    prevErrors: ValidationErrors,
    currErrors: ValidationErrors
  ): boolean {
    return JSON.stringify(prevErrors) === JSON.stringify(currErrors);
  }

  #getFirstErrorMessage(
    controlName: string,
    errors: ValidationErrors | null
  ): string {
    if (errors) {
      const firstErrorKey = Object.keys(errors)[0];
      return this.#messageManager.getErrorMessage(
        controlName,
        firstErrorKey,
        errors[firstErrorKey]
      );
    }
    return ""; // No error
  }
}
