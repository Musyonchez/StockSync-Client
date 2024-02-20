// actions/userActions.tsx
import { Product } from '../../types/product'; 

export const fetchUserRequest = (  id: string, company: string, type: string) => ({ 
  type: 'FETCH_USER_REQUEST', 
  payload: { id, company, type }
});

export const fetchUserSuccess = (products: Product) => ({ 
  type: 'FETCH_USER_SUCCESS', 
  payload: products 
});

export const fetchUserFailure = (error: string) => ({ 
  type: 'FETCH_USER_FAILURE', 
  payload: error 
});

