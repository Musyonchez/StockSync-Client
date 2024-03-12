// actions/userActions.tsx
import { User } from "../../types/user";

export const updateNewPasswordRecoveryUserRequest = (
  id: string,
  temporaryAccessKey: string,
  password: string,
  company?: string,
  type?: string
) => ({
  type: "UPDATENEWPASSWORDRECOVERY_USER_REQUEST",
  payload: {
    id,
    temporaryAccessKey,
    password,
    company,
    type,
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
