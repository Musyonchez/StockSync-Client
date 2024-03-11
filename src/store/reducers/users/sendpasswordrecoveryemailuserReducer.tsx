// store/reducers/sendPasswordRecoveryEmailUserReducer.tsx
import { Action } from 'redux';
import { User } from '../../../types/user'; // Replace 'User' with the actual type of your user object

// Define a more specific action type with a payload property
interface sendPasswordRecoveryEmailUserSuccessAction extends Action {
  type: 'SENDPASSWORDRECOVERYEMAIL_USER_SUCCESS';
  payload: User; // Adjust this type based on your actual payload
}

interface sendPasswordRecoveryEmailUserFailureAction extends Action {
  type: 'SENDPASSWORDRECOVERYEMAIL_USER_FAILURE';
  payload: string; // Adjust this type based on your actual payload
}

interface sendPasswordRecoveryEmailUserRequestAction extends Action {
  type: 'SENDPASSWORDRECOVERYEMAIL_USER_REQUEST';
}

// Union type for all possible user actions
type UserAction = sendPasswordRecoveryEmailUserSuccessAction | sendPasswordRecoveryEmailUserFailureAction | sendPasswordRecoveryEmailUserRequestAction;

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

const sendPasswordRecoveryEmailUserReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SENDPASSWORDRECOVERYEMAIL_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'SENDPASSWORDRECOVERYEMAIL_USER_SUCCESS':
      // Now TypeScript knows that action.payload exists
      return { ...state, data: action.payload, loading: false, error: null };
    case 'SENDPASSWORDRECOVERYEMAIL_USER_FAILURE':
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default sendPasswordRecoveryEmailUserReducer;
