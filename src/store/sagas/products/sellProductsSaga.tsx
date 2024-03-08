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
      company: string;
      type: string;
      total: number;
      filterArray: SellFilterInput[];
    };
  }) {
    try {
      const { company, type, total, filterArray } = action.payload;
      const response: ApolloQueryResult<ProductMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: SELL_PRODUCTS,
          variables: { company, type, total, filterArray },
        }
      );

      console.log("GraphQL Full Response:", response);

      const updatedProducts = response.data?.sellProduct;

      // Check if updatedProducts is an array
      if (Array.isArray(updatedProducts)) {
        console.log("boloan sell saga", updatedProducts);
        yield put(sellProductsSuccess(updatedProducts));
      } else {
        yield put(sellProductsFailure("Invalid response or sell array"));
      }
    } catch (error) {
      yield put(sellProductsFailure((error as Error).message));
    }
  },
};
