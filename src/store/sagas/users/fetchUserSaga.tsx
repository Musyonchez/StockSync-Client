// sagas/fetchUserSaga.ts

import { call, put } from "redux-saga/effects";
import {
  fetchUserSuccess,
  fetchUserFailure,
} from "../../../actions/users/fetchUser";
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { GET_USER } from "../../../graphql/queries/users/fetchuserquery";
import { User } from "../../../types/user";

interface UserQueryResponse {
  user: any;
  data: {
    user: User; // Change to match the actual structure of your GraphQL response
  };
}

export const fetchUserSaga = {
  saga: function* (action: {
    type: string;
    payload: { id: string; company: string; type: string };
  }) {
    try {
      const { id, company, type } = action.payload;
      const response: ApolloQueryResult<UserQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_USER,
          variables: { id, company, type },
        }
      );


      const user = response.data?.user;

      if (user) {
        yield put(fetchUserSuccess(user));
      } else {
        yield put(fetchUserFailure("Invalid response or product not found"));
      }
    } catch (error) {
      yield put(fetchUserFailure((error as Error).message));
    }
  },
};
