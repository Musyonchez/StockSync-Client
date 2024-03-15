// sagas/editProductSaga.ts

import { call, put } from "redux-saga/effects";
import {
  editProductSuccess,
  editProductFailure,
} from "../../../actions/products/editProduct";
import { ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../../../graphql/apolloclient";
import { EDIT_PRODUCT } from "../../../graphql/mutations/products/editproductmutation";
import { Product } from "../../../types/product";

interface ProductMutationResponse {
  editProduct: Product; // Change to match the actual structure of your GraphQL response
}

interface EditFilterInput {
  field: string;
  value: string;
}

export const editProductSaga = {
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


      const response: ApolloQueryResult<ProductMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: EDIT_PRODUCT,
          variables: { id, company, type, filterArray },
        }
      );


      const product = response.data?.editProduct;

      if (product) {
        yield put(editProductSuccess(product));
      } else {
        yield put(editProductFailure("Invalid response or product not edited"));
      }
    } catch (error) {
      yield put(editProductFailure((error as Error).message));
    }
  },
};
