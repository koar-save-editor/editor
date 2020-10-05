import { set } from 'lodash';
import { Action, handleActions } from 'redux-actions';
import { preferences } from '../actionTypes';
import { SetPreferenceOperation } from '../contracts';

const initialState = (function () {
  const text = window.localStorage.getItem('preferences');
  if (text) {
    try {
      const preferences = JSON.parse(text);
      if (typeof preferences === 'object') {
        return preferences;
      }
    } catch {
      // Ignore all errors and return empty.
    }
  }
  return {};
})();

export default handleActions<unknown, any>(
  {
    [preferences.SET](_, { payload }: Action<object>) {
      return payload;
    },
    [preferences.SET_VALUE](
      state,
      { payload: { path, value } }: Action<SetPreferenceOperation>
    ) {
      return set<object>({ ...(state as object) }, path, value);
    },
  },
  initialState
);
