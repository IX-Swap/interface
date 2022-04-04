import { Box } from '@mui/material'
import React from 'react'
import { useStyles } from 'ui/UITag/UITag.styles'
import clsx from 'clsx'

export interface UITagProps {
  variant?: 'basic' | 'special' | 'success' | 'warning' | 'error' | 'unknown'
  height?: number
  children: string
}

export const UITag = ({
  variant = 'basic',
  children,
  ...props
}: UITagProps) => {
  const {
    basicStyle,
    specialStyle,
    successStyle,
    warningStyle,
    unknownStyle,
    errorStyle,
    infoStyle
  } = useStyles()

  const getBoxStyle = () => {
    switch (variant) {
      case 'basic':
        return basicStyle
      case 'special':
        return specialStyle
      case 'success':
        return clsx(infoStyle, successStyle)
      case 'warning':
        return clsx(infoStyle, warningStyle)
      case 'unknown':
        return clsx(infoStyle, unknownStyle)
      case 'error':
        return clsx(infoStyle, errorStyle)

      default:
        return basicStyle
    }
  }

  return <Box className={getBoxStyle()}>{children}</Box>
}
