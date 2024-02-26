// sagas/editUserSaga.ts

import { call, put } from 'redux-saga/effects';
import { editUserSuccess, editUserFailure } from '../../../actions/users/editUser'; // Update the import based on your actual file structure
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { EDIT_USER } from '../../../graphql/mutations/users/editusermutation'; // Update the import based on your actual file structure
import { User } from '../../../types/user';

interface UserMutationResponse {
  editUser: User; // Change to match the actual structure of your GraphQL response
}

export const editUserSaga = {
  saga: function* (action: { type: string, payload: { 
    id: string,
    firstName?: string,
    lastName?: string,
    age?: number,
    store1?: boolean,
    store2?: boolean,
    store3?: boolean,
    store4?: boolean,
    role: string, // Make sure to adjust this based on your actual role type
    company: string,
    type: string,
  } }) {
    try {
      const { 
        id,
        firstName,
        lastName,
        age,
        store1,
        store2,
        store3,
        store4,
        role,
        company,
        type,
      } = action.payload;

      const response: ApolloQueryResult<UserMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: EDIT_USER,
          variables: {
            id,
            firstName,
            lastName,
            age,
            store1,
            store2,
            store3,
            store4,
            role,
            company,
            type,
          },
        }
      );

      console.log('GraphQL Full Response:', response);

      const user = response.data?.editUser;

      if (user) {
        yield put(editUserSuccess(user));
      } else {
        yield put(editUserFailure('Invalid response or user not edited'));
      }
    } catch (error) {
      console.error('Error in editUserSaga:', error);
      yield put(editUserFailure((error as Error).message));
    }
  },
};
