// sagas.js
import { all, fork } from 'redux-saga/effects';
import userSaga from './sagas/users/userSaga';
import productSaga from './sagas/products/productSaga';

function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(productSaga),
  ]);
}

export default rootSaga;
