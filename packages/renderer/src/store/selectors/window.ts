import { StoreState, WindowState } from '../shapes';

function createSelector<Key extends keyof WindowState>(key: Key) {
  return ({ window }: Pick<StoreState, 'window'>) => window[key];
}

export const getId = createSelector('id');
export const getIsFocused = createSelector('isFocused');
export const getStatus = createSelector('status');
