// sagas/fetchRestockingSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchRestockingsSuccess, fetchRestockingsFailure } from '../../../../actions/records/restockings/fetchRestockings';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../../graphql/apolloclient';
import { GET_RESTOCKINGS } from '../../../../graphql/queries/restockings/fetchrestockingsquery'; // Update with your actual query
import { Restocking } from '../../../../types/restocking';

interface RestockingQueryResponse {
    getRestockings: never[];
    data: {
    getRestockings: Restocking[];
  };
}

export const fetchRestockingsSaga = {
  saga: function* (action: { type: string, payload: { company: string, type: string } }) {
    try {
      const { company, type } = action.payload;

      console.log('fetch restocking Saga starting:', company);



      const response: ApolloQueryResult<RestockingQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_RESTOCKINGS,
          variables: { company, type },
        }
      );

      console.log('GraphQL Full Response:', response);

      const restockings = response.data?.getRestockings;

      if (Array.isArray(restockings)) {
        for (const restocking of restockings) {
          yield put(fetchRestockingsSuccess(restocking));
        }
      } else {
        yield put(fetchRestockingsFailure('Invalid response or restockings array'));
      }
    } catch (error) {
      yield put(fetchRestockingsFailure((error as Error).message));
    }
  },
};
