import { wdOnMessage } from '@/utils/messager/wdMessager'
import './world-inject/index'

wdOnMessage('run-code', async (data) => {
  // eslint-disable-next-line no-new-func
  const fn = new Function(`return (${data.function})(...arguments)`)
  const rs = await fn(...(data.args ?? []))

  return rs
})
