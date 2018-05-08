import { put, takeLatest } from 'redux-saga/effects';

function login({ type, payload }) {
  return { token: payload.password, status: 1 };
}

function* auth(action) {
  const payload = yield login(action);

  if (payload.status == 1)
    yield put({ type: 'AUTH_SUCCESS', payload: { token: payload.token } });
  else
    yield put({
      type: 'AUTH_FAILURE',
      payload: { errorMess: payload.errorMess }
    });
}

export function* watchAuth() {
  yield takeLatest('AUTH', auth);
}
