// sagas/fetchUserSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchuserSuccess, fetchuserFailure } from '../../../actions/userActions';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { GET_USER } from '../../../graphql/queries/users/fetchuserquery';
import { User } from '../../../types/user';

interface UserQueryResponse {
  user: any;
  data: {
    user: User; // Change to match the actual structure of your GraphQL response
  };
}

export const fetchUserSaga = {
  saga: function* (action: { type: string, payload: { id: string, company: string, type: string } }) {
    try {
      const { id, company, type } = action.payload;
      const response: ApolloQueryResult<UserQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_USER,
          variables: { id, company, type },
        }
      );

      console.log('GraphQL Full Response:', response);

      const user = response.data?.user;

      if (user) {
        yield put(fetchuserSuccess(user));
      } else {
        yield put(fetchuserFailure('Invalid response or product not found'));
      }
    } catch (error) {
      console.error('Error in fetchProductSaga:', error);
      yield put(fetchuserFailure((error as Error).message));
    }
  },
};

