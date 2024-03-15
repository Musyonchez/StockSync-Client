// sagas/editUserSaga.ts

import { call, put } from "redux-saga/effects";
import {
  editUserSuccess,
  editUserFailure,
} from "../../../actions/users/editUser"; // Update the import based on your actual file structure
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { EDIT_USER } from "../../../graphql/mutations/users/editusermutation"; // Update the import based on your actual file structure
import { User } from "../../../types/user";

interface UserMutationResponse {
  editUser: User; // Change to match the actual structure of your GraphQL response
}

interface EditFilterInput {
  field: string;
  value: string;
}

export const editUserSaga = {
  saga: function* (action: {
    type: string;
    payload: {
      id: string;
      company: string;
      type: string;
      filterArray: EditFilterInput[];
    };
  }) {
    try {
      const { id, company, type, filterArray } = action.payload;


      const response: ApolloQueryResult<UserMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: EDIT_USER,
          variables: { id, company, type, filterArray },
        }
      );


      const user = response.data?.editUser;

      if (user) {
        yield put(editUserSuccess(user));
      } else {
        yield put(editUserFailure("Invalid response or user not edited"));
      }
    } catch (error) {
      yield put(editUserFailure((error as Error).message));
    }
  },
};
