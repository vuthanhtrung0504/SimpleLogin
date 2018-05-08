import { fork } from 'redux-saga/effects';
import { watchAuth } from '../containers/Login/saga';

export default function* rootSaga() {
  yield [fork(watchAuth)];
}
