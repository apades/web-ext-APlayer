import { createRoot } from 'react-dom/client'
import Browser from 'webextension-polyfill'
import { onMessage, sendMessage } from 'webext-bridge/content-script'
import FloatButton from './views/FloatButton'
import { csOnMessage, csSendMessage } from '@/utils/messager/csMessager'
import type { TPlayerEvents } from '@/types/data'

(async () => {
  const container = document.createElement('div')
  container.style.all = 'initial !important'
  const shadowRoot = container.attachShadow({ mode: 'open' })

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', Browser.runtime.getURL('style.css'))
  shadowRoot.appendChild(styleEl)

  const rootEl = document.createElement('div')
  shadowRoot.appendChild(rootEl)

  createRoot(rootEl).render(<FloatButton />)

  document.body.appendChild(container)
})()

const wdToPopupBridgeMessages: (keyof TPlayerEvents)[] = [
  'wap-get-data',
  'wap-init',
  'wap-info-update',
]
wdToPopupBridgeMessages.forEach((msg) => {
  csOnMessage(msg, (data) => {
    sendMessage(msg, data, 'popup')
  })
})

const popupToWdBridgeMessages: (keyof TPlayerEvents)[] = [
  'ap-init',
  'ap-prev-track',
  'ap-next-track',
  'ap-pause',
  'ap-play',
  'ap-seeked',
]
popupToWdBridgeMessages.forEach((msg) => {
  onMessage(msg, ({ data }) => {
    csSendMessage(msg, data)
  })
})
