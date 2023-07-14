import React from 'react'
import { Chip } from '@mui/material'
import { useStyles } from 'ui/Status/Status.styles'
import { startCase } from 'lodash'

export type StatusType =
  | 'approved'
  | 'submitted'
  | 'rejected'
  | 'draft'
  | 'passed'
  | 'new'
  | 'completed'
  | string

export interface StatusProps {
  label: string
  type: StatusType
  matchedStatus?: string
}

export const getChipVariant = (type: StatusType) => {
  if (type !== 'approved') {
    return 'outlined'
  }
  return 'filled'
}

export const Status = ({ label, type, matchedStatus }: StatusProps) => {
  const classes = useStyles({ type  })
  return (
    <Chip
      className={classes.wrapper}
      label={startCase(
        label === 'NEW' && matchedStatus === 'SETTLED'
          ? 'Under Review'
          : label === 'NEW' && matchedStatus === 'CONFIRMED'
          ? 'Confirmed'
          : label === 'COMPLETED' && matchedStatus === 'SETTLED'
          ? 'Settled'
          : label !== 'REJECTED' && matchedStatus === 'MATCH'
          ? 'Submmited'
          : label
      )}
      //   color={'success'}
      variant={getChipVariant(type)}
      sx={{ minWidth: '140px', width: 'auto' }}
    />
  )
}
