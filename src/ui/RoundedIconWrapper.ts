import { Box, BoxProps, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface RoundedIconProps extends BoxProps {
  color: string
  size?: number
  theme?: Theme
}

export const RoundedIconWrapper = styled(Box)<RoundedIconProps>(
  ({ theme, size, color }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size ?? 56,
    height: size ?? 56,
    backgroundColor: color,
    color: theme.palette.common.white,
    borderRadius: 9
  })
)
