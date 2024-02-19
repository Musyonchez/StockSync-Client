// store/reducers/fetchproductsReducer.tsx
import { Action } from 'redux';
import { Product } from '../../../types/product'; // Replace 'Product' with the actual type of your product object

// Define a more specific action type with a payload property
interface FetchActiveProductsSuccessAction extends Action {
  type: 'FETCH_ACTIVE_PRODUCTS_SUCCESS';
  payload: Product; // Adjust this type based on your actual payload
}

interface FetchActiveProductsFailureAction extends Action {
  type: 'FETCH_ACTIVE_PRODUCTS_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface FetchActiveProductsRequestAction extends Action {
  type: 'FETCH_ACTIVE_PRODUCTS_REQUEST';
}

// Union type for all possible product actions
type ProductAction = FetchActiveProductsSuccessAction | FetchActiveProductsFailureAction | FetchActiveProductsRequestAction;

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

const productReducer = (state: ProductState = initialState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'FETCH_ACTIVE_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_ACTIVE_PRODUCTS_SUCCESS':
      // Now TypeScript knows that action.payload exists
      // Check if the product with the same ID already exists
      const existingProductIndex = state.data.findIndex((product: Product) => product.id === action.payload.id);

      if (existingProductIndex !== -1) {
        // If exists, create a new array with the updated product
        const newData = [...state.data];
        newData[existingProductIndex] = action.payload;
        return { ...state, data: newData, loading: false, error: null };
      } else {
        // If doesn't exist, add the new product to the array
        return { ...state, data: [...state.data, action.payload], loading: false, error: null };
      }
    case 'FETCH_ACTIVE_PRODUCTS_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
