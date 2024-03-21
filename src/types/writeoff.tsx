export interface Writeoff {
  id: string;
  details: WriteoffDetail[];
  createdAt: string;
  creatorId: string;
  creatorName: string;
  totalAmount: number;
  reason: string;
  totalProducts: number;
}

export interface WriteoffDetail {
  id: string;
  name: string;
  category: string;
  current: number;
  unitCost: number;
  sellingPrice: number;
  taxInformation: number;
  supplier: string;
  quantity: number;
}
