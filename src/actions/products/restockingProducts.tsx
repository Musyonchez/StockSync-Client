export const restockingProductsRequest = (
    id: string,
    name: string,
    company: string,
    type: string,
    total: number,
    filterArray: {
      productId: string;
      toAdd: number;
      quantity: number;
    }[]
  ) => ({
    type: "RESTOCKING_PRODUCTS_REQUEST",
    payload: { id, name, company, type, total, filterArray },
  });
  
  export const restockingProductsSuccess = (success: boolean) => ({
    type: "RESTOCKING_PRODUCTS_SUCCESS",
    payload: success,
  });
  
  export const restockingProductsFailure = (error: string) => ({
    type: "RESTOCKING_PRODUCTS_FAILURE",
    payload: error,
  });
  