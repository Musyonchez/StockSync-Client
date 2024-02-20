// sagas/deleteUserSaga.ts

import { call, put } from 'redux-saga/effects';
import { deleteUserSuccess, deleteUserFailure } from '../../../actions/users/deleteUser'; // Update the import based on your actual file structure
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { DELETE_USER } from '../../../graphql/mutations/users/deleteusermutation'; // Update the import based on your actual file structure
import { User } from '../../../types/user';

interface UserMutationResponse {
  deleteUser: User; // Change to match the actual structure of your GraphQL response
}

export const deleteUserSaga = {
  saga: function* (action: { type: string, payload: { id: string, company?: string, type?: string } }) {
    try {
      const { id, company, type } = action.payload;

      const response: ApolloQueryResult<UserMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: DELETE_USER,
          variables: { 
            id,
            company,
            type,
          },
        }
      );

      console.log('GraphQL Full Response:', response);

      const user = response.data?.deleteUser;

      if (user) {
        yield put(deleteUserSuccess(user));
      } else {
        yield put(deleteUserFailure('Invalid response or user not deleted'));
      }
    } catch (error) {
      console.error('Error in deleteUserSaga:', error);
      yield put(deleteUserFailure((error as Error).message));
    }
  },
};
