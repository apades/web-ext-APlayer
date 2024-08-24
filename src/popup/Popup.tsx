import type { FC } from 'react'
import { useState } from 'react'

const Popup: FC = () => {
  const [count, setCount] = useState(0)
  return (
    (
      <div
        style={{ width: 100, padding: 6 }}
        onClick={() => {
          setCount(c => c + 1)
        }}
      >
        {count}
      </div>
    )
  )
}

export default Popup
