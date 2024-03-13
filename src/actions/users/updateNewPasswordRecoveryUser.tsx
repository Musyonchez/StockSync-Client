// actions/userActions.tsx
import { User } from "../../types/user";

export const updateNewPasswordRecoveryUserRequest = (
  email: string,
  temporaryAccessKey: string,
  password: string,
  company?: string,
) => ({
  type: "UPDATENEWPASSWORDRECOVERY_USER_REQUEST",
  payload: {
    email,
    temporaryAccessKey,
    password,
    company,
  },
});

export const updateNewPasswordRecoveryUserSuccess = (user: User) => ({
  type: "UPDATENEWPASSWORDRECOVERY_USER_SUCCESS",
  payload: user,
});

export const updateNewPasswordRecoveryUserFailure = (error: string) => ({
  type: "UPDATENEWPASSWORDRECOVERY_USER_FAILURE",
  payload: error,
});
