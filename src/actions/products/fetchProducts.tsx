// actions/productActions.tsx
import { Product } from "../../types/product";

export const fetchProductsRequest = (company: string, type: string) => ({
  type: "FETCH_PRODUCTS_REQUEST",
  payload: { company, type },
});

export const fetchProductsSuccess = (products: Product) => ({
  type: "FETCH_PRODUCTS_SUCCESS",
  payload: products,
});

export const fetchProductsFailure = (error: string) => ({
  type: "FETCH_PRODUCTS_FAILURE",
  payload: error,
});
