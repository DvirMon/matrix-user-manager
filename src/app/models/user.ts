export type Gender = 'female' | 'male' | 'other';

export interface User {
    firstName: string;
    lastName: string;
    age: number;
    city: string;
    gender: Gender;
    country: string;
  }