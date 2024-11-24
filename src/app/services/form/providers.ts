import { Provider } from "@angular/core";
import { ERROR_MESSAGE_PROVIDERS } from "./tokens";
import { MessageManager } from "../utils/messages-manger";
import { FormErrorService } from "./form-error.service";
import { MessageErrorsService } from "./message-errors.service";

export type ReactiveErrorConfig = {
  errorMessages?: ErrorMessageMapping;
  messageManagerType?: { new (): MessageManager }; // Custom MessageManager type
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
  options: ReactiveErrorConfig
): Provider {
  return [
    FormErrorService,
    provideErrorMessage(options.errorMessages),
    {
      provide: MessageManager,
      useClass: options.messageManagerType || MessageErrorsService,
    },
  ];
}
