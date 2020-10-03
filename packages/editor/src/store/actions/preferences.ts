import { Action, createAction } from 'redux-actions';
import { SET, SET_VALUE } from '../actionTypes/preferences';
import { THEME_NAME_PATH } from '../constants/preferences';
import { SetPreferenceOperation, ThemeName } from '../contracts/preferences';

export const setPreferences = createAction<unknown>(SET);

export const setPreferenceValue = <T = unknown>(
  path: string | readonly string[],
  value: T
): Action<SetPreferenceOperation<T>> => ({
  type: SET_VALUE,
  payload: { path, value },
});

export function setThemeName(themeName: ThemeName) {
  return setPreferenceValue(THEME_NAME_PATH, themeName);
}
