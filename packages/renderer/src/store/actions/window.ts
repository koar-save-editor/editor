import { createAction } from 'redux-actions';
import { CLOSE, MAXIMIZE, MINIMIZE } from '../actionTypes/window';

export const close = createAction(CLOSE, () => {});
export const maximize = createAction(MAXIMIZE, () => {});
export const minimize = createAction(MINIMIZE, () => {});
