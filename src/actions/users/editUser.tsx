// actions/userActions.tsx
import { User } from '../../types/user'; 
import { UserRole } from '../../types/user';

// Add user edit request action
export const editUserRequest = (
  id: string,
  firstName: string,
  lastName: string,
  age: number,
  store1: boolean,
  store2: boolean,
  store3: boolean,
  store4: boolean,
  role: UserRole, // Ensure UserRole is imported or defined
  company: string,
  type: string
) => ({ 
  type: 'EDIT_USER_REQUEST', 
  payload: {
    id,
    firstName,
    lastName,
    age,
    store1,
    store2,
    store3,
    store4,
    role,
    company,
    type,
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
