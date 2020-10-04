import { all, call } from 'redux-saga/effects';
import { default as fileSaga } from './file';

export default function* () {
  yield all([call(fileSaga)]);
}
