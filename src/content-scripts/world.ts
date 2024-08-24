import { onMessage, setNamespace } from 'webext-bridge/window'
import './world-inject/index'
import { WEB_EXT_MSG_ID } from '@/shared/env'

setNamespace(WEB_EXT_MSG_ID)

onMessage('run-code', async ({ data }) => {
  // eslint-disable-next-line no-new-func
  const fn = new Function(`return (${data.function})(...arguments)`)
  const rs = await fn(...(data.args ?? []))

  return rs
})
