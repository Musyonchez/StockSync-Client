// actions/userActions.tsx
import { Product } from '../../types/product'; 



export const fetchUsersRequest = (company: string, type: string, take: number, skip: number) => ({ 
  type: 'FETCH_USERS_REQUEST', 
  payload: { company, type, take, skip }
});

export const fetchUsersSuccess = (products: Product) => ({ 
  type: 'FETCH_USERS_SUCCESS', 
  payload: products 
});

export const fetchUsersFailure = (error: string) => ({ 
  type: 'FETCH_USERS_FAILURE', 
  payload: error 
});

