import { all, call } from 'redux-saga/effects';
import { default as fileSaga } from './file';
import { default as windowSaga } from './window';

export default function* () {
  yield all([call(fileSaga), call(windowSaga)]);
}
