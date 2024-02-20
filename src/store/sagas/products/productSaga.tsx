// sagas/productSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';
import { fetchProductSaga } from './fetchProductSaga'; // Adjust the path accordingly
import { fetchactiveProductsSaga } from './fetchactiveProductsSaga'; // Adjust the path accordingly
import { fetchProductsSaga } from './fetchProductsSaga'; // Adjust the path accordingly

import { addProductSaga } from './addProductSaga'; // Adjust the path accordingly
import { editProductSaga } from './editProductSaga'; // Adjust the path accordingly
import { deleteProductSaga } from './deleteProductSaga'; // Adjust the path accordingly
import { deactivateProductSaga } from './deactivateProductSaga'; // Adjust the path accordingly










  

function* watchFetchProduct() {
  yield takeEvery('FETCH_ACTIVE_PRODUCTS_REQUEST', fetchactiveProductsSaga.saga);
  yield takeEvery('FETCH_PRODUCTS_REQUEST', fetchProductsSaga.saga);
  yield takeEvery('FETCH_PRODUCT_REQUEST', fetchProductSaga.saga);

  yield takeEvery('ADD_PRODUCT_REQUEST', addProductSaga.saga);
  yield takeEvery('EDIT_PRODUCT_REQUEST', editProductSaga.saga);
  yield takeEvery('DELETE_PRODUCT_REQUEST', deleteProductSaga.saga);
  yield takeEvery('DEACTIVATE_PRODUCT_REQUEST', deactivateProductSaga.saga);




}

function* productSaga(): Generator {
  yield all([fork(watchFetchProduct)]);
}

export default productSaga;
