import { Product } from "../../types/product";

export const searchProductsRequest = (
  company: string,
  type: string,
  filterArray: { field: string; value: string }[]
) => ({
  type: "SEARCH_PRODUCTS_REQUEST",
  payload: { company, type, filterArray },
});

export const searchProductsSuccess = (products: Product) => ({
  type: "SEARCH_PRODUCTS_SUCCESS",
  payload: products,
});

export const searchProductsFailure = (error: string) => ({
  type: "SEARCH_PRODUCTS_FAILURE",
  payload: error,
});
