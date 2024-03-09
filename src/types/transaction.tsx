export interface Transaction {
  id: string;
  details: TransactionDetail[];
  createdAt: string;
  creatorId: string;
  creatorName: string;
  totalAmount: number;
}

export interface TransactionDetail {
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
