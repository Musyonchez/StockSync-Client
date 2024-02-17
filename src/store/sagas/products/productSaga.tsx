// sagas/productSaga.tsx

// productSaga.ts
import { all, fork, takeEvery } from 'redux-saga/effects';
import { fetchProductSaga } from './fetchProductSaga'; // Adjust the path accordingly




  

function* watchFetchProduct() {
  yield takeEvery('FETCH_PRODUCT_REQUEST', fetchProductSaga.saga);
}

function* productSaga(): Generator {
  yield all([fork(watchFetchProduct)]);
}

export default productSaga;
