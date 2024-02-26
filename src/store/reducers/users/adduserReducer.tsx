// store/reducers/addUserReducer.tsx
import { Action } from 'redux';
import { User } from '../../../types/user';

// Define a more specific action type with a payload property
interface AddUserSuccessAction extends Action {
  type: 'ADD_USER_SUCCESS';
  payload: User; // Adjust this type based on your actual payload
}

interface AddUserFailureAction extends Action {
  type: 'ADD_USER_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface AddUserRequestAction extends Action {
  type: 'ADD_USER_REQUEST';
}

// Union type for all possible product actions
type UserAction = AddUserSuccessAction | AddUserFailureAction | AddUserRequestAction;

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

const adduserReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'ADD_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'ADD_USER_SUCCESS':
      // Now TypeScript knows that action.payload exists
      return { ...state, data: action.payload, loading: false, error: null };
    case 'ADD_USER_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default adduserReducer;
