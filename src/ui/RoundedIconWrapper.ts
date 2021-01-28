import { Box, BoxProps } from '@material-ui/core'
import { styled, Theme, withTheme } from '@material-ui/core/styles'

export interface RoundedIconProps extends BoxProps {
  size?: number
  color: string
  theme: Theme
}

export const Component = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: (props: RoundedIconProps) => props.size ?? 56,
  height: (props: RoundedIconProps) => props.size ?? 56,
  backgroundColor: props => props.color,
  color: props => props.theme.palette.common.white,
  borderRadius: 9
})

export const RoundedIconWrapper = withTheme(Component)
