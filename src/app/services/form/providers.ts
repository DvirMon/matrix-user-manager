import { Provider } from "@angular/core";
import { AbstractMessageManager } from "../utils/abstract-messages-manger";
import { FormErrorService } from "./form-error.service";
import { MessageErrorsService } from "./message-errors.service";
import { ERROR_MESSAGE_PROVIDERS } from "./tokens";

export type ReactiveErrorConfig = {
  errorMessages?: ErrorMessageMapping;
  messageManagerType?: { new (): AbstractMessageManager }; // Custom MessageManager type
};

/**
 * Type representing an array of error message mappings.
 * Each entry includes:
 * - A string key (e.g., validation error type such as "required").
 * - A function that generates an error message for the given field and error value.
 */
export type ErrorMessageMapping = [
  string,
  (field: string, errorValue?: any) => string
][];

export function provideErrorMessage(value?: ErrorMessageMapping): Provider {
  return {
    provide: ERROR_MESSAGE_PROVIDERS,
    useValue: value,
  };
}

export function provideFormErrorService(
  options: ReactiveErrorConfig = {
    errorMessages: [],
    messageManagerType: MessageErrorsService,
  }
): Provider {
  return [
    FormErrorService,
    provideErrorMessage(options.errorMessages),
    {
      provide: AbstractMessageManager,
      useClass: options.messageManagerType || MessageErrorsService,
    },
  ];
}
