// sagas/updateNewPasswordRecoveryUserSaga.ts

import { call, put } from "redux-saga/effects";
import {
  updateNewPasswordRecoveryUserSuccess,
  updateNewPasswordRecoveryUserFailure,
} from "../../../actions/users/updateNewPasswordRecoveryUser"; // Update the import based on your actual file structure
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { UPDATENEWPASSWORDRECOVERY_USER } from "../../../graphql/mutations/users/updatenewpasswordrecoveryusermutation"; // Update the import based on your actual file structure
import { User } from "../../../types/user";

interface UserMutationResponse {
  updateNewPasswordRecoveryUser: User; // Change to match the actual structure of your GraphQL response
}

export const updateNewPasswordRecoveryUserSaga = {
  saga: function* (action: {
    type: string;
    payload: {
      email: string;
      temporaryAccessKey: string;
      password: string;
      company?: string;
    };
  }) {
    try {
      const { email, temporaryAccessKey, password, company } = action.payload;

      const response: ApolloQueryResult<UserMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: UPDATENEWPASSWORDRECOVERY_USER,
          variables: {
            email,
            temporaryAccessKey,
            password,
            company,
          },
        }
      );

      const user = response.data?.updateNewPasswordRecoveryUser;

      if (user) {
        yield put(updateNewPasswordRecoveryUserSuccess(user));
      } else {
        yield put(
          updateNewPasswordRecoveryUserFailure(
            "Invalid response or user not deactivated"
          )
        );
      }
    } catch (error) {
      yield put(updateNewPasswordRecoveryUserFailure((error as Error).message));
    }
  },
};
