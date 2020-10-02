export interface Dictionary<T = any> {
  [key: string]: T;
}

export type ReadonlyDictionary<T = any> = Readonly<Dictionary<T>>;
