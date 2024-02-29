// actions/productActions.tsx
import { Product } from "../../types/product";

export const addProductRequest = (
  name: string,
  description: string,
  category: string,

  company: string,
  type: string
) => ({
  type: "ADD_PRODUCT_REQUEST",
  payload: {
    name,
    description,
    category,

    company,
    type,
  },
});

export const addProductSuccess = (product: Product) => ({
  type: "ADD_PRODUCT_SUCCESS",
  payload: product,
});

export const addProductFailure = (error: string) => ({
  type: "ADD_PRODUCT_FAILURE",
  payload: error,
});
