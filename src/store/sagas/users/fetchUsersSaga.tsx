// sagas/fetchUsersSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchusersSuccess, fetchusersFailure } from '../../../actions/userActions';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { GET_ALL_USERS } from '../../../graphql/queries/users/fetchusersquery';
import { Users } from '../../../types/user';

interface UserQueryResponse {
  users: never[];
  data: {
    users: Users[];
  };
}

export const fetchUsersSaga = {
  saga: function* (action: { type: string, payload: { company: string, type: string } }) {
    try {
      const { company, type } = action.payload;
      const response: ApolloQueryResult<UserQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_ALL_USERS,
          variables: { company, type },
        }
      );

      console.log('GraphQL Full Response:', response);

      const users = response.data?.users || [];

      if (Array.isArray(users)) {
        for (const product of users) {
          yield put(fetchusersSuccess(product));
        }
      } else {
        yield put(fetchusersFailure('Invalid response or products array'));
      }
    } catch (error) {
      yield put(fetchusersFailure((error as Error).message));
    }
  },
};
