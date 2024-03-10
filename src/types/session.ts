export interface SessionType {
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    store1?: boolean;
    store2?: boolean;
    store3?: boolean;
    store4?: boolean;
    role?: UserRole;
    firstsignin?: boolean;
    company?: string;
  };
  expires: string;
}

export enum UserRole {
  Admin = "Admin",
  User = "User",
}
