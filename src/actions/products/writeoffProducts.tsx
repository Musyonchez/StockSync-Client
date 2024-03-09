export const writeoffProductsRequest = (
    id: string,
    name: string,
    company: string,
    type: string,
    total: number,
    reason: string,
    filterArray: {
      productId: string;
      toSubtract: number;
      quantity: number;
    }[]
  ) => ({
    type: "WRITEOFF_PRODUCTS_REQUEST",
    payload: { id, name, company, type, total, reason, filterArray },
  });
  
  export const writeoffProductsSuccess = (success: boolean) => ({
    type: "WRITEOFF_PRODUCTS_SUCCESS",
    payload: success,
  });
  
  export const writeoffProductsFailure = (error: string) => ({
    type: "WRITEOFF_PRODUCTS_FAILURE",
    payload: error,
  });
  