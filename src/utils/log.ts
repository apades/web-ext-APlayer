function getIndieConsole() {
  const iframeEl = document.createElement('iframe')
  iframeEl.style.visibility = 'hidden'
  iframeEl.style.position = 'fixed'
  document.head.appendChild(iframeEl)
  return iframeEl.contentWindow?.console as typeof window.console | undefined
}

const console = getIndieConsole()
export function log(...args: any) {
  console?.log('🐛', ...args)
}

export function errorLog(...args: any) {
  console?.error('😰', ...args)
}
