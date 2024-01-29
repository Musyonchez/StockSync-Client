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
