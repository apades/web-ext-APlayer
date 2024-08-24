/* eslint-disable ts/no-unsafe-function-type */
import type { KeyOfType } from './typeUtils'
import { isArray } from '.'

export function injectFunction<
  T extends object,
  K extends KeyOfType<T, Function>,
>(
  origin: T,
  keys: K[] | K,
  cb: (...args: any) => void,
): {
    originKeysValue: Record<K, T[K]>
    /** restore all inject function */
    restore: () => void
  // proxy: T
  } {
  if (!isArray(keys))
    keys = [keys]

  const originKeysValue = keys.reduce((obj, key) => {
    obj[key] = origin[key]
    return obj
  }, {} as Record<K, T[K]>)

  keys.forEach((key) => {
    const fn = (...args: any) => {
      cb(...args)
      return (originKeysValue[key] as Function).apply(origin, args)
    }
    fn.toString = (origin as any)[key].toString
    ;(origin as any)[key] = fn
  })

  return {
    originKeysValue,
    restore: () => {
      for (const key in originKeysValue) {
        origin[key] = (originKeysValue[key] as Function).bind(origin)
      }
    } /* , proxy */,
  }
}
