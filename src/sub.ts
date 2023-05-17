/**
 * example function: sub
 */

/**
 * sub numbers
 * @param rest
 */
function sub (...rest: number[]): number {
  let res = rest[0]
  for (let i = 1, len = rest.length; i < len; i++) {
    res -= rest[i]
  }
  return res
}

export type Sub = typeof sub

export default sub
