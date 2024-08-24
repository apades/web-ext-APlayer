import { useEffect, useRef } from 'react'

interface DownData {
  e: PointerEvent
  target: HTMLDivElement
  translateX: number
  translateY: number
  translateZ: number
  width: number
  height: number
}

interface MoveData {
  e: PointerEvent
  target: HTMLDivElement
  moveX: number
  moveY: number
  downTranslateX: number
  downTranslateY: number
  downTranslateZ: number
  downWidth: number
  downHeight: number
}

interface UpData {
  e: PointerEvent
  target: HTMLDivElement
  moveX: number
  moveY: number
  translateX: number
  translateY: number
  translateZ: number
  bottom: number
  left: number
  top: number
  right: number
}

interface Handle {
  onDown?: (down: DownData) => void
  onMove?: (move: MoveData) => void
  onUp?: (up: UpData) => void
}

function parseStyleValue(style: CSSStyleDeclaration) {
  let tX = 0
  let tY = 0
  let tZ = 0
  try {
    const value = CSSStyleValue.parse(
      'transform',
      style.transform || 'translate(0px, 0px)',
    ) as CSSTransformValue
    for (const i of value) {
      if (i instanceof CSSTranslate) {
        tX = i.x.to('px').value
        tY = i.y.to('px').value
        tZ = i.z.to('px').value
      }
    }
  }
  catch (e) {
    console.error(e)
  }

  return {
    translateX: tX,
    translateY: tY,
    translateZ: tZ,
  }
}

export default function useDrag(handle: Handle) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    let xy1 = [0, 0]
    let xy = [0, 0]
    let downTranslate = [0, 0, 0]
    let downWidth = 0
    let downHeight = 0

    const handleMove = (e: PointerEvent) => {
      xy = [e.clientX, e.clientY]
      handle.onMove?.({
        e,
        target: element!,
        moveX: xy[0] - xy1[0],
        moveY: xy[1] - xy1[1],
        downTranslateX: downTranslate[0],
        downTranslateY: downTranslate[1],
        downTranslateZ: downTranslate[2],
        downWidth,
        downHeight,
      })
    }

    const handlePointerDown = (e: PointerEvent) => {
      xy1 = [e.clientX, e.clientY]
      element!.addEventListener('pointermove', handleMove)
      element!.setPointerCapture(e.pointerId)
      const transformValue = parseStyleValue(element!.style)
      const rect = element!.getBoundingClientRect()
      downWidth = rect.width
      downHeight = rect.height
      downTranslate = [
        transformValue.translateX,
        transformValue.translateY,
        transformValue.translateZ,
      ]
      handle.onDown?.({
        ...transformValue,
        e,
        target: element!,
        width: rect.width,
        height: rect.height,
      })
    }

    const handlePointerUp = (e: PointerEvent) => {
      element!.removeEventListener('pointermove', handleMove)
      element!.releasePointerCapture(e.pointerId)
      const rect = element!.getBoundingClientRect()

      handle.onUp?.({
        ...parseStyleValue(element!.style),
        e,
        moveX: xy[0] - xy1[0],
        moveY: xy[1] - xy1[1],
        target: element!,
        bottom: rect.bottom,
        left: rect.left,
        top: rect.top,
        right: rect.right,
      })
    }

    if (element) {
      element.addEventListener('pointerdown', handlePointerDown)
      element.addEventListener('pointerup', handlePointerUp)
      element.addEventListener('pointercancel', handlePointerUp)

      return () => {
        element.removeEventListener('pointerdown', handlePointerDown)
        element.removeEventListener('pointerup', handlePointerUp)
        element.removeEventListener('pointercancel', handlePointerUp)
      }
    }
  }, [])

  return ref
}
