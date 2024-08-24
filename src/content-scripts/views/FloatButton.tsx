import { type FC, useState } from 'react'
import Browser from 'webextension-polyfill'
import Modal from './Modal'
import useDrag from '@/hooks/useDrag'

const FloatButton: FC = () => {
  const [isModalShow, setModalShow] = useState(false)
  const dragRef = useDrag({
    onDown: ({ target }) => {
      target.dataset.move = '0'
    },
    onMove: ({ target, moveY, downTranslateY }) => {
      const y = downTranslateY + moveY
      target.style.transform = `translateY(${y}px)`
      target.dataset.move = `${moveY}`
    },
    onUp: ({ target, top, bottom, translateY }) => {
      const dy = top < 10 ? 10 - top : bottom > innerHeight - 10 ? innerHeight - 10 - bottom : 0
      target.style.transform = `translateY(${translateY + dy}px)`
    },
  })

  const handleClick = () => {
    const div = dragRef.current
    const isMoving = div && div.dataset.move && Math.abs(+(div.dataset.move)) > 2
    if (isMoving)
      return

    setModalShow(true)
  }

  return (
    <>
      <div
        ref={dragRef}
        className="fixed bottom-4 right-0 z-[999] p-2 cursor-pointer rounded-l-md shadow-md bg-slate-200 select-none"
        onClick={handleClick}
      >
        {/* require载入图片，会自动放在输出文件夹根目录里 */}
        <img src={Browser.runtime.getURL(require('@/assets/setting.svg'))} alt="logo" className="w-6 pointer-events-none" />
      </div>
      {isModalShow && <Modal onClose={() => setModalShow(false)} />}
    </>
  )
}

export default FloatButton
