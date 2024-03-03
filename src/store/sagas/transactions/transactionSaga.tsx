// sagas/transactionSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';
// import { fetchProductSaga } from './fetchProductSaga'; // Adjust the path accordingly
// import { fetchactiveProductsSaga } from './fetchactiveProductsSaga'; // Adjust the path accordingly
import { fetchTransactionsSaga } from './fetchTransactionsSaga'; // Adjust the path accordingly







  

function* watchFetchTransaction() {
//   yield takeEvery('FETCH_ACTIVE_PRODUCTS_REQUEST', fetchactiveProductsSaga.saga);
  yield takeEvery('FETCH_TRANSACTIONS_REQUEST', fetchTransactionsSaga.saga);
//   yield takeEvery('FETCH_PRODUCT_REQUEST', fetchProductSaga.saga);
  



}

function* TransactionSaga(): Generator {
  yield all([fork(watchFetchTransaction)]);
}

export default TransactionSaga;
