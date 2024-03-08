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
}