import React from 'react'
import { Typography } from '@material-ui/core'
import useStyles from './InsightValue.styles'

export const InsightValue = ({ value }: { value: any }) => {
  const classes = useStyles()

  return (
    <Typography className={classes.root} variant='h6'>
      {value}
    </Typography>
  )
}
