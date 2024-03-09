// sagas/fetchWriteoffSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchWriteoffsSuccess, fetchWriteoffsFailure } from '../../../../actions/records/writeoffs/fetchWriteoffs';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../../graphql/apolloclient';
import { GET_WRITEOFFS } from '../../../../graphql/queries/writeoffs/fetchwriteoffsquery'; // Update with your actual query
import { Writeoff } from '../../../../types/writeoff';

interface WriteoffQueryResponse {
    getWriteoffs: never[];
    data: {
    getWriteoffs: Writeoff[];
  };
}

export const fetchWriteoffsSaga = {
  saga: function* (action: { type: string, payload: { company: string, type: string } }) {
    try {
      const { company, type } = action.payload;


      console.log("wriiteoff saga", company, type)


      const response: ApolloQueryResult<WriteoffQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_WRITEOFFS,
          variables: { company, type },
        }
      );

      console.log('GraphQL Full Response:', response);

      const writeoffs = response.data?.getWriteoffs;

      if (Array.isArray(writeoffs)) {
        for (const writeoff of writeoffs) {
          yield put(fetchWriteoffsSuccess(writeoff));
        }
      } else {
        yield put(fetchWriteoffsFailure('Invalid response or writeoffs array'));
      }
    } catch (error) {
      yield put(fetchWriteoffsFailure((error as Error).message));
    }
  },
};
