import type { ProtocolWithReturn } from '@/utils/messager/Messager'

export interface AudioPlayerState {
  currentTime: number
  duration: number
  paused: boolean
  loading: boolean
}

export interface AudioPlayerInfo {
  name: string
  detailUrl?: string
  coverUrl?: string
  artistName?: string
  artistUrl?: string
  isFav?: boolean
}

type PlayerEvents =
  'pause' |
  'play' |
  'loading' |
  'ended' |
  'canplay' |
  'seeked' |
  'get-data'

export type TPlayerEvents = {
  [K in `wap-${PlayerEvents}`]: ProtocolWithReturn<AudioPlayerState, void>
} & {
  'wap-info-update': ProtocolWithReturn<AudioPlayerInfo, void>
  'wap-init': void
  'ap-init': void
  'ap-seeked': ProtocolWithReturn<number, void>
  'ap-play': void
  'ap-pause': void
  'ap-next-track': void
  'ap-prev-track': void
  'get-active-tabid': ProtocolWithReturn<null, number>
}
