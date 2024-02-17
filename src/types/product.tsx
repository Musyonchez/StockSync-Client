// types/product.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    minimumQuantity: number;
    currentQuantity: number;
    reorderQuantity: number;
    costCurrent: number;
    costPrevious: number;
    active: boolean;
    // Add other properties as needed
  }
  