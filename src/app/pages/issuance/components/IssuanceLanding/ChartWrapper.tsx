import React from 'react'
import { Box, Typography } from '@material-ui/core'

export interface ChartWrapperProps {
  title: string
  small?: boolean
}

export const ChartWrapper: React.FC<ChartWrapperProps> = props => {
  const { title, children, small = false } = props

  return (
    <Box py={3} px={2.5}>
      <Typography
        color={small ? 'textSecondary' : 'textPrimary'}
        variant={small ? 'body1' : 'h5'}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}
