// sagas/fetchProductSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchProductSuccess, fetchProductFailure } from '../../../actions/products/fetchProduct';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { GET_PRODUCT } from '../../../graphql/queries/products/fetchproductquery';
import { Product } from '../../../types/product';

interface ProductQueryResponse {
  product: any;
  data: {
    product: Product; // Change to match the actual structure of your GraphQL response
  };
}

export const fetchProductSaga = {
  saga: function* (action: { type: string, payload: { id: string, company: string, type: string } }) {
    try {
      const { id, company, type } = action.payload;
      const response: ApolloQueryResult<ProductQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_PRODUCT,
          variables: { id, company, type },
        }
      );


      const product = response.data?.product;

      if (product) {
        yield put(fetchProductSuccess(product));
      } else {
        yield put(fetchProductFailure('Invalid response or product not found'));
      }
    } catch (error) {
      yield put(fetchProductFailure((error as Error).message));
    }
  },
};

