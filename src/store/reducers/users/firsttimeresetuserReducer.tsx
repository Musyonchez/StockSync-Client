// store/reducers/firstTimeResetUserReducer.tsx
import { Action } from 'redux';
import { User } from '../../../types/user'; // Replace 'User' with the actual type of your user object

// Define a more specific action type with a payload property
interface firstTimeResetUserSuccessAction extends Action {
  type: 'FIRSTTIMERESET_USER_SUCCESS';
  payload: User; // Adjust this type based on your actual payload
}

interface firstTimeResetUserFailureAction extends Action {
  type: 'FIRSTTIMERESET_USER_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface firstTimeResetUserRequestAction extends Action {
  type: 'FIRSTTIMERESET_USER_REQUEST';
}

// Union type for all possible user actions
type UserAction = firstTimeResetUserSuccessAction | firstTimeResetUserFailureAction | firstTimeResetUserRequestAction;

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

const firstTimeResetUserReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'FIRSTTIMERESET_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FIRSTTIMERESET_USER_SUCCESS':
      // Now TypeScript knows that action.payload exists
      return { ...state, data: action.payload, loading: false, error: null };
    case 'FIRSTTIMERESET_USER_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default firstTimeResetUserReducer;
