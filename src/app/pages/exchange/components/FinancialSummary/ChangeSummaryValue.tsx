import { Grid, Typography } from '@material-ui/core'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
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
        ) : (
          <ArrowUpward className={classNames([isNegativeColor, boldText])} />
        )}
      </Grid>
    </Grid>
  )
}
