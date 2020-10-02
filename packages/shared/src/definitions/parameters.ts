/**
 * Less restrictive form of `Parameters` from typescript base definitions.
 */
export type Parameters<T> = T extends (...args: infer P) => any ? P : never;
