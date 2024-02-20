// store/reducers/deleteProductReducer.tsx
import { Action } from 'redux';
import { Product } from '../../../types/product'; // Replace 'Product' with the actual type of your product object

// Define a more specific action type with a payload property
interface DeleteProductSuccessAction extends Action {
  type: 'DELETE_PRODUCT_SUCCESS';
  payload: Product; // Adjust this type based on your actual payload
}

interface DeleteProductFailureAction extends Action {
  type: 'DELETE_PRODUCT_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface DeleteProductRequestAction extends Action {
  type: 'DELETE_PRODUCT_REQUEST';
}

// Union type for all possible product actions
type ProductAction = DeleteProductSuccessAction | DeleteProductFailureAction | DeleteProductRequestAction;

interface ProductState {
  data: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
};

const deleteproductReducer = (state: ProductState = initialState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'DELETE_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };
    case 'DELETE_PRODUCT_SUCCESS':
      // Now TypeScript knows that action.payload exists
      return { ...state, data: action.payload, loading: false, error: null };
    case 'DELETE_PRODUCT_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default deleteproductReducer;
