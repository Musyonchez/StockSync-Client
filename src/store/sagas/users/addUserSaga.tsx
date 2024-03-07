// sagas/addUserSaga.ts

import { call, put } from 'redux-saga/effects';
import { addUserSuccess, addUserFailure } from '../../../actions/users/addUser'; // Update the import based on your actual file structure
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { ADD_USER } from '../../../graphql/mutations/users/addusermutation'; // Update the import based on your actual file structure
import { User } from '../../../types/user';

interface UserMutationResponse {
  addUser: User; // Change to match the actual structure of your GraphQL response
}

export const addUserSaga = {
  saga: function* (action: { type: string, payload: { 
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    store1: boolean,
    store2: boolean,
    store3: boolean,
    store4: boolean,
    role: string, // Make sure to adjust this based on your actual role type
    company: string,
    type: string,
  } }) {
    try {
      const { 
        firstName,
        lastName,
        email,
        password,
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
          mutation: ADD_USER,
          variables: {
            firstName,
            lastName,
            email,
            password,
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

      const user = response.data?.addUser;

      if (user) {
        yield put(addUserSuccess(user));
      } else {
        yield put(addUserFailure('Invalid response or user not added'));
      }
    } catch (error) {
      console.error('Error in addUserSaga:', error);
      yield put(addUserFailure((error as Error).message));
    }
  },
};
