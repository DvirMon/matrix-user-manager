import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CrudService<Type extends { id: string }> {
  // Add a new item to the array
  addItem(array: Type[], newItem: Type): Type[] {
    return [newItem, ...array];
  }

  // Delete an item by id
  deleteItem(array: Type[], id: string): Type[] {
    return array.filter((item) => item.id !== id);
  }

  // Edit an existing item in the array
  editItem(array: Type[], updatedItem: Partial<Type>): Type[] {
    const itemIndex = array.findIndex((item) => item.id === updatedItem.id);

    if (itemIndex === -1) return array;

    const updatedArray = [...array];
    updatedArray[itemIndex] = { ...updatedArray[itemIndex], ...updatedItem };

    return updatedArray;
  }
}
