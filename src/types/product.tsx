// types/product.ts
export interface Product {
  map(
    arg0: (product: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: string;
  name: string;
  description: string;
  category?: string;
  current: number;
  reorderLevel: number;
  unitCost: number;
  sellingPrice: number;
  taxInformation: number;
  imageURL: string;
  supplier: string;
  active: boolean;
  quantity: number;
  firstTransaction : boolean;
}
