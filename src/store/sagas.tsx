// sagas.js
import { all, fork } from "redux-saga/effects";
import userSaga from "./sagas/users/userSaga";
import productSaga from "./sagas/products/productSaga";
import transactionSaga from "./sagas/records/transactions/transactionSaga";
import writeoffSaga from "./sagas/records/writeoffs/writeoffSaga";
import restockingSaga from "./sagas/records/restockings/restockingSaga";

function* rootSaga() {
  yield all([fork(userSaga), fork(productSaga), fork(transactionSaga), fork(writeoffSaga), fork(restockingSaga)]);
}

export default rootSaga;
