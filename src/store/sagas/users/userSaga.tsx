// sagas/userSaga.tsx

import { all, fork, takeEvery } from 'redux-saga/effects';
import { fetchUserSaga } from './fetchUserSaga'; // Adjust the path accordingly
import { fetchUsersSaga } from './fetchUsersSaga'; // Adjust the path accordingly
import { deleteUserSaga } from './deleteUserSaga'; // Adjust the path accordingly
import { deactivateUserSaga } from './deactivateUserSaga'; // Adjust the path accordingly
import { addUserSaga } from './addUserSaga'; // Adjust the path accordingly
import { editUserSaga } from './editUserSaga'; // Adjust the path accordingly
import { firstTimeResetUserSaga } from './firsttimeresetUserSaga'; // Adjust the path accordingly
import { sendPasswordRecoveryEmailUserSaga } from './sendPasswordRecoveryEmailUserSaga'; // Adjust the path accordingly
import { updateNewPasswordRecoveryUserSaga } from './updatenewpasswordrecoveryUserSaga'; // Adjust the path accordingly





  

function* watchFetchUser() {
  yield takeEvery('FETCH_USERS_REQUEST', fetchUsersSaga.saga);
  yield takeEvery('FETCH_USER_REQUEST', fetchUserSaga.saga);
  yield takeEvery('DELETE_USER_REQUEST', deleteUserSaga.saga);
  yield takeEvery('DEACTIVATE_USER_REQUEST', deactivateUserSaga.saga);
  yield takeEvery('ADD_USER_REQUEST', addUserSaga.saga);
  yield takeEvery('EDIT_USER_REQUEST', editUserSaga.saga);
  yield takeEvery('FIRSTTIMERESET_USER_REQUEST', firstTimeResetUserSaga.saga);
  yield takeEvery('SENDPASSWORDRECOVERYEMAIL_USER_REQUEST', sendPasswordRecoveryEmailUserSaga.saga);
  yield takeEvery('UPDATENEWPASSWORDRECOVERY_USER_REQUEST', updateNewPasswordRecoveryUserSaga.saga);




}

function* userSaga(): Generator {
  yield all([fork(watchFetchUser)]);
}

export default userSaga;
