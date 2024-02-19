// actions/productActions.tsx
import { Product } from '../../types/product'; 

export const fetchProductRequest = (  id: string, company: string, type: string) => ({ 
  type: 'FETCH_PRODUCT_REQUEST', 
  payload: { id, company, type }
});

export const fetchProductSuccess = (products: Product) => ({ 
  type: 'FETCH_PRODUCT_SUCCESS', 
  payload: products 
});

export const fetchProductFailure = (error: string) => ({ 
  type: 'FETCH_PRODUCT_FAILURE', 
  payload: error 
});
