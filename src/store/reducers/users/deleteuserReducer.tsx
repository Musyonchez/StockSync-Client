// store/reducers/deleteUserReducer.tsx
import { Action } from 'redux';
import { User } from '../../../types/user'; // Replace 'Product' with the actual type of your product object

// Define a more specific action type with a payload property
interface DeleteUserSuccessAction extends Action {
  type: 'DELETE_USER_SUCCESS';
  payload: User; // Adjust this type based on your actual payload
}

interface DeleteUserFailureAction extends Action {
  type: 'DELETE_USER_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface DeleteUserRequestAction extends Action {
  type: 'DELETE_USER_REQUEST';
}

// Union type for all possible product actions
type UserAction = DeleteUserSuccessAction | DeleteUserFailureAction | DeleteUserRequestAction;

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

const deleteuserReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'DELETE_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'DELETE_USER_SUCCESS':
      // Now TypeScript knows that action.payload exists
      return { ...state, data: action.payload, loading: false, error: null };
    case 'DELETE_USER_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default deleteuserReducer;
