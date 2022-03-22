import { Badge, BadgeProps } from '@mui/material'
import { useTheme } from '@mui/styles'
import React from 'react'

export const StyledBadge = (props: BadgeProps) => {
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
