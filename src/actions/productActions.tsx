// actions/productActions.tsx
import { Product } from '../types/product'; 

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



export const fetchProductsRequest = (company: string, type: string) => ({ 
  type: 'FETCH_PRODUCTS_REQUEST', 
  payload: { company, type }
});

export const fetchProductsSuccess = (products: Product) => ({ 
  type: 'FETCH_PRODUCTS_SUCCESS', 
  payload: products 
});

export const fetchProductsFailure = (error: string) => ({ 
  type: 'FETCH_PRODUCTS_FAILURE', 
  payload: error 
});

