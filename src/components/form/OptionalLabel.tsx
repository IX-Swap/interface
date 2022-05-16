import { Typography } from '@mui/material'
import React from 'react'

export interface OptionalLabelProps {
  label: string
}

export const OptionalLabel = ({ label }: OptionalLabelProps) => {
  return (
    <span>
      {label} <Typography variant='caption'>(Optional)</Typography>
    </span>
  )
}
