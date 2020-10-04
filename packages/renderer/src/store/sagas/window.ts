import {
  WindowStatus,
  WINDOW_GET_ID,
  WINDOW_IS_FOCUSED_CHANGED,
  WINDOW_STATUS_CHANGED,
} from '@koar/shared';
import { ipcRenderer } from 'electron';
import { take } from 'lodash';
import { Action, createAction } from 'redux-actions';
import { eventChannel } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { window as actionTypes } from '../actionTypes';

export default function* () {
  const id: number = yield call(getWindowId);
  yield put(setWindowId(id));
  const channel = eventChannel<Action<any>>(emitter => {
    ipcRenderer
      .on(WINDOW_IS_FOCUSED_CHANGED, (_, isFocused: boolean) => {
        emitter(setWindowIsFocused(isFocused));
      })
      .on(WINDOW_STATUS_CHANGED, (_, status: WindowStatus) => {
        emitter(setWindowStatus(status));
      });
    return () => {
      ipcRenderer
        .removeAllListeners(WINDOW_IS_FOCUSED_CHANGED)
        .removeAllListeners(WINDOW_STATUS_CHANGED);
    };
  });
  yield takeEvery(channel, function* (action) {
    yield put(action);
  });
  yield take(actionTypes.CLOSE);
  channel.close();
  window.close();
}

const getWindowId = () => ipcRenderer.invoke(WINDOW_GET_ID);

const setWindowId = createAction<number>(actionTypes.SET_ID);

const setWindowIsFocused = createAction<boolean>(actionTypes.SET_IS_FOCUSED);

const setWindowStatus = createAction<WindowStatus>(actionTypes.SET_STATUS);
