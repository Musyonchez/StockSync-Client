import { call, put } from 'redux-saga/effects';
import { searchProductsSuccess, searchProductsFailure } from '../../../actions/products/searchProducts'; // Update the import to the correct search actions
import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../../graphql/apolloclient';
import { SEARCH_PRODUCTS } from '../../../graphql/queries/products/searchproductsquery'; // Update the import to the correct search query
import { Product } from '../../../types/product';

interface ProductQueryResponse {
  searchProducts: Product[];
}

export const searchProductsSaga = {
  saga: function* (action: { type: string, payload: { company: string, type: string, filterArray: { field: string; value: string }[] } }) {
    try {
      const { company, type, filterArray } = action.payload;

      const response: ApolloQueryResult<ProductQueryResponse> = yield call(
        apolloClient.query,
        {
          query: SEARCH_PRODUCTS,
          variables: { company, type, filterArray },
        }
      );


      const products = response.data?.searchProducts;


      if (Array.isArray(products) && products.length > 0) {
        for (const product of products) {
          yield put(searchProductsSuccess(product));
        }
      } else {
        yield put(searchProductsFailure('No products found'));
      }
    } catch (error) {
      yield put(searchProductsFailure((error as Error).message));
    }
  },
};
