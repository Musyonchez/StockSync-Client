// store/reducers/editUserReducer.tsx
import { Action } from 'redux';
import { User } from '../../../types/user';

// Define a more specific action type with a payload property
interface EditUserSuccessAction extends Action {
  type: 'EDIT_USER_SUCCESS';
  payload: User; // Adjust this type based on your actual payload
}

interface EditUserFailureAction extends Action {
  type: 'EDIT_USER_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface EditUserRequestAction extends Action {
  type: 'EDIT_USER_REQUEST';
}

// Union type for all possible product actions
type UserAction = EditUserSuccessAction | EditUserFailureAction | EditUserRequestAction;

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

const edituserReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'EDIT_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'EDIT_USER_SUCCESS':
      // Now TypeScript knows that action.payload exists
      return { ...state, data: action.payload, loading: false, error: null };
    case 'EDIT_USER_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default edituserReducer;
