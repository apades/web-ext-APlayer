import { createRoot } from 'react-dom/client'
import { onMessage, sendMessage } from 'webext-bridge/popup'
import Popup from './Popup'
import type { TPlayerEvents } from '@/types/data'
import eventBus from '@/core/eventBus'
import { log } from '@/utils/log'
// import { onceCall } from '@/utils'

let activeTabId = 0
const wdToPopupBridgeMessages: (keyof TPlayerEvents)[] = [
  'wap-get-data',
  'wap-init',
  'wap-info-update',
]
wdToPopupBridgeMessages.forEach((msg) => {
  onMessage(msg, ({ data, sender }) => {
    activeTabId = sender.tabId
    log('wdToPopupBridgeMessages', msg, data)
    eventBus.emit(msg, data)
  })
})

// const getActiveTabId = onceCall(async () => {
//   return sendMessage('get-active-tabid', null)
// })

const popupToWdBridgeMessages: (keyof TPlayerEvents)[] = [
  'ap-init',
  'ap-prev-track',
  'ap-next-track',
  'ap-pause',
  'ap-play',
  'ap-seeked',
]
popupToWdBridgeMessages.forEach((msg) => {
  eventBus.on(msg, async (data) => {
    log('popupToWdBridgeMessages', msg, data)
    sendMessage(msg, data, {
      context: 'content-script',
      tabId: /* await getActiveTabId() */activeTabId,
    })
  })
})

createRoot(document.getElementById('app')!).render(<Popup />)
