// actions/productActions.tsx
import { Product } from "../../types/product";


export const deleteProductRequest = (
  id: string,
  company?: string,
  type?: string
) => ({
  type: "DELETE_PRODUCT_REQUEST",
  payload: {
    id,
    company,
    type,
  },
});

export const deleteProductSuccess = (product: Product) => ({
  type: "DELETE_PRODUCT_SUCCESS",
  payload: product,
});

export const deleteProductFailure = (error: string) => ({
  type: "DELETE_PRODUCT_FAILURE",
  payload: error,
});

