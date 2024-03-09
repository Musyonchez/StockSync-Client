import { call, put } from "redux-saga/effects";
import {
  writeoffProductsSuccess,
  writeoffProductsFailure,
} from "../../../actions/products/writeoffProducts"; // Update the import to the correct writeoff actions
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { WRITEOFF_PRODUCTS } from "../../../graphql/mutations/products/writeoffproductsmutation"; // Update the import to the correct writeoff mutation
import { Product } from "../../../types/product";

interface ProductMutationResponse {
  writeoffProduct: boolean;
}

interface WriteoffFilterInput {
  productId: string;
  toSubtract: number;
  quantity: number;
}

export const writeoffProductsSaga = {
  saga: function* (action: {
    type: string;
    payload: {
      id: string;
      name: string;
      company: string;
      type: string;
      total: number;
      reason: string;
      filterArray: WriteoffFilterInput[];
    };
  }) {
    try {
      const { id, name, company, type, total, reason, filterArray } = action.payload;

      console.log("wriiteoff saga", id, name, company, type, total, reason, filterArray)
      const response: ApolloQueryResult<ProductMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: WRITEOFF_PRODUCTS,
          variables: { id, name, company, type, total, reason, filterArray },
        }
      );

      console.log("GraphQL Full Response:", response);

      const writeoffProductResponse = response.data?.writeoffProduct;

      if (typeof writeoffProductResponse === "boolean") {
        if (writeoffProductResponse) {
          yield put(writeoffProductsSuccess(writeoffProductResponse));
        } else {
          yield put(writeoffProductsFailure("Writeoff failed")); // You can customize the failure message
        }
      } else {
        yield put(writeoffProductsFailure("Invalid response from writeoff mutation"));
      }
    } catch (error) {
      yield put(writeoffProductsFailure((error as Error).message));
    }
  },
};
