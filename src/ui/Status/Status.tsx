import React from 'react'
import { Box, Chip } from '@mui/material'
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
  | 'error'
  | 'success'
  | string

export interface StatusProps {
  label: string
  type: StatusType
  matchedStatus?: string
  size?: 'normal' | 'small'
}

export const getChipVariant = (type: StatusType) => {
  if (type !== 'approved') {
    return 'outlined'
  }
  return 'filled'
}

export const Status = ({
  label,
  type,
  matchedStatus,
  size = 'normal'
}: StatusProps) => {
  const classes = useStyles({ type })

  if (size === 'small') {
    return (
      <Box display={'flex'}>
        <Box className={classes.small}>{label}</Box>
      </Box>
    )
  }

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
