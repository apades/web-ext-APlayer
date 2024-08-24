// 在网页的window对象上运行，与main.ts的window对象不同
// 这里可以用来搞js注入或劫持，下面这个可以在top window里取到

window.____inject_data = 'hello world'

window.addEventListener('ext-req', async (e) => {
  const { type, data } = (e as any).detail

  switch (type) {
    case 'run-code': {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`return (${data.function})(...arguments)`)

      const rs = await fn(...(data.args ?? []))
      sendExtResponse(type, rs)
      break
    }
  }
})

function sendExtResponse(type: string, data: any) {
  window.dispatchEvent(
    new CustomEvent('ext-res', {
      detail: { type, data },
    }),
  )
}
