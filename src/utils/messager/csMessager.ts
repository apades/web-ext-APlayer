import { createMessager } from './Messager'
import { csListenMap } from './shared'
import type { TProtocolMap } from '@/types/events'

export const {
  offMessage: csOffMessage,
  onMessage: csOnMessage,
  onMessageOnce: csOnMessageOnce,
  sendMessage: csSendMessage,
} = createMessager<TProtocolMap>(csListenMap)
