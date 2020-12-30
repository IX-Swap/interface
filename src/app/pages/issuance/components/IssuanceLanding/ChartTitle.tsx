import React from 'react'
import { Typography } from '@material-ui/core'

export interface ChartTitleProps {
  title: string
  small?: boolean
}

export const ChartTitle = (props: ChartTitleProps) => {
  const { title, small = false } = props
  return (
    <Typography
      color={small ? 'textSecondary' : 'textPrimary'}
      variant={small ? 'subtitle2' : 'subtitle1'}
    >
      {title}
    </Typography>
  )
}
