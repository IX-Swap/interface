import { Grid, Typography } from '@mui/material'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useStyles } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary.styles'
import { SummaryValueProps } from 'app/pages/exchange/components/FinancialSummary/NumberSummaryValue'
import classNames from 'classnames'
import React from 'react'

export const ChangeSummaryValue = ({
  value,
  isNegative = false
}: SummaryValueProps) => {
  const { isNegativeColor, boldText } = useStyles({ isNegative })
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography className={classNames([isNegativeColor, boldText])}>
          {value}%
        </Typography>
      </Grid>
      <Grid item>
        {isNegative ? (
          <ArrowDownward className={classNames([isNegativeColor, boldText])} />
        ) : value !== 0 ? (
          <ArrowUpward className={classNames([isNegativeColor, boldText])} />
        ) : null}
      </Grid>
    </Grid>
  )
}
