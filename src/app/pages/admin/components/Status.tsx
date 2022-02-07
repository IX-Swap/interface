import React from 'react'
import { Typography } from '@mui/material'
import classNames from 'classnames'
import { useStyles } from 'app/pages/admin/components/Status.styles'

export interface StatusProp {
  status: string
  variant?: 'default' | 'success' | 'draft'
}

export const Status = ({ status, variant = 'default' }: StatusProp) => {
  const classes = useStyles()

  return (
    <Typography className={classNames(classes.default, classes[variant])}>
      {status}
    </Typography>
  )
}
