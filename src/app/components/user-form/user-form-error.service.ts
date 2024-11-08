import { Injectable, Provider } from "@angular/core";
import { MessageManager } from "src/app/services/utils/messages-manger";

export function provideUserMessageManger(): Provider {
  return { provide: MessageManager, useClass: UserFormErrorService };
}

@Injectable({
  providedIn: "root",
})
export class UserFormErrorService extends MessageManager {
  #errorMessagesLookup = new Map<
    string,
    (field: string, errorValue?: any) => string
  >([
    ["required", (field) => `${this.#formatFieldName(field)} is required.`],
    ["pattern", (field) => this.#getPatternErrorMessage(field)],
    [
      "min",
      (field, errorValue) =>
        `${this.#formatFieldName(field)} must be at least ${errorValue.min}.`,
    ],
  ]);

  getErrorMessage(field: string, errorKey: string, errorValue?: any): string {
    const messageFn = this.#errorMessagesLookup.get(errorKey);
    return messageFn
      ? messageFn(field, errorValue)
      : `${this.#formatFieldName(field)} is invalid.`;
  }

  #formatFieldName(field: string): string {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  #getPatternErrorMessage(field: string): string {
    const patternMessages: { [key: string]: string } = {
      firstName: "First Name can only contain letters and spaces.",
      lastName: "Last Name can only contain letters and spaces.",
      age: "Age must be a positive number.",
      city: "City can only contain letters and spaces.",
    };
    return (
      patternMessages[field] || `${this.#formatFieldName(field)} is invalid.`
    );
  }
}
