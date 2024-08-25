import type { TPlayerEvents } from './data'
import type { ProtocolWithReturn } from '@/utils/messager/Messager'

export interface TProtocolMap extends TPlayerEvents {
  // define message protocol types
  // see https://github.com/antfu/webext-bridge#type-safe-protocols

  'run-code': ProtocolWithReturn<{ function: string, args?: any[] }, any>
}
