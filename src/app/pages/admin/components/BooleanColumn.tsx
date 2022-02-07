import React from 'react'
import { Typography } from '@mui/material'

export type ColorType =
  | 'initial'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'error'

export interface BooleanColumnProps {
  value: boolean
  labels?: [string, string]
  colors?: [ColorType, ColorType]
}

export const BooleanColumn = ({
  value,
  labels = ['true', 'false'],
  colors = ['textPrimary', 'error']
}: BooleanColumnProps) => {
  return (
    <Typography color={value ? colors[0] : colors[1]}>
      {value ? labels[0] : labels[1]}
    </Typography>
  )
}
