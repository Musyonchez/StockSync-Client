import { Action } from "redux";
import { Restocking } from "../../../../types/restocking"; // Assuming you have a restocking type

// Define a more specific action type with a payload property
interface FetchRestockingsSuccessAction extends Action {
  type: "FETCH_RESTOCKINGS_SUCCESS";
  payload: Restocking; // Adjust this type based on your actual payload
}

interface FetchRestockingsFailureAction extends Action {
  type: "FETCH_RESTOCKINGS_FAILURE";
  payload: string; // Adjust this type based on your actual payload
}

interface FetchRestockingsRequestAction extends Action {
  type: "FETCH_RESTOCKINGS_REQUEST";
}

// Union type for all possible restocking actions
type RestockingAction =
  | FetchRestockingsSuccessAction
  | FetchRestockingsFailureAction
  | FetchRestockingsRequestAction;

interface RestockingState {
  data: Restocking[];
  loading: boolean;
  error: string | null;
}

const initialState: RestockingState = {
  data: [],
  loading: false,
  error: null,
};

const restockingsReducer = (
  state: RestockingState = initialState,
  action: RestockingAction
): RestockingState => {
  switch (action.type) {
    case "FETCH_RESTOCKINGS_REQUEST":
      return { ...state, loading: true, error: null };
      case "FETCH_RESTOCKINGS_SUCCESS":
        // Now TypeScript knows that action.payload exists
        // Check if the restocking with the same ID already exists
        const existingRestockingIndex = state.data.findIndex(
          (restocking: Restocking) => restocking.id === action.payload.id
        );
  
        if (existingRestockingIndex !== -1) {
          // If exists, create a new array with the updated restocking
          const newData = [...state.data];
          newData[existingRestockingIndex] = action.payload;
          return { ...state, data: newData, loading: false, error: null };
        } else {
          // If doesn't exist, add the new restocking to the array
          return {
            ...state,
            data: [...state.data, action.payload],
            loading: false,
            error: null,
          };
        }
    case "FETCH_RESTOCKINGS_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default restockingsReducer;
