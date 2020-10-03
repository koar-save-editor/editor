import { Attributes, StoreState } from '../shapes';

function createSelector<Key extends keyof Attributes>(key: Key) {
  return ({ attributes }: Pick<StoreState, 'attributes'>) => attributes[key];
}

export const getEnvironment = createSelector('environment');
