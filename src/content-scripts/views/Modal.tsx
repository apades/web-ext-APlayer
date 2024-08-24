import type { FC } from 'react'
import { useState } from 'react'
// svgr载入svg
import DotIcon from '@/assets/dot.svg?svg'

interface Props {
  onClose: () => void
}
const Modal: FC<Props> = (props) => {
  const [color, setColor] = useState('#000')
  return (
    <div className="fixed z-[99999] left-0 top-0 w-full h-full flex items-center justify-center">
      <div onClick={props.onClose} className="bg-black/30 absolute w-full h-full"></div>
      <div className="p-4 rounded-md bg-white relative z-10">
        <h2>Pick color</h2>
        <div className="flex gap-2">
          <span className="text-3xl"><DotIcon color={color} /></span>
          <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default Modal
