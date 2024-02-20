// sagas/editProductSaga.ts

import { call, put } from 'redux-saga/effects';
import { editProductSuccess, editProductFailure } from '../../../actions/products/editProduct';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { EDIT_PRODUCT } from '../../../graphql/mutations/products/editproductmutation';
import { Product } from '../../../types/product';

interface ProductMutationResponse {
  editProduct: Product; // Change to match the actual structure of your GraphQL response
}

export const editProductSaga = {
  saga: function* (action: { type: string, payload: { 
    id: string;
    name?: string;
    description?: string;
    minimumQuantity?: number;
    currentQuantity?: number;
    reorderQuantity?: number;
    costCurrent?: number;
    costPrevious?: number;
    company?: string;
    type?: string;
  } }) {
    try {
      const { id, name, description, minimumQuantity, currentQuantity, reorderQuantity, costCurrent, costPrevious, company, type } = action.payload;

      const response: ApolloQueryResult<ProductMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: EDIT_PRODUCT,
          variables: { 
            id,
            name,
            description,
            minimumQuantity,
            currentQuantity,
            reorderQuantity,
            costCurrent,
            costPrevious,
            company,
            type,
          },
        }
      );

      console.log('GraphQL Full Response:', response);

      const product = response.data?.editProduct;

      if (product) {
        yield put(editProductSuccess(product));
      } else {
        yield put(editProductFailure('Invalid response or product not edited'));
      }
    } catch (error) {
      console.error('Error in editProductSaga:', error);
      yield put(editProductFailure((error as Error).message));
    }
  },
};
