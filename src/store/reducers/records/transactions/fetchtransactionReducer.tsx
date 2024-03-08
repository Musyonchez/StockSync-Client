import { Action } from "redux";
import { Transaction } from "../../../../types/transaction"; // Assuming you have a transaction type

// Define a more specific action type with a payload property
interface FetchTransactionSuccessAction extends Action {
  type: "FETCH_TRANSACTION_SUCCESS";
  payload: Transaction; // Adjust this type based on your actual payload
}

interface FetchTransactionFailureAction extends Action {
  type: "FETCH_TRANSACTION_FAILURE";
  payload: string; // Adjust this type based on your actual payload
}

interface FetchTransactionRequestAction extends Action {
  type: "FETCH_TRANSACTION_REQUEST";
}

// Union type for all possible transaction actions
type TransactionAction =
  | FetchTransactionSuccessAction
  | FetchTransactionFailureAction
  | FetchTransactionRequestAction;

interface TransactionState {
    data: Transaction | null;
    loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
    data: null,
    loading: false,
  error: null,
};

const transactionReducer = (
  state: TransactionState = initialState,
  action: TransactionAction
): TransactionState => {
  switch (action.type) {
    case "FETCH_TRANSACTION_REQUEST":
      return { ...state, loading: true, error: null };
      case "FETCH_TRANSACTION_SUCCESS":
        // Now TypeScript knows that action.payload exists
        return { ...state, data: action.payload, loading: false, error: null };

    case "FETCH_TRANSACTION_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
