// types/user.ts

export type UserRole = "ADMIN" | "USER"; // Add other roles as needed

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  store1: boolean;
  store2: boolean;
  store3: boolean;
  store4: boolean;
  role: UserRole;
  company: string;
  firstRecordAction: boolean;
  firstsignin: boolean;
  active: boolean;
  companyLogo: string;
  imageURL: string;

  [key: string]: string | boolean | undefined;
}

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  store1: boolean;
  store2: boolean;
  store3: boolean;
  store4: boolean;
  role: UserRole;
  active: boolean;
}

export interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  store1: boolean;
  store2: boolean;
  store3: boolean;
  store4: boolean;
  role: UserRole;
  firstRecordAction: boolean;
  firstsignin: boolean;
  companyLogo: string;
  imageURL: string;
}
