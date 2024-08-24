/* eslint-disable no-console */
import { addEventListener, getPrototypeGetter, getPrototypeSetter } from '@/utils'

const originCreateElement = document.createElement

let activeAudioEl: HTMLAudioElement
let unListenEvents = () => {}

const createElement: typeof originCreateElement = (tag: string, options: any) => {
  const dom = originCreateElement.call(document, tag, options)

  // resolve audioEl in SoundCloud
  if (tag === 'audio') {
    const audioEl = dom as HTMLAudioElement
    const srcSetter = getPrototypeSetter(audioEl, 'src')
    const srcGetter = getPrototypeGetter(audioEl, 'src')

    if (srcSetter && srcGetter) {
      Object.defineProperty(audioEl, 'src', {
        get: srcGetter,
        set(value) {
          updateAudioEl(audioEl)
          srcSetter.call(audioEl, value)
        },
      })
    }

    return audioEl
  }
  return dom
}

function updateAudioEl(audioEl: HTMLAudioElement) {
  console.log('ap updateAudioEl', audioEl, activeAudioEl)
  activeAudioEl = audioEl
  unListenEvents()

  unListenEvents = addEventListener(audioEl, (audioEl) => {
    audioEl.addEventListener('play', () => {
      console.log('ap play')
    })
    audioEl.addEventListener('pause', () => {
      console.log('ap pause')
    })
    audioEl.addEventListener('seeked', () => {
      console.log('ap seeked')
    })
    audioEl.addEventListener('ended', () => {
      console.log('ap ended')
    })
    audioEl.addEventListener('waiting', () => {
      console.log('ap waiting')
    })
    audioEl.addEventListener('canplay', () => {
      console.log('ap canplay')
    })
    audioEl.addEventListener('durationchange', () => {
      console.log('ap durationchange')
    })
  })
}

document.createElement = createElement
