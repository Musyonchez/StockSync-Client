// actions/productActions.tsx
import { Product } from "../../types/product";



export const deactivateProductRequest = (
  id: string,
  company?: string,
  type?: string
) => ({
  type: "DEACTIVATE_PRODUCT_REQUEST",
  payload: {
    id,
    company,
    type,
  },
});

export const deactivateProductSuccess = (product: Product) => ({
  type: "DEACTIVATE_PRODUCT_SUCCESS",
  payload: product,
});

export const deactivateProductFailure = (error: string) => ({
  type: "DEACTIVATE_PRODUCT_FAILURE",
  payload: error,
});

