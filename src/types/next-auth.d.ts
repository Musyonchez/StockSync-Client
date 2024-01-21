// next-auth.d.ts
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



// Create a file, e.g., types.ts
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



// // types/next-auth.d.ts
// import { DefaultUser } from 'next-auth';

// declare module 'next-auth' {
//   interface User extends DefaultUser {
//     firstName?: string;
//     id: string;
//       email?: string;
//       token?: string;

//     // Add other custom properties as needed
//   }
// }

