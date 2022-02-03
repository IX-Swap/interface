import { Box, BoxProps, Theme } from '@mui/material'
import { styled } from '@mui/styles'

export interface RoundedIconProps extends BoxProps {
  size?: number
  color: string
  theme: Theme
}

export const RoundedIconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: (props: RoundedIconProps) => props.size ?? 56,
  height: (props: RoundedIconProps) => props.size ?? 56,
  backgroundColor: props => props.color,
  color: props => props.theme.palette.common.white,
  borderRadius: 9
})
