/**
 * A function that takes two arguments of the same type
 * and returns a value indicating if they are equal.
 */
export type EqualityComparison<T = any> = (left: T, right: T) => boolean;

export namespace EqualityComparison {
  /**
   * Implements the standard equality comparison between two values.
   * @param left The left comparand.
   * @param right The right comparand.
   */
  export const standard: EqualityComparison = (left, right) => {
    return left === right;
  };
}
