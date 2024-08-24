export async function sendExtMessage(type: string, data: any) {
  window.dispatchEvent(new CustomEvent('ext-req', { detail: { type, data } }))

  return new Promise((res) => {
    function handleResponse(e: any) {
      const detail = e.detail
      if (detail.type === type) {
        window.removeEventListener('ext-res', handleResponse)
        return res(detail.data)
      }
    }
    window.addEventListener('ext-res', handleResponse)
  })
}

export function runCodeInWorldScripts<Args extends any[], Fn extends (...args: Args) => any>(fn: Fn, args?: Args) {
  return sendExtMessage('run-code', {
    function: fn.toString(),
    args,
  })
}
