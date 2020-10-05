import { WindowStatus } from '@koar/shared';

export interface WindowState {
  id: number;
  status: WindowStatus;
  isFocused: boolean;
}
