// actions/transactionActions.ts
import { Transaction } from '../../../types/transaction'; // Assuming you have a transaction type

export const fetchTransactionRequest = (  id: string, company: string, type: string) => ({
  type: 'FETCH_TRANSACTION_REQUEST',
  payload:  { id, company, type }
});

export const fetchTransactionSuccess = (transaction: Transaction) => ({
  type: 'FETCH_TRANSACTION_SUCCESS',
  payload: transaction
});

export const fetchTransactionFailure = (error: string) => ({
  type: 'FETCH_TRANSACTION_FAILURE',
  payload: error
});
