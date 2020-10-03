export interface SetPreferenceOperation<T = unknown> {
  path: string | readonly string[];
  value: T;
}
