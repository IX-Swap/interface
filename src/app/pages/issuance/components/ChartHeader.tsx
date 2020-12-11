import React from 'react'
import { Typography } from '@material-ui/core'
export interface ChartHeaderProps {
  title: string
}

export const ChartHeader: React.FC<ChartHeaderProps> = (
  props: ChartHeaderProps
) => {
  const { title } = props
  return (
    <Typography color='textPrimary' variant='h5'>
      {title}
    </Typography>
  )
}
