import { createAction } from 'redux-actions';
import {
  ATTEMPT_LOAD,
  REGISTER_UNSAVED_CHANGE,
  SET_FILE,
} from '../actionTypes/file';

export const attemptLoad = createAction<string>(ATTEMPT_LOAD);

export const registerUnsavedChange = createAction(
  REGISTER_UNSAVED_CHANGE,
  () => {}
);

export const setFile = createAction<string>(SET_FILE);
