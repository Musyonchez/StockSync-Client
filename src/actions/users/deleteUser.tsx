// actions/userActions.tsx
import { User } from '../../types/user'; 

export const deleteUserRequest = (id: string, company: string, type: string) => ({ 
  type: 'DELETE_USER_REQUEST', 
  payload: { id, company, type }
});

export const deleteUserSuccess = (User: User) => ({ 
  type: 'DELETE_USER_SUCCESS', 
  payload: User 
});

export const deleteUserFailure = (error: string) => ({ 
  type: 'DELETE_USER_FAILURE', 
  payload: error 
});
