// store/reducers/fetchuserReducer.tsx
import { Action } from 'redux';
import { User } from '../../../types/user'; // Replace 'Product' with the actual type of your product object

// Define a more specific action type with a payload property
interface FetchUserSuccessAction extends Action {
  type: 'FETCH_USER_SUCCESS';
  payload: User; // Adjust this type based on your actual payload
}

interface FetchUserFailureAction extends Action {
  type: 'FETCH_USER_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface FetchUserRequestAction extends Action {
  type: 'FETCH_USER_REQUEST';
}

// Union type for all possible product actions
type UserAction = FetchUserSuccessAction | FetchUserFailureAction | FetchUserRequestAction;

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return { ...state, loading: true, error: null };
      case 'FETCH_USER_SUCCESS':
        // Now TypeScript knows that action.payload exists
        return { ...state, data: action.payload, loading: false, error: null };
  
      // ... other cases
    case 'FETCH_USER_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
