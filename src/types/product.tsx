// types/product.ts
export interface Product {
    map(arg0: (product: any) => import("react").JSX.Element): import("react").ReactNode;
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
  