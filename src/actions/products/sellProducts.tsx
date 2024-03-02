
export const sellProductsRequest = (
    company: string,
    type: string,
    filterArray: { field: string; value: number }[]
  ) => ({
    type: 'SELL_PRODUCTS_REQUEST',
    payload: { company, type, filterArray },
  });
  
  export const sellProductsSuccess = (success: boolean) => ({
    type: 'SELL_PRODUCTS_SUCCESS',
    payload: success,
   });
   
  
  export const sellProductsFailure = (error: string) => ({
    type: 'SELL_PRODUCTS_FAILURE',
    payload: error,
  });
  