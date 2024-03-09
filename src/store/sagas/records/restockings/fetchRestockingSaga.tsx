// sagas/fetchRestockingSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchRestockingSuccess, fetchRestockingFailure } from '../../../../actions/records/restockings/fetchRestocking';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../../graphql/apolloclient';
import { GET_RESTOCKING } from '../../../../graphql/queries/restockings/fetchrestockingquery'; // Update with your actual query
import { Restocking } from '../../../../types/restocking';

interface RestockingQueryResponse {
    getRestocking: any;
    data: {
    getRestocking: Restocking;
  };
}

export const fetchRestockingSaga = {
  saga: function* (action: { type: string, payload: { id: string, company: string, type: string } }) {
    try {
      const { id, company, type } = action.payload;
      const response: ApolloQueryResult<RestockingQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_RESTOCKING,
          variables: { id, company, type },
        }
      );

      console.log('GraphQL Full Response:', response);

      const restocking = response.data?.getRestocking;

      if (restocking) {
        yield put(fetchRestockingSuccess(restocking));
      } else {
        yield put(fetchRestockingFailure('Invalid response or product not found'));
      }
    } catch (error) {
      yield put(fetchRestockingFailure((error as Error).message));
    }
  },
};
