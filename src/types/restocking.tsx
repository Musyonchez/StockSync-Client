export interface Restocking {
  id: string;
  details: RestockingDetail[];
  createdAt: string;
  creatorId: string;
  creatorName: string;
  totalAmount: number;
}

export interface RestockingDetail {
  id: string;
  name: string;
  category: string;
  current: number;
  unitCost: number;
  sellingPrice: number;
  supplier: string;
  quantity: number;
}
