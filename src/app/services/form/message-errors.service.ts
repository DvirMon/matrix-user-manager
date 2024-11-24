import { Injectable } from "@angular/core";
import { MessageManager } from "../utils/messages-manger";

@Injectable({
  providedIn: "root",
})
export class MessageErrorsService extends MessageManager {
  // Default error messages lookup
  private errorMessagesLookup = new Map<
    string,
    (field: string, errorValue?: any) => string
  >([
    ["required", (field) => `${this.formatFieldName(field)} is required.`],
    [
      "minlength",
      (field, errorValue) =>
        `${this.formatFieldName(field)} must be at least ${
          errorValue.requiredLength
        } characters.`,
    ],
    [
      "maxlength",
      (field, errorValue) =>
        `${this.formatFieldName(field)} cannot exceed ${
          errorValue.requiredLength
        } characters.`,
    ],
    [
      "pattern",
      (field) =>
        `${this.formatFieldName(field)} does not match the required pattern.`,
    ],
  ]);

  /**
   * Retrieves an error message for a specific form control validation error.
   * Users can override or add messages by using `addErrorMessage`.
   */
  getErrorMessage(field: string, errorKey: string, errorValue?: any): string {
    const messageFn = this.errorMessagesLookup.get(errorKey);
    return messageFn
      ? messageFn(field, errorValue)
      : `${this.formatFieldName(field)} is invalid.`;
  }

  /**
   * Adds or overrides an error message for a specific error key.
   * @param errorKey - The validation error key (e.g., "required", "pattern").
   * @param messageFn - A function that takes the field name and error value,
   *                    and returns the error message.
   */
  addErrorMessage(
    errorKey: string,
    messageFn: (field: string, errorValue?: any) => string
  ): void {
    this.errorMessagesLookup.set(errorKey, messageFn);
  }

  /**
   * Formats a field name into a more readable format (e.g., camelCase to "Camel Case").
   * @param field - The name of the field to format.
   */
  protected formatFieldName(field: string): string {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }
}
