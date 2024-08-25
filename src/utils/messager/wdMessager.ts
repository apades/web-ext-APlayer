import { createMessager } from './Messager'
import { wdListenMap } from './shared'
import type { TProtocolMap } from '@/types/events'

export const {
  offMessage: wdOffMessage,
  onMessage: wdOnMessage,
  onMessageOnce: wdOnMessageOnce,
  sendMessage: wdSendMessage,
} = createMessager<TProtocolMap>(wdListenMap)
