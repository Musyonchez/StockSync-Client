// sagas/productSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';
import { fetchProductSaga } from './fetchProductSaga'; // Adjust the path accordingly
import { fetchProductsSaga } from './fetchProductsSaga'; // Adjust the path accordingly





  

function* watchFetchProduct() {
  yield takeEvery('FETCH_PRODUCTS_REQUEST', fetchProductsSaga.saga);
  yield takeEvery('FETCH_PRODUCT_REQUEST', fetchProductSaga.saga);

}

function* productSaga(): Generator {
  yield all([fork(watchFetchProduct)]);
}

export default productSaga;
