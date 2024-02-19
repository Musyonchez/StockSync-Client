// store/reducers/fetchusersReducer.tsx
import { Action } from 'redux';
import { User } from '../../../types/user'; // Replace 'Product' with the actual type of your product object

// Define a more specific action type with a payload property
interface FetchUsersSuccessAction extends Action {
  type: 'FETCH_USERS_SUCCESS';
  payload: User; // Adjust this type based on your actual payload
}

interface FetchUsersFailureAction extends Action {
  type: 'FETCH_USERS_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface FetchUsersRequestAction extends Action {
  type: 'FETCH_USERS_REQUEST';
}

// Union type for all possible product actions
type UserAction = FetchUsersSuccessAction | FetchUsersFailureAction | FetchUsersRequestAction;

interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

const productReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      // Now TypeScript knows that action.payload exists
      // Check if the product with the same ID already exists
      const existingProductIndex = state.data.findIndex((product: User) => product.id === action.payload.id);

      if (existingProductIndex !== -1) {
        // If exists, create a new array with the updated product
        const newData = [...state.data];
        newData[existingProductIndex] = action.payload;
        return { ...state, data: newData, loading: false, error: null };
      } else {
        // If doesn't exist, add the new user to the array
        return { ...state, data: [...state.data, action.payload], loading: false, error: null };
      }
    case 'FETCH_USERS_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
