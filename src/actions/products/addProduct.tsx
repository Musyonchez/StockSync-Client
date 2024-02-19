// actions/productActions.tsx
import { Product } from '../../types/product';

export const addProductRequest = (
  name: string,
  description: string,
  minimumQuantity: number,
  currentQuantity: number,
  reorderQuantity: number,
  costCurrent: number,
  costPrevious: number,
  company: string,
  type: string
) => ({
  type: 'ADD_PRODUCT_REQUEST',
  payload: {
    name,
    description,
    minimumQuantity,
    currentQuantity,
    reorderQuantity,
    costCurrent,
    costPrevious,
    company,
    type,
  },
});

export const addProductSuccess = (product: Product) => ({
  type: 'ADD_PRODUCT_SUCCESS',
  payload: product,
});

export const addProductFailure = (error: string) => ({
  type: 'ADD_PRODUCT_FAILURE',
  payload: error,
});
