import React from 'react'
import { Typography } from '@mui/material'
import useStyles from 'app/pages/issuance/components/IssuanceLanding/InsightValue.styles'

export interface InsightValueProps {
  value: string | number
}

export const InsightValue = ({ value }: InsightValueProps) => {
  const classes = useStyles()

  return (
    <Typography className={classes.root} pt={1.5} pb={4.4}>
      {value}
    </Typography>
  )
}
