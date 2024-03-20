// actions/transactionActions.ts
import { Transaction } from '../../../types/transaction'; // Assuming you have a transaction type

export const fetchTransactionsRequest = (company: string, type: string, take: number, skip: number) => ({
  type: 'FETCH_TRANSACTIONS_REQUEST',
  payload: { company, type, take, skip }
});

export const fetchTransactionsSuccess = (transactions: Transaction) => ({
  type: 'FETCH_TRANSACTIONS_SUCCESS',
  payload: transactions
});

export const fetchTransactionsFailure = (error: string) => ({
  type: 'FETCH_TRANSACTIONS_FAILURE',
  payload: error
});
