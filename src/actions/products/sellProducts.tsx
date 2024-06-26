export const sellProductsRequest = (
  id: string,
  name: string,
  company: string,
  type: string,
  total: number,
  filterArray: {
    productId: string;
    toSubtract: number;
    quantity: number;
  }[]
) => ({
  type: "SELL_PRODUCTS_REQUEST",
  payload: { id, name, company, type, total, filterArray },
});

export const sellProductsSuccess = (success: boolean) => ({
  type: "SELL_PRODUCTS_SUCCESS",
  payload: success,
});

export const sellProductsFailure = (error: string) => ({
  type: "SELL_PRODUCTS_FAILURE",
  payload: error,
});
