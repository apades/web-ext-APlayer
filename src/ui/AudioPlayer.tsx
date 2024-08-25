import { IconButton, Slider, useTheme } from '@mui/material'
import { type FC, useState } from 'react'
import WidthRatioHeight from './WidthRatioHeight'
import { useOnce } from '@/hooks'
import type { AudioPlayerInfo } from '@/types/data'
import { formatTime } from '@/utils'
import NextIcon from '@/assets/next.svg?svg'
import PauseIcon from '@/assets/pause.svg?svg'
import PlayIcon from '@/assets/play.svg?svg'
import eventBus from '@/core/eventBus'
import LoadingIcon from '@/assets/loading.svg?svg'

interface Props {
  mode?: 'tab' | 'popup' | ' docPIP'
}
const AudioPlayer: FC<Props> = () => {
  const [info, setInfo] = useState<AudioPlayerInfo>({ name: '' })
  const [isLoading, setLoading] = useState(false)
  const [isPaused, setPaused] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const theme = useTheme()

  useOnce(() => {
    eventBus.emit('ap-init')

    const unListens = [
      eventBus.on2('wap-info-update', setInfo),
      // eventBus.on2('ap-loading', () => setLoading(true)),
      // eventBus.on2('ap-play', () => setPaused(false)),
      // eventBus.on2('ap-pause', () => setPaused(true)),
      eventBus.on2('wap-get-data', (d) => {
        setLoading(d.loading)
        setDuration(d.duration)
        setPaused(d.paused)
        setCurrentTime(d.currentTime)
      }),
    ]

    return () => {
      unListens.forEach((unListen) => {
        unListen()
      })
    }
  })

  const changeCurrentTime = (time: number) => {
    setCurrentTime(time)
    eventBus.emit('ap-seeked', time)
  }

  return (
    <div>
      <div className="relative">
        <WidthRatioHeight ratio={1}>
          <img src={info.coverUrl} />
        </WidthRatioHeight>
        <div className="absolute bottom-0 w-full px-4 pt-[100px] pb-5 py bg-gradient-to-t from-white">
          <div className="text-lg font-bold">
            {info.name}
          </div>
          <div className="text-sm text-gray-500">
            {info?.artistName ?? 'Unknown Artist'}
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <Slider
          aria-label="time-indicator"
          size="small"
          value={currentTime}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => changeCurrentTime(value as number)}
          sx={{
            'color': theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            'height': 4,
            '& .MuiSlider-thumb': {
              'width': 8,
              'height': 8,
              'transition': '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />

        <div className="flex text-xs text-gray-500 -mt-4">
          <div>{formatTime(currentTime)}</div>
          <div className="flex-1"></div>
          <div>{formatTime(duration)}</div>
        </div>

        <div className="f-i-center justify-center gap-4">
          <IconButton onClick={() => {
            eventBus.emit('ap-prev-track')
          }}
          >
            <span className="text-lg text-black"><NextIcon /></span>
          </IconButton>
          <IconButton onClick={() => {
            if (isLoading)
              return
            if (isPaused) {
              eventBus.emit('ap-play')
            }
            else {
              eventBus.emit('ap-pause')
            }

            setPaused(!isPaused)
          }}
          >
            <span className="text-[40px] text-black">
              {
                (isLoading && <LoadingIcon />)
                || (!isPaused ? <PauseIcon /> : <PlayIcon />)
              }
            </span>
          </IconButton>
          <IconButton onClick={() => {
            eventBus.emit('ap-next-track')
          }}
          >
            <span className="text-lg rotate-180 text-black">
              <NextIcon />
            </span>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
