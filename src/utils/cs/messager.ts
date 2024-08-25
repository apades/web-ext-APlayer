import { csSendMessage } from '../messager/csMessager'

export function runCodeInWorldScripts<Args extends any[], Fn extends (...args: Args) => any>(fn: Fn, args?: Args) {
  return csSendMessage('run-code', {
    function: fn.toString(),
    args,
  })
}
