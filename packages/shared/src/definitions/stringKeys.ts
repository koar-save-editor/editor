export type StringKeys<T extends PropertyKey> = {
  [item in T]: item extends string ? item : never;
}[T];
