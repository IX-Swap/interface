import { Box, Typography } from '@mui/material'
import React from 'react'

export interface UpFromLastWeekProps {
  value: string
}

export const UpFromLastWeek = ({ value }: UpFromLastWeekProps) => {
  return (
    <Typography>
      <Box component='span' style={{ color: '#0BBE12', fontWeight: 'bold' }}>
        +{value}
      </Box>{' '}
      Up from last week
    </Typography>
  )
}
