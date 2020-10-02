/**
 * Project a `Value` from an item of type `T`.
 */
export type Projection<T, Value> = (item: T) => Value;
