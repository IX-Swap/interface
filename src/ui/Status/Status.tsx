import React from 'react'
import { Chip } from '@mui/material'
import { useStyles } from 'ui/Status/Status.styles'

export type StatusType =
  | 'approved'
  | 'submitted'
  | 'rejected'
  | 'draft'
  | string

export interface StatusProps {
  label: string
  type: StatusType
}

export const getChipVariant = (type: StatusType) => {
  if (type !== 'approved') {
    return 'outlined'
  }
  return 'filled'
}

export const Status = ({ label, type }: StatusProps) => {
  const classes = useStyles({ type })

  return (
    <Chip
      className={classes.wrapper}
      label={label}
      color={'success'}
      variant={getChipVariant(type)}
    />
  )
}
