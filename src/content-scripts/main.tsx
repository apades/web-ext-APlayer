import { createRoot } from 'react-dom/client'
import Browser from 'webextension-polyfill'
import { allowWindowMessaging } from 'webext-bridge/content-script'
import FloatButton from './views/FloatButton'
import { WEB_EXT_MSG_ID } from '@/shared/env'

allowWindowMessaging(WEB_EXT_MSG_ID)

;(async () => {
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
