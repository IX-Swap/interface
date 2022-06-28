import React from 'react'
import Icons from 'assets/icons/sprite/symbol/svg/sprite.symbol.svg'
import { StyledSVG } from 'ui/Icons/Icon.styles'

export interface IconProps extends React.ComponentProps<any> {
  name: string
  size?: number
  color?: string
  hoverColor?: string
  noHover?: boolean
}

export const Icon = ({
  name,
  color = '#778194',
  hoverColor = '#4C88FF',
  size = 24,
  noHover = false,
  ...props
}: IconProps) => {
  const hover = noHover ? color : hoverColor

  return (
    <StyledSVG
      width={`${size}px`}
      height={`${size}px`}
      fill={color}
      hoverColor={hover}
      {...props}
    >
      <use href={Icons + `#${name}`} />
    </StyledSVG>
  )
}
