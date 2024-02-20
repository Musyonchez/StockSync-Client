// actions/userActions.tsx
import { Product } from '../../types/product'; 



export const fetchUsersRequest = (company: string, type: string) => ({ 
  type: 'FETCH_USERS_REQUEST', 
  payload: { company, type }
});

export const fetchUsersSuccess = (products: Product) => ({ 
  type: 'FETCH_USERS_SUCCESS', 
  payload: products 
});

export const fetchUsersFailure = (error: string) => ({ 
  type: 'FETCH_USERS_FAILURE', 
  payload: error 
});

