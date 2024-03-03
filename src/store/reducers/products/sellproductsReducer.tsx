import { Action } from "redux";
import { Product } from "../../../types/product";

// Define a more specific action type with a payload property
interface SellProductsSuccessAction extends Action {
  type: "SELL_PRODUCTS_SUCCESS";
  payload: boolean; // Updated to reflect the boolean payload
 }
 

interface SellProductsFailureAction extends Action {
  type: "SELL_PRODUCTS_FAILURE";
  payload: string;
}

interface SellProductsRequestAction extends Action {
  type: "SELL_PRODUCTS_REQUEST";
  payload: {
    company: string;
    type: string;
    total: number;
    filterArray: { productId: string; toSubtract: number; quantity: number }[];
  };
}

// Union type for all possible sell product actions
type SellProductAction =
  | SellProductsSuccessAction
  | SellProductsFailureAction
  | SellProductsRequestAction;

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

const sellProductsReducer = (
  state: ProductState = initialState,
  action: SellProductAction
): ProductState => {
  switch (action.type) {
    case "SELL_PRODUCTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "SELL_PRODUCTS_SUCCESS":
      // Assuming you want to update the state based on the success boolean
      // For example, you might want to clear the error or update a success flag
      return { ...state, loading: false, error: null, data: action.payload };
    case "SELL_PRODUCTS_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default sellProductsReducer;
