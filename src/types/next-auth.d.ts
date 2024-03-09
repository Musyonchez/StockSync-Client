import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      store1?: boolean;
      store2?: boolean;
      store3?: boolean;
      store4?: boolean;
      company?: string;
      role?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
}

export type OrderDataState = {
  header: any;
  vender: any;
  customer: any;
  shipping: any;
  products: any[];
};

export type InvoiceDataState = {
  header: any;
  vender: any;
  customer: any;
  shipping: any;
  products: any[];
  bank: any[];
};

interface TransactionDetail {
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

interface TransactionDataState {
  id: string;
  createdAt: string;
  totalAmount: number;
  details: TransactionDetail[];
}

interface WriteoffDetail {
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

interface WriteoffDataState {
  id: string;
  createdAt: string;
  totalAmount: number;
  details: WriteoffDetail[];
}

interface RestockingDetail {
  id: string;
  name: string;
  category: string;
  current: number;
  unitCost: number;
  sellingPrice: number;
  supplier: string;
  quantity: number;
}

interface RestockingDataState {
  id: string;
  createdAt: string;
  creatorId: string;
  creatorName: string;
  details: RestockingDetail[];
}
