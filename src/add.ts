/**
 * example function: add
 */

/**
 * add numbers
 * @param rest
 */
function add (...rest: number[]): number {
  let res = 0
  for (let i = 0, len = rest.length; i < len; i++) {
    res += rest[i]
  }
  return res
}

export type Add = typeof add

export default add
