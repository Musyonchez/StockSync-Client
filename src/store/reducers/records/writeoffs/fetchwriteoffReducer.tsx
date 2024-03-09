import { Action } from "redux";
import { Writeoff } from "../../../../types/writeoff"; // Assuming you have a writeoff type

// Define a more specific action type with a payload property
interface FetchWriteoffSuccessAction extends Action {
  type: "FETCH_WRITEOFF_SUCCESS";
  payload: Writeoff; // Adjust this type based on your actual payload
}

interface FetchWriteoffFailureAction extends Action {
  type: "FETCH_WRITEOFF_FAILURE";
  payload: string; // Adjust this type based on your actual payload
}

interface FetchWriteoffRequestAction extends Action {
  type: "FETCH_WRITEOFF_REQUEST";
}

// Union type for all possible writeoff actions
type WriteoffAction =
  | FetchWriteoffSuccessAction
  | FetchWriteoffFailureAction
  | FetchWriteoffRequestAction;

interface WriteoffState {
    data: Writeoff | null;
    loading: boolean;
  error: string | null;
}

const initialState: WriteoffState = {
    data: null,
    loading: false,
  error: null,
};

const writeoffReducer = (
  state: WriteoffState = initialState,
  action: WriteoffAction
): WriteoffState => {
  switch (action.type) {
    case "FETCH_WRITEOFF_REQUEST":
      return { ...state, loading: true, error: null };
      case "FETCH_WRITEOFF_SUCCESS":
        // Now TypeScript knows that action.payload exists
        return { ...state, data: action.payload, loading: false, error: null };

    case "FETCH_WRITEOFF_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default writeoffReducer;
