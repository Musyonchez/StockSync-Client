// store/reducers/editproductReducer.tsx
import { Action } from 'redux';
import { Product } from '../../../types/product'; // Replace 'Product' with the actual type of your product object

// Define a more specific action type with a payload property
interface EditProductSuccessAction extends Action {
  type: 'EDIT_PRODUCT_SUCCESS';
  payload: Product; // Adjust this type based on your actual payload
}

interface EditProductFailureAction extends Action {
  type: 'EDIT_PRODUCT_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface EditProductRequestAction extends Action {
  type: 'EDIT_PRODUCT_REQUEST';
}

// Union type for all possible product actions
type ProductAction = EditProductSuccessAction | EditProductFailureAction | EditProductRequestAction;

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

const editproductReducer = (state: ProductState = initialState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'EDIT_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };
      case 'EDIT_PRODUCT_SUCCESS':
        // Now TypeScript knows that action.payload exists
        return { ...state, data: action.payload, loading: false, error: null };
  
      // ... other cases
    case 'EDIT_PRODUCT_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default editproductReducer;
