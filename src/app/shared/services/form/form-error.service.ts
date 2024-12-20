import { inject, Injector, runInInjectionContext, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
} from "rxjs/operators";
import { AbstractMessageManager } from "../utils/abstract-messages-manger";

type ControlMap = Record<string, AbstractControl<any>>;

export class FormErrorService {
  #messageManager = inject(AbstractMessageManager);

  #injector = inject(Injector);

  getErrors<TControl extends ControlMap>(
    form: FormGroup<TControl>
  ): { [K in keyof TControl]: Signal<string> } {
    return runInInjectionContext(this.#injector, () => this.#setErrors(form));
  }

  #setErrors<TControl extends ControlMap>(
    form: FormGroup<TControl>
  ): { [K in keyof TControl]: Signal<string> } {
    const controlErrorStreams: Partial<{
      [K in keyof TControl]: Signal<string>;
    }> = {};

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control) {
        const errorMessage$ = this.#getControlMessageStream(control, key);

        controlErrorStreams[key as keyof TControl] = toSignal(errorMessage$, {
          initialValue: "",
        });
      }
    });

    return controlErrorStreams as { [K in keyof TControl]: Signal<string> };
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
    const prevKeys = Object.keys(prevErrors);
    const currKeys = Object.keys(currErrors);

    if (prevKeys.length !== currKeys.length) {
      return false;
    }

    // If there is more than one key, compare using JSON.stringify
    if (prevKeys.length > 1) {
      return JSON.stringify(prevErrors) === JSON.stringify(currErrors);
    }

    // For single-key objects, compare the error type
    return prevKeys[0] === currKeys[0];
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
