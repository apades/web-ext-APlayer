import { createRoot } from 'react-dom/client'
import AudioPlayer from '@/ui/AudioPlayer'
import '../styles'
import eventBus from '@/core/eventBus'

const root = document.createElement('div')
document.body.appendChild(root)

createRoot(root).render(
  <div className="w-[300px]">
    <AudioPlayer />
  </div>,
)

setTimeout(() => {
  eventBus.emit('wap-info-update', {
    name: 'Audio name',
    artistName: 'Artist name',
    coverUrl: '/cat.jpg',
  })

  eventBus.emit('wap-get-data', {
    currentTime: 23,
    duration: 123,
    paused: false,
    loading: false,
  })
}, 100)
