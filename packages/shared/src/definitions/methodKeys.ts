import { StringKeys } from './stringKeys';

/**
 * Get a filtered set of the keys of `T` for which the value is a `Function`.
 */
export type MethodKeys<T> = StringKeys<
  T extends object
    ? { [Key in keyof T]-?: T[Key] extends Function ? Key : never }[keyof T]
    : keyof T
>;
