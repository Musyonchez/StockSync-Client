// sagas.js
import { all, fork } from "redux-saga/effects";
import userSaga from "./sagas/users/userSaga";
import productSaga from "./sagas/products/productSaga";
import TransactionSaga from "./sagas/records/transactions/transactionSaga";

function* rootSaga() {
  yield all([fork(userSaga), fork(productSaga), fork(TransactionSaga)]);
}

export default rootSaga;
