import { useEffect } from 'react'
import { isPromiseFunction } from '@/utils'

export function useOnce(cb: () => void): void {
  return useEffect(() => {
    if (isPromiseFunction(cb)) {
      cb()
      return
    }

    return cb()
  }, [])
}
