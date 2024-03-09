import { Action } from "redux";
import { Product } from "../../../types/product";

// Define a more specific action type with a payload property
interface WriteoffProductsSuccessAction extends Action {
  type: "WRITEOFF_PRODUCTS_SUCCESS";
  payload: boolean; // Updated to reflect the boolean payload
 }
 

interface WriteoffProductsFailureAction extends Action {
  type: "WRITEOFF_PRODUCTS_FAILURE";
  payload: string;
}

interface WriteoffProductsRequestAction extends Action {
  type: "WRITEOFF_PRODUCTS_REQUEST";
  payload: {
    company: string;
    type: string;
    total: number;
    reason: string;
    filterArray: { productId: string; toSubtract: number; quantity: number }[];
  };
}

// Union type for all possible writeoff product actions
type WriteoffProductAction =
  | WriteoffProductsSuccessAction
  | WriteoffProductsFailureAction
  | WriteoffProductsRequestAction;

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

const writeoffProductsReducer = (
  state: ProductState = initialState,
  action: WriteoffProductAction
): ProductState => {
  switch (action.type) {
    case "WRITEOFF_PRODUCTS_REQUEST":
      return { ...state, data: false, loading: true, error: null };
    case "WRITEOFF_PRODUCTS_SUCCESS":
      // Assuming you want to update the state based on the success boolean
      // For example, you might want to clear the error or update a success flag
      return { ...state, loading: false, error: null, data: action.payload };
    case "WRITEOFF_PRODUCTS_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default writeoffProductsReducer;
