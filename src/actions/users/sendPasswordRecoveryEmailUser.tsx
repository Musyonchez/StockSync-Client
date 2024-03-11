// actions/userActions.tsx
import { User } from "../../types/user";

export const sendPasswordRecoveryEmailUserRequest = (
  id: string,
  email: string,
  company?: string,
  type?: string
) => ({
  type: "SENDPASSWORDRECOVERYEMAIL_USER_REQUEST",
  payload: {
    id,
    email,
    company,
    type,
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
