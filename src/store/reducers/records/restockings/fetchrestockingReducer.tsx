import { Action } from "redux";
import { Restocking } from "../../../../types/restocking"; // Assuming you have a restocking type

// Define a more specific action type with a payload property
interface FetchRestockingSuccessAction extends Action {
  type: "FETCH_RESTOCKING_SUCCESS";
  payload: Restocking; // Adjust this type based on your actual payload
}

interface FetchRestockingFailureAction extends Action {
  type: "FETCH_RESTOCKING_FAILURE";
  payload: string; // Adjust this type based on your actual payload
}

interface FetchRestockingRequestAction extends Action {
  type: "FETCH_RESTOCKING_REQUEST";
}

// Union type for all possible restocking actions
type RestockingAction =
  | FetchRestockingSuccessAction
  | FetchRestockingFailureAction
  | FetchRestockingRequestAction;

interface RestockingState {
    data: Restocking | null;
    loading: boolean;
  error: string | null;
}

const initialState: RestockingState = {
    data: null,
    loading: false,
  error: null,
};

const restockingReducer = (
  state: RestockingState = initialState,
  action: RestockingAction
): RestockingState => {
  switch (action.type) {
    case "FETCH_RESTOCKING_REQUEST":
      return { ...state, loading: true, error: null };
      case "FETCH_RESTOCKING_SUCCESS":
        // Now TypeScript knows that action.payload exists
        return { ...state, data: action.payload, loading: false, error: null };

    case "FETCH_RESTOCKING_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default restockingReducer;
