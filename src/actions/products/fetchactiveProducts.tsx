// actions/productActions.tsx
import { Product } from '../../types/product'; 



export const fetchactiveProductsRequest = (company: string, type: string, take: number, skip: number) => ({ 
  type: 'FETCH_ACTIVE_PRODUCTS_REQUEST', 
  payload: { company, type, take, skip }
});

export const fetchactiveProductsSuccess = (products: Product) => ({ 
  type: 'FETCH_ACTIVE_PRODUCTS_SUCCESS', 
  payload: products 
});

export const fetchactiveProductsFailure = (error: string) => ({ 
  type: 'FETCH_ACTIVE_PRODUCTS_FAILURE', 
  payload: error 
});
