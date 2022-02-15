import React from 'react'
import Icons from 'assets/icons/sprite/symbol/svg/sprite.symbol.svg'

export interface IconProps {
  name: string
  width?: number
  height?: number
  color?: string
}

export const Icon = ({ name, color, width = 24, height = 24 }: IconProps) => {
  return (
    <svg width={`${width}px`} height={`${height}px`} fill={color}>
      <use href={Icons + `#${name}`} />
    </svg>
  )
}
