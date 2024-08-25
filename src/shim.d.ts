import type { ProtocolWithReturn } from 'webext-bridge/*'
import type { TProtocolMap } from './types/events'
import type { GetDataType, GetReturnType } from './utils/messager/Messager'

type TTProtocolMap = {
  [k in keyof TProtocolMap]: ProtocolWithReturn<GetDataType<TProtocolMap[k]>, GetReturnType<TProtocolMap[k]>>
}

declare module 'webext-bridge' {
  export interface ProtocolMap extends TTProtocolMap {}
}
