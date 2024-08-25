import type { FC } from 'react'
import Browser from 'webextension-polyfill'
import AudioPlayer from '@/ui/AudioPlayer'

const Popup: FC = () => {
  return (
    <div className="w-[300px]">
      <link type="text/css" rel="stylesheet" href={Browser.runtime.getURL('style.css')} />
      <AudioPlayer />
    </div>
  )
}

export default Popup
