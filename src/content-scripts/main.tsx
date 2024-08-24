import { createRoot } from 'react-dom/client'
import Browser from 'webextension-polyfill'
import FloatButton from './views/FloatButton'
import { runCodeInWorldScripts } from '@/utils'

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

// 和world脚本通信
runCodeInWorldScripts((a: string) => {
  return `top window: ${window.____inject_data}\ninput args:${a}`
}, ['input']).then((res) => {
  // eslint-disable-next-line no-console
  console.log(`run code rs\n${res}`)
})
