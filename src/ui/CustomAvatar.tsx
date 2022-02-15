import React, { ReactNode, Fragment } from 'react'
import { Avatar, AvatarProps, Badge, BadgeProps } from '@mui/material'

import { useTheme } from '@mui/styles'

export interface CustomAvatarProps extends AvatarProps {
  size?: number | [number, number] | [string, string]
  maxWidth?: number | string
  fallback?: Element | JSX.Element
  children?: ReactNode
  hasBadge?: boolean
}

export const CustomAvatar = (props: CustomAvatarProps) => {
  const {
    size = 80,
    children,
    maxWidth = 'initial',
    hasBadge = false,
    ...other
  } = props
  const width = Array.isArray(size) ? size[0] : size
  const height = Array.isArray(size) ? size[1] : size

  const style = { width, height, maxWidth }

  const StyledBadge = (props: BadgeProps) => {
    const { palette } = useTheme()
    return (
      <Badge
        {...props}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: palette.success.main,
            color: palette.success.main,
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              content: '""'
            }
          }
        }}
      />
    )
  }

  const Wrapper = hasBadge ? StyledBadge : Fragment

  return (
    <Wrapper
      overlap='circular'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant='dot'
    >
      <Avatar style={style} {...other}>
        {children}
      </Avatar>
    </Wrapper>
  )
}
