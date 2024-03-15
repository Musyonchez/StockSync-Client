// sagas/fetchProductSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchactiveProductsSuccess, fetchactiveProductsFailure } from '../../../actions/products/fetchactiveProducts';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { GET_ALL_ACTIVE_PRODUCTS } from '../../../graphql/queries/products/fetchactiveproductsquery';
import { Product } from '../../../types/product';

interface ProductQueryResponse {
  activeProducts: never[];
  data: {
    activeProducts: Product[];
  };
}

export const fetchactiveProductsSaga = {
  saga: function* (action: { type: string, payload: { company: string, type: string } }) {
    try {
      const { company, type } = action.payload;
      const response: ApolloQueryResult<ProductQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_ALL_ACTIVE_PRODUCTS,
          variables: { company, type },
        }
      );


      const products = response.data?.activeProducts || [];

      if (Array.isArray(products)) {
        for (const product of products) {
          yield put(fetchactiveProductsSuccess(product));
        }
      } else {
        yield put(fetchactiveProductsFailure('Invalid response or products array'));
      }
    } catch (error) {
      yield put(fetchactiveProductsFailure((error as Error).message));
    }
  },
};
