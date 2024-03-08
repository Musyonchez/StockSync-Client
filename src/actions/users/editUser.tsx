// actions/userActions.tsx
import { User } from '../../types/user'; 
import { UserRole } from '../../types/user';

// Add user edit request action
export const editUserRequest = (
  id: string,
  company: string,
  type: string,
  filterArray: { field: string; value: string; }[]
) => ({ 
  type: 'EDIT_USER_REQUEST', 
  payload: {
    id,
    company,
    type,
    filterArray,
  },
});

export const editUserSuccess = (user: User) => ({ 
  type: 'EDIT_USER_SUCCESS', 
  payload: user 
});

export const editUserFailure = (error: string) => ({ 
  type: 'EDIT_USER_FAILURE', 
  payload: error 
});
