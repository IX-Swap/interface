import { Box } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useStyles } from 'ui/UITag/UITag.styles'

export interface UITagProps {
  variant?: 'basic' | 'special' | 'success' | 'unknown' | 'warning' | 'error'
  height?: number
  children: string
}

export const UITag = ({
  variant = 'basic',
  children,
  ...props
}: UITagProps) => {
  const theme = useTheme()
  const {
    basicStyle,
    specialStyle,
    successStyle,
    warningStyle,
    unknownStyle,
    specialDarkStyle,
    basicDarkStyle,
    errorStyle
  } = useStyles()

  const getBoxStyle = () => {
    switch (variant) {
      case 'basic':
        return theme.palette.mode === 'dark' ? basicDarkStyle : basicStyle
      case 'special':
        return theme.palette.mode === 'dark' ? specialDarkStyle : specialStyle
      case 'success':
        return successStyle
      case 'warning':
        return warningStyle
      case 'unknown':
        return unknownStyle
      case 'error':
        return errorStyle

      default:
        return basicStyle
    }
  }

  return <Box className={getBoxStyle()}>{children}</Box>
}
