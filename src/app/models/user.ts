// export type Gender = "female" | "male" | "other";
import { z } from "zod";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
export const UserSchema = z.object({
  id: z.string().uuid(), // UUID format for IDs
  firstName: z.string().min(1, "First name is required"), // At least 1 character
  lastName: z.string().min(1, "Last name is required"), // At least 1 character
  age: z.number().int().min(0, "Age must be a non-negative integer"), // Non-negative integer
  city: z.string().min(1, "City is required"), // At least 1 character
  gender: z.nativeEnum(Gender), // Enum validation for Gender
  country: z.string().min(1, "Country is required"), // At least 1 character
});

// TypeScript type inference from the schema
export type User = z.infer<typeof UserSchema>;

export type UserForm = Omit<User, "id">;

