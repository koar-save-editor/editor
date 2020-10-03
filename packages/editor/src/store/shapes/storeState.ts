import { Attributes } from './attributes';
import { FileState } from './fileState';

export interface StoreState {
  attributes: Attributes;
  file: FileState;
  preferences: unknown;
}
