// sagas/transactionSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';

import { fetchTransactionsSaga } from './fetchTransactionsSaga'; // Adjust the path accordingly
import { fetchTransactionSaga } from './fetchTransactionSaga'; // Adjust the path accordingly







  

function* watchFetchTransaction() {
  yield takeEvery('FETCH_TRANSACTIONS_REQUEST', fetchTransactionsSaga.saga);
  yield takeEvery('FETCH_TRANSACTION_REQUEST', fetchTransactionSaga.saga);

  



}

function* TransactionSaga(): Generator {
  yield all([fork(watchFetchTransaction)]);
}

export default TransactionSaga;
