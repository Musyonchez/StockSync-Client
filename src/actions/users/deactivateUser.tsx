// actions/userActions.tsx
import { User } from "../../types/user";



export const deactivateUserRequest = (
  id: string,
  company?: string,
  type?: string
) => ({
  type: "DEACTIVATE_USER_REQUEST",
  payload: {
    id,
    company,
    type,
  },
});

export const deactivateUserSuccess = (user: User) => ({
  type: "DEACTIVATE_USER_SUCCESS",
  payload: user,
});

export const deactivateUserFailure = (error: string) => ({
  type: "DEACTIVATE_USER_FAILURE",
  payload: error,
});

