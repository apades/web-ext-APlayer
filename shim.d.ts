import type { ProtocolWithReturn } from 'webext-bridge'

type PlayerEvents =
  'pause' |
  'play' |
  'loading' |
  'ended' |
  'canplay' |
  'seeked'

type TPlayerEvents = {
  [K in `ap-${PlayerEvents}`]: ProtocolWithReturn<{ ct: number }, void>
}

declare module 'webext-bridge' {
  export interface ProtocolMap extends TPlayerEvents {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    'run-code': ProtocolWithReturn<{ function: string, args?: any[] }, { b: string }>
  }
}
