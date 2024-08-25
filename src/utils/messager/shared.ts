const sendType = 'EXT_SEND'
const listenType = 'EXT_RES'

export const csListenMap = {
  sendType,
  listenType,
}

export const wdListenMap = {
  sendType: listenType,
  listenType: sendType,
}
