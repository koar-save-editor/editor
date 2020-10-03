import { Action, handleActions } from 'redux-actions';
import { file } from '../actionTypes';
import { FileState } from '../shapes';
import { updateImmutable } from '../util';

export const initialState: FileState = { hasUnsavedChanges: false };

export default handleActions<FileState, any>(
  {
    [file.REGISTER_UNSAVED_CHANGE](state) {
      return updateImmutable(state, 'hasUnsavedChanges', true);
    },
    [file.SET_FILE](state, { payload: fileName }: Action<string>) {
      return { ...state, fileName, hasUnsavedChange: false };
    },
  },
  initialState
);
