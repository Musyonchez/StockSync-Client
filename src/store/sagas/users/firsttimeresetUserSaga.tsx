// sagas/firstTimeResetUserSaga.ts

import { call, put } from "redux-saga/effects";
import {
  firstTimeResetUserSuccess,
  firstTimeResetUserFailure,
} from "../../../actions/users/firstTimeResetUser"; // Update the import based on your actual file structure
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { FIRSTTIMERESET_USER } from "../../../graphql/mutations/users/firsttimeresetusermutation"; // Update the import based on your actual file structure
import { User } from "../../../types/user";

interface UserMutationResponse {
  firstTimeResetUser: User; // Change to match the actual structure of your GraphQL response
}

export const firstTimeResetUserSaga = {
  saga: function* (action: {
    type: string;
    payload: {
      id: string;
      password: string;
      company?: string;
      type?: string;
    };
  }) {
    try {
      const { id, password, company, type } = action.payload;

      console.log(
        "firsttimeresetuser user Sag starting:",
        id,
        password,
        company,
        type
      );

      const response: ApolloQueryResult<UserMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: FIRSTTIMERESET_USER,
          variables: {
            id,
            password,
            company,
            type,
          },
        }
      );

      console.log("GraphQL Full Response:", response);

      const user = response.data?.firstTimeResetUser;

      if (user) {
        yield put(firstTimeResetUserSuccess(user));
      } else {
        yield put(
          firstTimeResetUserFailure("Invalid response or user not deactivated")
        );
      }
    } catch (error) {
      console.error("Error in firstTimeResetUserSaga:", error);
      yield put(firstTimeResetUserFailure((error as Error).message));
    }
  },
};
