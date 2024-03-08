// actions/productActions.tsx
import { Product } from "../../types/product";

// Update action types
export const editProductRequest = (
  id: string,
  company: string,
  type: string,
  filterArray: { field: string; value: string; }[]
) => ({
  type: "EDIT_PRODUCT_REQUEST",
  payload: {
    id,
    company,
    type,
    filterArray,
  },
});

export const editProductSuccess = (product: Product) => ({
  type: "EDIT_PRODUCT_SUCCESS",
  payload: product,
});

export const editProductFailure = (error: string) => ({
  type: "EDIT_PRODUCT_FAILURE",
  payload: error,
});
