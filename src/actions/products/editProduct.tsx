// actions/productActions.tsx
import { Product } from "../../types/product";

// Update action types
export const editProductRequest = (
  id: string,
  name?: string,
  description?: string,
  minimumQuantity?: number,
  currentQuantity?: number,
  reorderQuantity?: number,
  costCurrent?: number,
  costPrevious?: number,
  company?: string,
  type?: string
) => ({
  type: "EDIT_PRODUCT_REQUEST",
  payload: {
    id,
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

export const editProductSuccess = (product: Product) => ({
  type: "EDIT_PRODUCT_SUCCESS",
  payload: product,
});

export const editProductFailure = (error: string) => ({
  type: "EDIT_PRODUCT_FAILURE",
  payload: error,
});
