// sagas/writeoffSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';

import { fetchWriteoffsSaga } from './fetchWriteoffsSaga'; // Adjust the path accordingly
import { fetchWriteoffSaga } from './fetchWriteoffSaga'; // Adjust the path accordingly







  

function* watchFetchWriteoff() {
  yield takeEvery('FETCH_WRITEOFFS_REQUEST', fetchWriteoffsSaga.saga);
  yield takeEvery('FETCH_WRITEOFF_REQUEST', fetchWriteoffSaga.saga);

  



}

function* WriteoffSaga(): Generator {
  yield all([fork(watchFetchWriteoff)]);
}

export default WriteoffSaga;
