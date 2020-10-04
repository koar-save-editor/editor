import { get } from 'lodash';
import { ThemeName } from '../contracts';
import { StoreState } from '../shapes';
import { THEME_NAME_PATH } from '../constants/preferences';

export const getPreferences = (state: StoreState) => state.preferences;

export function getPreferenceValue<T>(
  path: string | readonly string[]
): (state: Pick<StoreState, 'preferences'>) => T | undefined;
export function getPreferenceValue<T>(
  path: string | readonly string[],
  defaultValue: T
): (state: Pick<StoreState, 'preferences'>) => T;
export function getPreferenceValue(
  path: string | readonly string[],
  defaultValue?: any
): (state: Pick<StoreState, 'preferences'>) => any {
  return ({ preferences }) => get(preferences, path, defaultValue);
}

export const getThemeName = getPreferenceValue<ThemeName>(
  THEME_NAME_PATH,
  'dark'
);
