import { Typography } from '@mui/material'
import React from 'react'

export interface OptionalLabelProps {
  label: string
}

export const OptionalLabel = ({ label }: OptionalLabelProps) => {
  return (
    <span>
      {label}{' '}
      <Typography variant='caption' color='#778194' sx={{ opacity: 1 }}>
        (Optional)
      </Typography>
    </span>
  )
}
