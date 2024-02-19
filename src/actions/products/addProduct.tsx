// actions/productActions.tsx
import { Product } from '../../types/product'; 


export const addProductRequest = (  id: string, company: string, type: string) => ({ 
  type: 'ADD_PRODUCT_REQUEST', 
  payload: { id, company, type }
});

export const addProductSuccess = (products: Product) => ({ 
  type: 'ADD_PRODUCT_SUCCESS', 
  payload: products 
});

export const addProductFailure = (error: string) => ({ 
  type: 'ADD_PRODUCT_FAILURE', 
  payload: error 
});
