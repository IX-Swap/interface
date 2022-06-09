import React from 'react'
import { FormControlLabel, Typography } from '@mui/material'
import { UIRadio } from 'components/UIRadio/UIRadio'
import useStyles from './ReasonItem.style'

export interface ReasonItemProps {
  disabled: boolean
  isActive: boolean
  value: string
  label: string
}

export const ReasonItem = ({
  isActive,
  value,
  label,
  disabled
}: ReasonItemProps) => {
  const classes = useStyles({ isActive })
  return (
    <FormControlLabel
      classes={{ root: classes.container }}
      label={<Typography className={classes.label}>{label}</Typography>}
      value={value}
      control={<UIRadio />}
      disabled={disabled}
    />
  )
}
