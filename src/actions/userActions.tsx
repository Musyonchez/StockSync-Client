// actions/userActions.tsx
import { Product } from '../types/product'; 

export const fetchuserRequest = (  id: string, company: string, type: string) => ({ 
  type: 'FETCH_USER_REQUEST', 
  payload: { id, company, type }
});

export const fetchuserSuccess = (products: Product) => ({ 
  type: 'FETCH_USER_SUCCESS', 
  payload: products 
});

export const fetchuserFailure = (error: string) => ({ 
  type: 'FETCH_USER_FAILURE', 
  payload: error 
});



export const fetchusersRequest = (company: string, type: string) => ({ 
  type: 'FETCH_USERS_REQUEST', 
  payload: { company, type }
});

export const fetchusersSuccess = (products: Product) => ({ 
  type: 'FETCH_USERS_SUCCESS', 
  payload: products 
});

export const fetchusersFailure = (error: string) => ({ 
  type: 'FETCH_USERS_FAILURE', 
  payload: error 
});

