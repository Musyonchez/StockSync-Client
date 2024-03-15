// sagas/sendPasswordRecoveryEmailUserSaga.ts

import { call, put } from "redux-saga/effects";
import {
  sendPasswordRecoveryEmailUserSuccess,
  sendPasswordRecoveryEmailUserFailure,
} from "../../../actions/users/sendPasswordRecoveryEmailUser"; // Update the import based on your actual file structure
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { SENDPASSWORDRECOVERYEMAIL_USER } from "../../../graphql/mutations/users/sendpasswordrecoveryemailusermutation"; // Update the import based on your actual file structure
import { User } from "../../../types/user";

interface UserMutationResponse {
  sendPasswordRecoveryEmailUser: User; // Change to match the actual structure of your GraphQL response
}

export const sendPasswordRecoveryEmailUserSaga = {
  saga: function* (action: {
    type: string;
    payload: {
      email: string;
      company?: string;
    };
  }) {
    try {
      const { email, company } = action.payload;

    

      const response: ApolloQueryResult<UserMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: SENDPASSWORDRECOVERYEMAIL_USER,
          variables: {
            email,
            company
          },
        }
      );


      const user = response.data?.sendPasswordRecoveryEmailUser;

      if (user) {
        yield put(sendPasswordRecoveryEmailUserSuccess(user));
      } else {
        yield put(
          sendPasswordRecoveryEmailUserFailure(
            "Invalid response or user not deactivated"
          )
        );
      }
    } catch (error) {
      yield put(sendPasswordRecoveryEmailUserFailure((error as Error).message));
    }
  },
};
