import { Box, BoxProps, Theme } from '@mui/material'
import { styled } from '@mui/styles'

export interface DividerProps extends BoxProps {
  theme: Theme
  vertical?: boolean
}

export const Divider = styled(Box)(
  // @ts-expect-error
  ({ theme, vertical, width, height }: DividerProps) => ({
    width: vertical === true ? width ?? 1 : width ?? '100%',
    height: vertical === true ? height ?? '100%' : height ?? 1,
    backgroundColor: theme.palette.divider
  })
)
