// actions/userActions.tsx
import { User } from "../../types/user";

export const firstTimeResetUserRequest = (
  id: string,
  password: string,
  company?: string,
  type?: string
) => ({
  type: "FIRSTTIMERESET_USER_REQUEST",
  payload: {
    id,
    password,
    company,
    type,
  },
});

export const firstTimeResetUserSuccess = (user: User) => ({
  type: "FIRSTTIMERESET_USER_SUCCESS",
  payload: user,
});

export const firstTimeResetUserFailure = (error: string) => ({
  type: "FIRSTTIMERESET_USER_FAILURE",
  payload: error,
});
