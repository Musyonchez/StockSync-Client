// sagas/fetchTransactionSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchTransactionsSuccess, fetchTransactionsFailure } from '../../../../actions/records/transactions/fetchTransactions';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../../graphql/apolloclient';
import { GET_TRANSACTIONS } from '../../../../graphql/queries/transactions/fetchtransactionsquery'; // Update with your actual query
import { Transaction } from '../../../../types/transaction';

interface TransactionQueryResponse {
    getTransactions: never[];
    data: {
    getTransactions: Transaction[];
  };
}

export const fetchTransactionsSaga = {
  saga: function* (action: { type: string, payload: { company: string, type: string } }) {
    try {
      const { company, type } = action.payload;
      const response: ApolloQueryResult<TransactionQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_TRANSACTIONS,
          variables: { company, type },
        }
      );

      console.log('GraphQL Full Response:', response);

      const transactions = response.data?.getTransactions;

      if (Array.isArray(transactions)) {
        for (const transaction of transactions) {
          yield put(fetchTransactionsSuccess(transaction));
        }
      } else {
        yield put(fetchTransactionsFailure('Invalid response or transactions array'));
      }
    } catch (error) {
      yield put(fetchTransactionsFailure((error as Error).message));
    }
  },
};
