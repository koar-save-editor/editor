import { Comparison, Projection } from '../definitions';

export default function binarySearchByValue<T, Value>(
  list: readonly T[],
  value: Value,
  projection: Projection<T, Value>,
  comparison: Comparison<Value> = Comparison.standard
) {
  if (!list.length) {
    return -1;
  }
  let start = 0;
  let end = list.length - 1;
  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    const result = comparison(value, projection(list[middle]));
    if (!result) {
      return middle;
    }
    if (result < 0) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }
  return ~start;
}
