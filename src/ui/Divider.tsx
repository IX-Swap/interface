import { Box, BoxProps, Theme } from '@mui/material'
import { styled } from '@mui/styles'

export interface DividerProps extends BoxProps {
  theme: Theme
  width?: number
  height?: number
  vertical?: boolean
}

export const Divider = styled(Box)(
  ({ theme, vertical, width, height }: DividerProps) => ({
    width: vertical === true ? `${width ?? 1}px` : width ?? '100%',
    height: vertical === true ? height ?? '100%' : `${height ?? 1}px`,
    backgroundColor: theme.palette.divider
  })
)
