import React from 'react'
import { Typography } from '@material-ui/core'
import useStyles from 'app/pages/issuance/components/IssuanceLanding/InsightValue.styles'

export interface InsightValueProps {
  value: string | number
}

export const InsightValue = ({ value }: InsightValueProps) => {
  const classes = useStyles()

  return <Typography className={classes.root}>{value}</Typography>
}
