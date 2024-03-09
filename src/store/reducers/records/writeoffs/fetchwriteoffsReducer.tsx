import { Action } from "redux";
import { Writeoff } from "../../../../types/writeoff"; // Assuming you have a writeoff type

// Define a more specific action type with a payload property
interface FetchWriteoffsSuccessAction extends Action {
  type: "FETCH_WRITEOFFS_SUCCESS";
  payload: Writeoff; // Adjust this type based on your actual payload
}

interface FetchWriteoffsFailureAction extends Action {
  type: "FETCH_WRITEOFFS_FAILURE";
  payload: string; // Adjust this type based on your actual payload
}

interface FetchWriteoffsRequestAction extends Action {
  type: "FETCH_WRITEOFFS_REQUEST";
}

// Union type for all possible writeoff actions
type WriteoffAction =
  | FetchWriteoffsSuccessAction
  | FetchWriteoffsFailureAction
  | FetchWriteoffsRequestAction;

interface WriteoffState {
  data: Writeoff[];
  loading: boolean;
  error: string | null;
}

const initialState: WriteoffState = {
  data: [],
  loading: false,
  error: null,
};

const writeoffsReducer = (
  state: WriteoffState = initialState,
  action: WriteoffAction
): WriteoffState => {
  switch (action.type) {
    case "FETCH_WRITEOFFS_REQUEST":
      return { ...state, loading: true, error: null };
      case "FETCH_WRITEOFFS_SUCCESS":
        // Now TypeScript knows that action.payload exists
        // Check if the writeoff with the same ID already exists
        const existingWriteoffIndex = state.data.findIndex(
          (writeoff: Writeoff) => writeoff.id === action.payload.id
        );
  
        if (existingWriteoffIndex !== -1) {
          // If exists, create a new array with the updated writeoff
          const newData = [...state.data];
          newData[existingWriteoffIndex] = action.payload;
          return { ...state, data: newData, loading: false, error: null };
        } else {
          // If doesn't exist, add the new writeoff to the array
          return {
            ...state,
            data: [...state.data, action.payload],
            loading: false,
            error: null,
          };
        }
    case "FETCH_WRITEOFFS_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default writeoffsReducer;
