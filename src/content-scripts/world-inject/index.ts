import type { AudioPlayerState } from '@/types/data'
import { addEventListener, getPrototypeGetter, getPrototypeSetter } from '@/utils'
import { errorLog, log } from '@/utils/log'
import MacrotaskWorker from '@/utils/MacrotaskQueue'
import { wdOnMessage, wdSendMessage } from '@/utils/messager/wdMessager'

const allowOrigins = [
  'https://soundcloud.com',
  'https://open.spotify.com',
]

function injectCreateElement() {
  const originCreateElement = document.createElement

  let activeMediaEl: HTMLMediaElement | undefined
  let removeEvents = () => {}
  let isInitd = false
  let loading = false

  log('injectCreateElement init')

  const createElement: typeof originCreateElement = (tag: string, options: any) => {
    const dom = originCreateElement.call(document, tag, options)

    // resolve audioEl in SoundCloud and Spotify
    // Spotify use video tag (why????)
    if (tag === 'audio' || tag === 'video') {
      log('create media element', dom)
      const mediaEl = dom as HTMLMediaElement

      try {
        const srcSetter = getPrototypeSetter(mediaEl, 'src')
        const srcGetter = getPrototypeGetter(mediaEl, 'src')

        if (srcSetter && srcGetter) {
          Object.defineProperty(mediaEl, 'src', {
            get: srcGetter,
            set(value) {
              updateMediaEl(mediaEl)
              srcSetter.call(mediaEl, value)
            },
          })
        }
        else {
          errorLog('can get media src getter setter')
        }
      }
      catch (error) {
        errorLog('binding getter setter running error', error)
      }

      return mediaEl
    }

    return dom
  }

  const sendWapData = (data: Partial<AudioPlayerState> = {}) => {
    if (!activeMediaEl)
      return
    wdSendMessage('wap-get-data', Object.assign({
      currentTime: activeMediaEl.currentTime,
      duration: activeMediaEl.duration,
      paused: activeMediaEl.paused,
      loading,
    }, data))
  }

  function updateMediaEl(mediaEl: HTMLAudioElement) {
    log('updateMediaEl', mediaEl, activeMediaEl)
    activeMediaEl = mediaEl
    if (!isInitd) {
      isInitd = true
      log('init')
      wdSendMessage('wap-init')
    }
    removeEvents()

    const macrotaskWorker = new MacrotaskWorker(sendWapData)

    const unListenEvents = addEventListener(mediaEl, (mediaEl) => {
      const listenEvents: (keyof HTMLMediaElementEventMap)[] = ['play', 'pause', 'seeked', 'ended', 'waiting', 'canplay', 'durationchange']

      listenEvents.forEach((eventName) => {
        mediaEl.addEventListener(eventName, () => {
          switch (eventName) {
            case 'waiting':
              loading = true
              break
            case 'canplay':
              loading = false
              break
          }

          macrotaskWorker.doWork(eventName)
        })
      })
    })

    removeEvents = () => {
      unListenEvents()
    }
  }

  wdOnMessage('ap-init', () => {
    sendWapData()
  })
  wdOnMessage('ap-next-track', () => {
    // todo
  })
  wdOnMessage('ap-prev-track', () => {
    // todo
  })
  wdOnMessage('ap-pause', () => {
    if (activeMediaEl)
      activeMediaEl.pause()
  })
  wdOnMessage('ap-play', () => {
    if (activeMediaEl)
      activeMediaEl.play()
  })
  wdOnMessage('ap-seeked', (time: number) => {
    if (activeMediaEl) {
      activeMediaEl.currentTime = time
      activeMediaEl.play()
    }
  })

  document.createElement = createElement
}

if (allowOrigins.includes(location.origin)) {
  injectCreateElement()
}
