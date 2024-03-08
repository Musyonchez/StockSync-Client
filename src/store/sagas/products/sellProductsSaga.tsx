import { call, put } from "redux-saga/effects";
import {
  sellProductsSuccess,
  sellProductsFailure,
} from "../../../actions/products/sellProducts"; // Update the import to the correct sell actions
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { SELL_PRODUCTS } from "../../../graphql/mutations/products/sellproductsmutation"; // Update the import to the correct sell mutation
import { Product } from "../../../types/product";

interface ProductMutationResponse {
  sellProduct: boolean;
}

interface SellFilterInput {
  productId: string;
  toSubtract: number;
  quantity: number;
}

export const sellProductsSaga = {
  saga: function* (action: {
    type: string;
    payload: {
      id: string;
      name: string;
      company: string;
      type: string;
      total: number;
      filterArray: SellFilterInput[];
    };
  }) {
    try {
      const { id, name, company, type, total, filterArray } = action.payload;
      const response: ApolloQueryResult<ProductMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: SELL_PRODUCTS,
          variables: { id, name, company, type, total, filterArray },
        }
      );

      console.log("GraphQL Full Response:", response);

      const sellProductResponse = response.data?.sellProduct;

      if (typeof sellProductResponse === "boolean") {
        if (sellProductResponse) {
          yield put(sellProductsSuccess(sellProductResponse));
        } else {
          yield put(sellProductsFailure("Sell failed")); // You can customize the failure message
        }
      } else {
        yield put(sellProductsFailure("Invalid response from sell mutation"));
      }
    } catch (error) {
      yield put(sellProductsFailure((error as Error).message));
    }
  },
};
