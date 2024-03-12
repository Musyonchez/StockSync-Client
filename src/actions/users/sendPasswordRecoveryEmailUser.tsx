// actions/userActions.tsx
import { User } from "../../types/user";

export const sendPasswordRecoveryEmailUserRequest = (
  email: string,
  company?: string
) => ({
  type: "SENDPASSWORDRECOVERYEMAIL_USER_REQUEST",
  payload: {
    email,
    company,
  },
});

export const sendPasswordRecoveryEmailUserSuccess = (user: User) => ({
  type: "SENDPASSWORDRECOVERYEMAIL_USER_SUCCESS",
  payload: user,
});

export const sendPasswordRecoveryEmailUserFailure = (error: string) => ({
  type: "SENDPASSWORDRECOVERYEMAIL_USER_FAILURE",
  payload: error,
});
