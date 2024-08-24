import { spawn as _spawn } from 'node:child_process'
import path from 'node:path'
import * as url from 'node:url'

export const __filename = url.fileURLToPath(import.meta.url)
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

function __spawn(log, ...args) {
  const child = _spawn(...args, {
    env: process.env,
    shell: true,
  })
  if (log) {
    console.log(`⚡ ${args[0]} ${args[1].join(' ')}`)
  }
  return new Promise((res) => {
    let rs = ''
    child.on('close', () => res(rs))
    child.stderr.pipe(process.stderr)
    child.stdout.pipe(process.stdout)
    child.stdout.on('data', data => (rs += data.toString()))
    child.stderr.on('data', data => (rs += data.toString()))
    if (log) {
      process.stdin.pipe(child.stdin)
    }
  })
}

export function spawn(...args) {
  return __spawn(true, ...args)
}

export function spawnWithoutLog(...args) {
  return __spawn(false, ...args)
}

export function pr(...args) {
  return path.resolve(__dirname, ...args)
}
