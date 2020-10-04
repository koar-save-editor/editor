import { Attributes } from './attributes';
import { FileState } from './fileState';
import { WindowState } from './windowState';

export interface StoreState {
  attributes: Attributes;
  file: FileState;
  preferences: unknown;
  window: WindowState;
}
