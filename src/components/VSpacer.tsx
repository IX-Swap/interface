import React from 'react'
import { Box } from '@mui/material'

export const sizeMap = {
  extraSmall: 0.5,
  small: 1,
  medium: 2.5,
  extraMedium: 3.5,
  large: 5
}

export interface VSpacerProps {
  size: keyof typeof sizeMap
}

export const VSpacer = (props: VSpacerProps) => {
  const { size } = props

  return <Box py={sizeMap[size]} />
}
