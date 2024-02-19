// sagas/userSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';
import { fetchUserSaga } from './fetchUserSaga'; // Adjust the path accordingly
import { fetchUsersSaga } from './fetchUsersSaga'; // Adjust the path accordingly





  

function* watchFetchUser() {
  yield takeEvery('FETCH_USERS_REQUEST', fetchUsersSaga.saga);
  yield takeEvery('FETCH_USER_REQUEST', fetchUserSaga.saga);

}

function* userSaga(): Generator {
  yield all([fork(watchFetchUser)]);
}

export default userSaga;
