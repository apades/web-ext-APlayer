import { onMessage } from 'webext-bridge/background'

let activeTabId = 0
onMessage('wap-init', ({ sender }) => {
  activeTabId = sender.tabId
})

onMessage('get-active-tabid', () => {
  return activeTabId
})
