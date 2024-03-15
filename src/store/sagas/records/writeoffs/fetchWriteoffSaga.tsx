// sagas/fetchWriteoffSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchWriteoffSuccess, fetchWriteoffFailure } from '../../../../actions/records/writeoffs/fetchWriteoff';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../../graphql/apolloclient';
import { GET_WRITEOFF } from '../../../../graphql/queries/writeoffs/fetchwriteoffquery'; // Update with your actual query
import { Writeoff } from '../../../../types/writeoff';

interface WriteoffQueryResponse {
    getWriteoff: any;
    data: {
    getWriteoff: Writeoff;
  };
}

export const fetchWriteoffSaga = {
  saga: function* (action: { type: string, payload: { id: string, company: string, type: string } }) {
    try {
      const { id, company, type } = action.payload;
      const response: ApolloQueryResult<WriteoffQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_WRITEOFF,
          variables: { id, company, type },
        }
      );


      const writeoff = response.data?.getWriteoff;

      if (writeoff) {
        yield put(fetchWriteoffSuccess(writeoff));
      } else {
        yield put(fetchWriteoffFailure('Invalid response or product not found'));
      }
    } catch (error) {
      yield put(fetchWriteoffFailure((error as Error).message));
    }
  },
};
