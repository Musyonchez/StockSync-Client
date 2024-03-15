// sagas/deactivateProductSaga.ts

import { call, put } from 'redux-saga/effects';
import { deactivateProductSuccess, deactivateProductFailure } from '../../../actions/products/deactivateProduct'; // Update the import based on your actual file structure
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { DEACTIVATE_PRODUCT } from '../../../graphql/mutations/products/deactivateproductmutation'; // Update the import based on your actual file structure
import { Product } from '../../../types/product';

interface ProductMutationResponse {
  deactivateProduct: Product; // Change to match the actual structure of your GraphQL response
}

export const deactivateProductSaga = {
  saga: function* (action: { type: string, payload: { 
    id: string;
    company?: string;
    type?: string;
  } }) {
    try {
      const { id, company, type } = action.payload;

      const response: ApolloQueryResult<ProductMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: DEACTIVATE_PRODUCT,
          variables: { 
            id,
            company,
            type,
          },
        }
      );


      const product = response.data?.deactivateProduct;

      if (product) {
        yield put(deactivateProductSuccess(product));
      } else {
        yield put(deactivateProductFailure('Invalid response or product not deactivated'));
      }
    } catch (error) {
      yield put(deactivateProductFailure((error as Error).message));
    }
  },
};
