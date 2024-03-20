// sagas/fetchProductSaga.ts

import { call, put } from 'redux-saga/effects';
import { fetchProductsSuccess, fetchProductsFailure } from '../../../actions/products/fetchProducts';
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { GET_ALL_PRODUCTS } from '../../../graphql/queries/products/fetchproductsquery';
import { Product } from '../../../types/product';

interface ProductQueryResponse {
  products: never[];
  data: {
    activeProducts: Product[];
  };
}

export const fetchProductsSaga = {
  saga: function* (action: { type: string, payload: { company: string, type: string, take: number, skip: number } }) {
    try {
      const { company, type, take, skip } = action.payload;
      const response: ApolloQueryResult<ProductQueryResponse> = yield call(
        apolloClient.query,
        {
          query: GET_ALL_PRODUCTS,
          variables: { company, type, take, skip },
        }
      );


      const products = response.data?.products;

      if (Array.isArray(products)) {
        for (const product of products) {
          yield put(fetchProductsSuccess(product));
        }
      } else {
        yield put(fetchProductsFailure('Invalid response or products array'));
      }
    } catch (error) {
      yield put(fetchProductsFailure((error as Error).message));
    }
  },
};
