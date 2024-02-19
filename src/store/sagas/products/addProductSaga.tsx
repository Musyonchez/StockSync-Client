// sagas/fetchProductSaga.ts

import { call, put } from 'redux-saga/effects';
import { addProductSuccess, addProductFailure } from '../../../actions/products/addProduct';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { ADD_PRODUCT } from '../../../graphql/mutations/products/addproductmutation';
import { Product } from '../../../types/product';

interface ProductMutationResponse {
  addProduct: Product; // Change to match the actual structure of your GraphQL response
}

export const addProductSaga = {
  saga: function* (action: { type: string, payload: { 
    name: string;
    description: string;
    minimumQuantity: number;
    currentQuantity: number;
    reorderQuantity: number;
    costCurrent: number;
    costPrevious: number;
    company: string;
    type: string;
  } }) {
    try {
      const { name, description, minimumQuantity, currentQuantity, reorderQuantity, costCurrent, costPrevious, company, type } = action.payload;

      const response: ApolloQueryResult<ProductMutationResponse> = yield call(
        apolloClient.mutate,
        {
          mutation: ADD_PRODUCT,
          variables: { 
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

      const product = response.data?.addProduct;

      if (product) {
        yield put(addProductSuccess(product));
      } else {
        yield put(addProductFailure('Invalid response or product not added'));
      }
    } catch (error) {
      console.error('Error in fetchProductSaga:', error);
      yield put(addProductFailure((error as Error).message));
    }
  },
};
