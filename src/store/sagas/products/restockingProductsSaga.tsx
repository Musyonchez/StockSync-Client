import { call, put } from "redux-saga/effects";
import {
  restockingProductsSuccess,
  restockingProductsFailure,
} from "../../../actions/products/restockingProducts"; // Update the import to the correct restocking actions
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { RESTOCKING_PRODUCTS } from "../../../graphql/mutations/products/restockingproductsmutation"; // Update the import to the correct restocking mutation
import { Product } from "../../../types/product";

interface ProductMutationResponse {
  restockingProduct: boolean;
}

interface RestockingFilterInput {
  productId: string;
  toAdd: number;
  quantity: number;
}

export const restockingProductsSaga = {
  saga: function* (action: {
    type: string;
    payload: {
      id: string;
      name: string;
      company: string;
      type: string;
      filterArray: RestockingFilterInput[];
    };
  }) {
    try {
      const { id, name, company, type, filterArray } = action.payload;
      const response: ApolloQueryResult<ProductMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: RESTOCKING_PRODUCTS,
          variables: { id, name, company, type, filterArray },
        }
      );


      const restockingProductResponse = response.data?.restockingProduct;

      if (typeof restockingProductResponse === "boolean") {
        if (restockingProductResponse) {
          yield put(restockingProductsSuccess(restockingProductResponse));
        } else {
          yield put(restockingProductsFailure("Restocking failed")); // You can customize the failure message
        }
      } else {
        yield put(restockingProductsFailure("Invalid response from restocking mutation"));
      }
    } catch (error) {
      yield put(restockingProductsFailure((error as Error).message));
    }
  },
};
