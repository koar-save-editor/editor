import { createAction } from 'redux-actions';
import { CLOSE, MAXIMIZE, MINIMIZE, UNMAXIMIZE } from '../actionTypes/window';

export const close = createAction(CLOSE, () => {});
export const maximize = createAction(MAXIMIZE, () => {});
export const minimize = createAction(MINIMIZE, () => {});
export const unmaximize = createAction(UNMAXIMIZE, () => {});
