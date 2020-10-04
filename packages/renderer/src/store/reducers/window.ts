import { SET_ID, SET_IS_FOCUSED, SET_STATUS } from '../actionTypes/window';
import { WindowState } from '../shapes';
import { createBasicReducer } from '../util';

const initialState: WindowState = {
  id: 0,
  isFocused: true,
  status: 'normal',
};

const reducer = createBasicReducer(initialState, {
  [SET_ID]: 'id',
  [SET_IS_FOCUSED]: 'isFocused',
  [SET_STATUS]: 'status',
});

export default reducer;
