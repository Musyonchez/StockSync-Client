// sagas/fetchProductSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchProductSuccess, fetchProductFailure } from '../../../actions/productActions';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { GET_ALL_PRODUCTS } from '../../../graphql/querys';
import { Product } from '../../../types/product';

interface ProductQueryResponse {
  activeProducts: never[];
  data: {
    activeProducts: Product[];
  };
}

export const fetchProductSaga = {
  saga: function* (action: { type: string, payload: { company: string, type: string } }) {
    try {
      const { company, type } = action.payload;
      const response: ApolloQueryResult<ProductQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_ALL_PRODUCTS,
          variables: { company, type },
        }
      );

      console.log('GraphQL Full Response:', response);

      const products = response.data?.activeProducts || [];

      if (Array.isArray(products)) {
        for (const product of products) {
          yield put(fetchProductSuccess(product));
        }
      } else {
        yield put(fetchProductFailure('Invalid response or products array'));
      }
    } catch (error) {
      yield put(fetchProductFailure((error as Error).message));
    }
  },
};
