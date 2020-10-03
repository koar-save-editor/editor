import { Action } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { ATTEMPT_LOAD } from '../actionTypes/file';

export default function* () {
  yield takeEvery(ATTEMPT_LOAD, attemptLoad);
}

function* attemptLoad({ payload: fileName }: Action<string>) {}
