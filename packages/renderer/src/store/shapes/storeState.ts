import { FileState } from './fileState';
import { WindowState } from './windowState';

export interface StoreState {
  file: FileState;
  preferences: unknown;
  window: WindowState;
}
