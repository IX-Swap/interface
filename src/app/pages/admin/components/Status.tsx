import React from 'react'
import { Typography } from '@material-ui/core'
import classNames from 'classnames'
import { useStyles } from 'app/pages/admin/components/Status.styles'

export interface StatusProp {
  status: string
  variant?: 'default' | 'success'
}

export const Status = ({ status, variant = 'default' }: StatusProp) => {
  const classes = useStyles()

  return (
    <Typography className={classNames(classes.default, classes[variant])}>
      {status}
    </Typography>
  )
}
