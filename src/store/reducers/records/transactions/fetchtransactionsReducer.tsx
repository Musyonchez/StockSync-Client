import { Action } from "redux";
import { Transaction } from "../../../../types/transaction"; // Assuming you have a transaction type

// Define a more specific action type with a payload property
interface FetchTransactionsSuccessAction extends Action {
  type: "FETCH_TRANSACTIONS_SUCCESS";
  payload: Transaction; // Adjust this type based on your actual payload
}

interface FetchTransactionsFailureAction extends Action {
  type: "FETCH_TRANSACTIONS_FAILURE";
  payload: string; // Adjust this type based on your actual payload
}

interface FetchTransactionsRequestAction extends Action {
  type: "FETCH_TRANSACTIONS_REQUEST";
}

// Union type for all possible transaction actions
type TransactionAction =
  | FetchTransactionsSuccessAction
  | FetchTransactionsFailureAction
  | FetchTransactionsRequestAction;

interface TransactionState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  data: [],
  loading: false,
  error: null,
};

const transactionsReducer = (
  state: TransactionState = initialState,
  action: TransactionAction
): TransactionState => {
  switch (action.type) {
    case "FETCH_TRANSACTIONS_REQUEST":
      return { ...state, loading: true, error: null };
      case "FETCH_TRANSACTIONS_SUCCESS":
        // Now TypeScript knows that action.payload exists
        // Check if the transaction with the same ID already exists
        const existingTransactionIndex = state.data.findIndex(
          (transaction: Transaction) => transaction.id === action.payload.id
        );
  
        if (existingTransactionIndex !== -1) {
          // If exists, create a new array with the updated transaction
          const newData = [...state.data];
          newData[existingTransactionIndex] = action.payload;
          return { ...state, data: newData, loading: false, error: null };
        } else {
          // If doesn't exist, add the new transaction to the array
          return {
            ...state,
            data: [...state.data, action.payload],
            loading: false,
            error: null,
          };
        }
    case "FETCH_TRANSACTIONS_FAILURE":
      // TypeScript knows that action.payload exists and is a string
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default transactionsReducer;
