import React from 'react'
import Icons from 'assets/icons/sprite/symbol/svg/sprite.symbol.svg'
import { StyledSVG } from 'ui/Icons/Icon.styles'

export interface IconProps {
  name: string
  width?: number
  height?: number
  color?: string
  hoverColor?: string
}

export const Icon = ({
  name,
  color = '#778194',
  hoverColor = '#4C88FF',
  width = 24,
  height = 24
}: IconProps) => {
  return (
    <StyledSVG
      width={`${width}px`}
      height={`${height}px`}
      fill={color}
      hoverColor={hoverColor}
    >
      <use href={Icons + `#${name}`} />
    </StyledSVG>
  )
}
