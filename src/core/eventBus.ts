import type { TPlayerEvents } from '@/types/data'
import Events2 from '@/utils/Events2'
import type { GetDataType } from '@/utils/messager/Messager'

type EventMap = {
  [key in keyof TPlayerEvents]: GetDataType<TPlayerEvents[key]>
}

const eventBus = new Events2<EventMap>()

export default eventBus
