// sagas/deactivateUserSaga.ts

import { call, put } from 'redux-saga/effects';
import { deactivateUserSuccess, deactivateUserFailure } from '../../../actions/users/deactivateUser'; // Update the import based on your actual file structure
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { DEACTIVATE_USER } from '../../../graphql/mutations/users/deactivateusermutation'; // Update the import based on your actual file structure
import { User } from '../../../types/user';

interface UserMutationResponse {
  deactivateUser: User; // Change to match the actual structure of your GraphQL response
}

export const deactivateUserSaga = {
  saga: function* (action: { type: string, payload: { 
    id: string;
    company?: string;
    type?: string;
  } }) {
    try {

      
      const { id, company, type } = action.payload;
      

      const response: ApolloQueryResult<UserMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: DEACTIVATE_USER,
          variables: { 
            id,
            company,
            type,
          },
        }
      );


      const user = response.data?.deactivateUser;

      if (user) {
        yield put(deactivateUserSuccess(user));
      } else {
        yield put(deactivateUserFailure('Invalid response or user not deactivated'));
      }
    } catch (error) {
      yield put(deactivateUserFailure((error as Error).message));
    }
  },
};
