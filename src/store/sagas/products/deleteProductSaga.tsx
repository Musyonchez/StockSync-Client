// sagas/deleteProductSaga.ts

import { call, put } from 'redux-saga/effects';
import { deleteProductSuccess, deleteProductFailure } from '../../../actions/products/deleteProduct'; // Update the import based on your actual file structure
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { DELETE_PRODUCT } from '../../../graphql/mutations/products/deleteproductmutation'; // Update the import based on your actual file structure
import { Product } from '../../../types/product';

interface ProductMutationResponse {
  deleteProduct: Product; // Change to match the actual structure of your GraphQL response
}

export const deleteProductSaga = {
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
          mutation: DELETE_PRODUCT,
          variables: { 
            id,
            company,
            type,
          },
        }
      );

      console.log('GraphQL Full Response:', response);

      const product = response.data?.deleteProduct;

      if (product) {
        yield put(deleteProductSuccess(product));
      } else {
        yield put(deleteProductFailure('Invalid response or product not deleted'));
      }
    } catch (error) {
      console.error('Error in deleteProductSaga:', error);
      yield put(deleteProductFailure((error as Error).message));
    }
  },
};
