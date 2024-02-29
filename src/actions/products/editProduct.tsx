// actions/productActions.tsx
import { Product } from "../../types/product";

// Update action types
export const editProductRequest = (
  id: string,
  name?: string,
  description?: string,
  category?: string,
  current?: number,
  reoderLevel?: number,
  unitCost?: number,
  sellingPrice?: number,
  taxInformation?: number,
  imageURL?: string,
  supplier?: string,
  company?: string,
  type?: string
) => ({
  type: "EDIT_PRODUCT_REQUEST",
  payload: {
    id,
    name,
    description,
    category,
    current,
    reoderLevel,
    unitCost,
    sellingPrice,
    taxInformation,
    imageURL,
    supplier,
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
