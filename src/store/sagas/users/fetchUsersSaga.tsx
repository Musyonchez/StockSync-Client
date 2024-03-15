// sagas/fetchUsersSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchUsersSuccess, fetchUsersFailure } from '../../../actions/users/fetchUsers';
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


      const users = response.data?.users || [];

      if (Array.isArray(users)) {
        for (const product of users) {
          yield put(fetchUsersSuccess(product));
        }
      } else {
        yield put(fetchUsersFailure('Invalid response or products array'));
      }
    } catch (error) {
      yield put(fetchUsersFailure((error as Error).message));
    }
  },
};
