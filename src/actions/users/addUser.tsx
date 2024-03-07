// actions/userActions.tsx
import { User } from '../../types/user'; 
import { UserRole } from '../../types/user';


export const addUserRequest = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  store1: boolean,
  store2: boolean,
  store3: boolean,
  store4: boolean,
  role: UserRole, // Ensure UserRole is imported or defined
  company: string,
  type: string
) => ({ 
  type: 'ADD_USER_REQUEST', 
  payload: {
    firstName,
    lastName,
    email,
    password,
    store1,
    store2,
    store3,
    store4,
    role,
    company,
    type,
  },
});

export const addUserSuccess = (user: User) => ({ 
  type: 'ADD_USER_SUCCESS', 
  payload: user 
});

export const addUserFailure = (error: string) => ({ 
  type: 'ADD_USER_FAILURE', 
  payload: error 
});


