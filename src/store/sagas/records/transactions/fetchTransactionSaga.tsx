// sagas/fetchTransactionSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchTransactionSuccess, fetchTransactionFailure } from '../../../../actions/records/transactions/fetchTransaction';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../../graphql/apolloclient';
import { GET_TRANSACTION } from '../../../../graphql/queries/transactions/fetchtransactionquery'; // Update with your actual query
import { Transaction } from '../../../../types/transaction';

interface TransactionQueryResponse {
    getTransaction: any;
    data: {
    getTransaction: Transaction;
  };
}

export const fetchTransactionSaga = {
  saga: function* (action: { type: string, payload: { id: string, company: string, type: string } }) {
    try {
      const { id, company, type } = action.payload;
      const response: ApolloQueryResult<TransactionQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_TRANSACTION,
          variables: { id, company, type },
        }
      );

      console.log('GraphQL Full Response:', response);

      const transaction = response.data?.getTransaction;

      if (transaction) {
        yield put(fetchTransactionSuccess(transaction));
      } else {
        yield put(fetchTransactionFailure('Invalid response or product not found'));
      }
    } catch (error) {
      yield put(fetchTransactionFailure((error as Error).message));
    }
  },
};
