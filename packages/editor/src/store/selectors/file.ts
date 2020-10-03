import { FileState, StoreState } from '../shapes';

function createSelector<Key extends keyof FileState>(key: Key) {
  return ({ file }: Pick<StoreState, 'file'>) => file[key];
}

export const getFileName = createSelector('fileName');
export const getHasUnsavedChanges = createSelector('hasUnsavedChanges');
