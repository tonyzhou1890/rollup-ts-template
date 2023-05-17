/**
 * string key object
 */
export interface StringKeyObjType {
  [x: string]: any
}

/**
 * worker call promisify
 */
('type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;')
export type WorkerCallPromisify<T extends (...args: any) => any> = (
  ...rest: Parameters<T>
) => Promise<ReturnType<T>>
