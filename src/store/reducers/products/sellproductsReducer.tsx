import { Action } from "redux";
import { Product } from "../../../types/product";

// Define a more specific action type with a payload property
interface SellProductsSuccessAction extends Action {
  type: "SELL_PRODUCTS_SUCCESS";
  payload: Product; // Adjust this type based on your actual payload
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
    filterArray: { field: string; value: number }[];
  };
}

// Union type for all possible sell product actions
type SellProductAction =
  | SellProductsSuccessAction
  | SellProductsFailureAction
  | SellProductsRequestAction;

interface ProductState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: [],
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
      // TypeScript knows that action.payload exists and is a product
      const existingProductIndex = state.data.findIndex(
        (product: Product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        // If exists, create a new array with the updated product
        const newData = [...state.data];
        newData[existingProductIndex] = action.payload;
        return { ...state, data: newData, loading: false, error: null };
      } else {
        // If doesn't exist, add the new product to the array
        return {
          ...state,
          data: [...state.data, action.payload],
          loading: false,
          error: null,
        };
      }
    case "SELL_PRODUCTS_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default sellProductsReducer;