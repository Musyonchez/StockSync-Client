// sagas/restockingSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';

import { fetchRestockingsSaga } from './fetchRestockingsSaga'; // Adjust the path accordingly
import { fetchRestockingSaga } from './fetchRestockingSaga'; // Adjust the path accordingly







  

function* watchFetchRestocking() {
  yield takeEvery('FETCH_RESTOCKINGS_REQUEST', fetchRestockingsSaga.saga);
  yield takeEvery('FETCH_RESTOCKING_REQUEST', fetchRestockingSaga.saga);

  



}

function* RestockingSaga(): Generator {
  yield all([fork(watchFetchRestocking)]);
}

export default RestockingSaga;
