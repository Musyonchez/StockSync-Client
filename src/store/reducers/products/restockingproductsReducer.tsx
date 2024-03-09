import { Action } from "redux";
import { Product } from "../../../types/product";

// Define a more specific action type with a payload property
interface RestockingProductsSuccessAction extends Action {
  type: "RESTOCKING_PRODUCTS_SUCCESS";
  payload: boolean; // Updated to reflect the boolean payload
 }
 

interface RestockingProductsFailureAction extends Action {
  type: "RESTOCKING_PRODUCTS_FAILURE";
  payload: string;
}

interface RestockingProductsRequestAction extends Action {
  type: "RESTOCKING_PRODUCTS_REQUEST";
  payload: {
    company: string;
    type: string;
    filterArray: { productId: string; toAdd: number; quantity: number }[];
  };
}

// Union type for all possible restocking product actions
type RestockingProductAction =
  | RestockingProductsSuccessAction
  | RestockingProductsFailureAction
  | RestockingProductsRequestAction;

interface ProductState {
  data: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: false,
  loading: false,
  error: null,
};

const restockingProductsReducer = (
  state: ProductState = initialState,
  action: RestockingProductAction
): ProductState => {
  switch (action.type) {
    case "RESTOCKING_PRODUCTS_REQUEST":
      return { ...state, data: false, loading: true, error: null };
    case "RESTOCKING_PRODUCTS_SUCCESS":
      // Assuming you want to update the state based on the success boolean
      // For example, you might want to clear the error or update a success flag
      return { ...state, loading: false, error: null, data: action.payload };
    case "RESTOCKING_PRODUCTS_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default restockingProductsReducer;
