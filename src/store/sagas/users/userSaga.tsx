// sagas/userSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';
import { fetchUserSaga } from './fetchUserSaga'; // Adjust the path accordingly
import { fetchUsersSaga } from './fetchUsersSaga'; // Adjust the path accordingly
import { deleteUserSaga } from './deleteUserSaga'; // Adjust the path accordingly





  

function* watchFetchUser() {
  yield takeEvery('FETCH_USERS_REQUEST', fetchUsersSaga.saga);
  yield takeEvery('FETCH_USER_REQUEST', fetchUserSaga.saga);
  yield takeEvery('DELETE_USER_REQUEST', deleteUserSaga.saga);




}

function* userSaga(): Generator {
  yield all([fork(watchFetchUser)]);
}

export default userSaga;
