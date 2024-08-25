import type { FC, ReactElement } from 'react'

type Props = {
  children: ReactElement
  width?: number | string
  /** exm (height)9 / (width)16 */
  ratio: number
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

/**
 * @example
 * ```jsx
 * <WidthRatio bottomRatio={9 / 16}>
 *  <video />
 * </WidthRatio>
 * ```
 */
const WidthRatioHeight: FC<Props> = (props) => {
  const { width, children, ratio: bottomRatio, ..._props } = props
  return (
    <div {..._props}>
      <div
        className="relative"
        style={{
          paddingBottom: `${bottomRatio * 100}%`,
        }}
      >
        <div className="wh-[100%] absolute left-0 top-0 [&>*]:h-full">{children}</div>
      </div>
    </div>
  )
}

export default WidthRatioHeight
