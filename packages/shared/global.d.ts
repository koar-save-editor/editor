declare interface ArrayConstructor {
  isArray<T = any>(value: readonly T[] | unknown): value is readonly T[];
}
