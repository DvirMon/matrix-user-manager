function patternUser(field: string): string {
    const patternMessages: { [key: string]: string } = {
      firstName: "First Name can only contain letters and spaces.",
      lastName: "Last Name can only contain letters and spaces.",
      age: "Age must be a positive number.",
      city: "City can only contain letters and spaces.",
    };
    return patternMessages[field];
  }
  
  export const messagesMap = [["pattern", (field: string) => patternUser(field)]];
  